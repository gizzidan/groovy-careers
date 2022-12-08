import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { sanity } from "./algolia-sanity";
import { Client, Environment, ApiError } from "square";
import { v4 as uuidv4 } from "uuid";
const { Console } = require("console");
const crypto = require("crypto");
const http = require("http");

// The URL where event notifications are sent.
const NOTIFICATION_URL = "https://groovycareers.gatsbyjs.io/payment-success";

// The signature key defined for the subscription.
const SIGNATURE_KEY = "xR4uZmDRCDK9sz1jZtdt5Q";

// isFromSquare generates a signature from the url and body and compares it to the Square signature header.
function isFromSquare(signature: any, body: string) {
	const hmac = crypto.createHmac("sha256", SIGNATURE_KEY);
	hmac.update(NOTIFICATION_URL + body);
	const hash = hmac.digest("base64");

	return hash === signature;
}

export default async function handler(
	req: GatsbyFunctionRequest,
	res: GatsbyFunctionResponse
) {
	if (req.method !== `POST`) {
		res.status(400);
		res.json({ message: "Bad request" });
		return;
	}
	let body = "";
	req.setEncoding("utf8");

	req.on("data", function (chunk) {
		body += chunk;
	});
	req.on("end", function () {
		const signature = req.headers["x-square-hmacsha256-signature"];
		if (isFromSquare(signature, body)) {
			// Signature is valid. Return 200 OK.
			res.writeHead(200);
			console.info("Request body: " + body);
		} else {
			// Signature is invalid. Return 403 Forbidden.
			res.writeHead(403);
		}
		res.end();
	});
}
