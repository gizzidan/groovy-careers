import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { Client, Environment } from "square";
import { sanity } from "./algolia-sanity";
import crypto from "crypto";
import delay from "delay";

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
const NOTIFICATION_URL = `${process.env.NOTIFICATION_URL}/api/payment-success`;

// The signature key defined for the subscription.
const SIGNATURE_KEY = process.env.PAYMENT_SUCCESS_SIG_KEY!;

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
		await delay(10000);
		const data = JSON.parse(req.body);
		const object = JSON.parse(JSON.stringify(data.data.object.payment));

		try {
			const response = await square.ordersApi.retrieveOrder(object.order_id);
			await delay(2000);

			const subscriptionQuery =
				'*[_type == "jobPosting" && squareId == $sanity_id] {_id, squareId, paymentStatus}';
			const subscriptionParams = {
				sanity_id: response.result.order?.metadata?.sanity_id,
			};

			response.result.order &&
			response.result.order.metadata &&
			object.status == "COMPLETED"
				? await sanity
						.fetch(subscriptionQuery, subscriptionParams)
						.then(async (posting) => {
							await sanity
								.patch(posting[0]._id)
								.set({ paymentStatus: true })
								.commit();
						})
						.catch((err) => {
							console.error("Oh no, the update failed: ", err.message);
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
