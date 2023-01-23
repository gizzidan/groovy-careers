import {
	GatsbyFunctionRequest,
	GatsbyFunctionResponse,
	graphql,
	useStaticQuery,
} from "gatsby";
import { request } from "http";
import { Client, Environment, ApiError } from "square";
import { sanity } from "./algolia-sanity";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

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
const NOTIFICATION_URL =
	"https://73c4-173-2-140-251.ngrok.io/api/create-subscription";

// The signature key defined for the subscription.
const SIGNATURE_KEY = "UouhTrYjqO7u_f9mYotBLg";

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
		const body = JSON.parse(req.body);
		const subscriptionQuery =
			'*[_type == "subscription" && _id == $squareSubscriptionId] {_id}';
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
								body.data.object.subscription.plan_id ==
								"XIZED35MTYAGUHRRDWEG6KEA"
									? "Iridium"
									: body.data.object.subscription.plan_id ==
									  "GWWJJGVWIVKRXLHRSGDWDHEV"
									? "Rhodium"
									: body.data.object.subscription.plan_id ==
									  "GHASDFJASDFJASDFJASDFJ"
									? "Cesium"
									: null,
						};
						await sanity
							.transaction()
							.createIfNotExists(newSubscription)
							.commit();
					})
					.then(async () => {
						const response = await square.customersApi.retrieveCustomer(
							body.data.object.subscription.customer_id
						);

						const email = response.result.customer?.emailAddress;
						await sanity
							.patch(body.data.object.subscription.id)
							.set({ email: email })
							.commit();
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
