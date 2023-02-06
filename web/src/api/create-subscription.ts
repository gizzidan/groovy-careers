import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import sgMail from "@sendgrid/mail";
import { Client, Environment, ApiError } from "square";
import { sanity } from "./algolia-sanity";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
const mailchimp = require("@mailchimp/mailchimp_marketing");

const square = new Client({
	accessToken: process.env.SQUARE_SANDBOX_TOKEN,
	environment: Environment.Sandbox,
});

export const config = {
	bodyParser: {
		raw: {
			type: `*/*`,
		},
	},
};

// The URL where event notifications are sent.
const NOTIFICATION_URL = `https://groovy.careers/api/create-subscription`;

// The signature key defined for the subscription.
const SIGNATURE_KEY = process.env.CREATE_SUB_SIG_KEY!;

// isFromSquare generates a signature from the url and body and compares it to the Square signature header.
function isFromSquare(signature: any, body: any) {
	const hmac = crypto.createHmac("sha256", SIGNATURE_KEY);
	hmac.update(NOTIFICATION_URL + body);
	const hash = hmac.digest("base64");

	return hash === signature;
}

export default async function createSubscription(
	req: GatsbyFunctionRequest,
	res: GatsbyFunctionResponse
) {
	req.setEncoding("utf8");

	const signature = req.headers["x-square-hmacsha256-signature"];
	if (isFromSquare(signature, req.body)) {
		// Signature is valid. Return 200 OK.
		res.send(200);

		// Do stuff
		mailchimp.setConfig({
			apiKey: process.env.MAILCHIMP_API_KEY,
			server: "us18",
		});

		const body = JSON.parse(req.body);
		const subscriptionQuery =
			'*[_type == "subscription" && _id == $squareSubscriptionId] {_id, subscriptionName, couponCode}';
		const subscriptionParams = { squareSubscriptionId: body.data.id };

		// Code for subscription created webhook
		const couponCode =
			body.data.object.subscription.customer_id.toString().slice(-4) +
			uuidv4().toString().slice(-4);
		body.type == "subscription.created"
			? await sanity
					.fetch(subscriptionQuery, subscriptionParams)
					.then(async () => {
						const newSubscription = {
							_id: body.data.object.subscription.id,
							_type: "subscription",
							squareCustomerId: body.data.object.subscription.customer_id,
							squareSubscriptionId: body.data.object.subscription.id,
							squarePlanId: body.data.object.subscription.plan_id,
							status: body.data.object.subscription.status,
							postingCount: 0,
							couponCode: {
								_type: "slug",
								current: couponCode.toUpperCase(),
							},
							subscriptionName:
								body.data.object.subscription.plan_id == process.env.IRIDIUM_ID
									? "Iridium"
									: body.data.object.subscription.plan_id ==
									  process.env.RHODIUM_ID
									? "Rhodium"
									: body.data.object.subscription.plan_id ==
									  process.env.CESIUM_ID
									? "Cesium"
									: null,
						};
						await sanity
							.transaction()
							.createIfNotExists(newSubscription)
							.commit();
						await sanity
							.fetch(subscriptionQuery, subscriptionParams)
							.then(async (subscription) => {
								const response = await square.customersApi.retrieveCustomer(
									body.data.object.subscription.customer_id
								);
								const email = response.result.customer?.emailAddress;
								sgMail.setApiKey(process.env.SENDGRID_API_KEY);
								const msg = {
									to: email!,
									from: "dan@groovy.careers",
									templateId: "d-3014e7dc9c8b4125a0aab3d5b23c9f9b",
									dynamicTemplateData: {
										subscriptionName: subscription[0].subscriptionName,
										subscriptionCode: `<strong>${subscription[0].couponCode.current}</strong>`,
									},
								};
								console.log(msg);
								sgMail
									.send(msg)
									.then(() => {
										console.log("Email sent");
									})
									.catch((error) => {
										console.error(error);
									});
								await sanity
									.patch(body.data.object.subscription.id)
									.set({ email: email })
									.commit();
							});
					})
			: // Code for subscription updated webhook
			body.type == "subscription.updated"
			? async () => {
					const response = await square.customersApi.retrieveCustomer(
						body.data.object.subscription.customer_id
					);
					const email = response.result.customer?.emailAddress;
					await sanity
						.patch(body.data.object.subscription.id)
						.set({ status: body.data.object.subscription.status })
						.set({ email: email })
						.commit();
			  }
			: null;
	} else {
		// Signature is invalid. Return 403 Forbidden.
		res.send(403);
		console.log("Not ok");
	}
}
