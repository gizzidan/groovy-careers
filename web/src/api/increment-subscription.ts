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
import delay from "delay";
import { fstat } from "fs";

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
	"https://73c4-173-2-140-251.ngrok.io/api/increment-subscription";

// The signature key defined for the subscription.
const SIGNATURE_KEY = "itCU0rQElV6rdHvVeSo3kQ";

// isFromSquare generates a signature from the url and body and compares it to the Square signature header.
function isFromSquare(signature: any, body: any) {
	const hmac = crypto.createHmac("sha256", SIGNATURE_KEY);
	hmac.update(NOTIFICATION_URL + body);
	const hash = hmac.digest("base64");

	return hash === signature;
}

export default async function incrementSubscription(
	req: GatsbyFunctionRequest,
	res: GatsbyFunctionResponse
) {
	req.setEncoding("utf8");

	const signature = req.headers["x-square-hmacsha256-signature"];
	if (isFromSquare(signature, req.body)) {
		// Signature is valid. Return 200 OK.
		res.send(200);

		// Do stuff
		await delay(3000);
		const data = JSON.parse(req.body);
		const invoice = JSON.parse(JSON.stringify(data.data.object.invoice));

		try {
			const response = await square.invoicesApi.getInvoice(invoice.id);
			const subscriptionQuery =
				'*[_type == "subscription" && _id == $squareSubscriptionId] {_id, subscriptionName}';
			const subscriptionParams = {
				squareSubscriptionId: response.result.invoice?.subscriptionId,
			};
			response.result.invoice && response.result.invoice.subscriptionId
				? await sanity
						.fetch(subscriptionQuery, subscriptionParams)
						.then(async (subscription) => {
							await sanity
								.patch(subscription[0]._id)
								.inc({
									postingCount:
										subscription[0].subscriptionName == "Iridium"
											? 3
											: subscription[0].subscriptionName == "Rhodium"
											? 4
											: subscription[0].subscriptionName == "Cesium"
											? 6
											: 0,
								})
								.commit();
						})
				: null;
		} catch (error) {
			console.log(error);
		}
	} else {
		// Signature is invalid. Return 403 Forbidden.
		res.send(403);
		console.log("Not ok");
	}
}
