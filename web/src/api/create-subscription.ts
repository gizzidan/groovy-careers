import {
	GatsbyFunctionRequest,
	GatsbyFunctionResponse,
	graphql,
	useStaticQuery,
} from "gatsby";
import { request } from "http";
import { Client, Environment, ApiError } from "square";
const { Console } = require("console");
const crypto = require("crypto");
const http = require("http");

const square = new Client({
	accessToken: process.env.SQUARE_SANDBOX_TOKEN,
	environment: Environment.Sandbox,
});

// The URL where event notifications are sent.
const NOTIFICATION_URL =
	"https://fbf1-173-2-140-251.ngrok.io/api/create-subscription";

// The signature key defined for the subscription.
const SIGNATURE_KEY = "UouhTrYjqO7u_f9mYotBLg";

// isFromSquare generates a signature from the url and body and compares it to the Square signature header.
function isFromSquare(signature: any, body: any) {
	const hmac = crypto.createHmac("sha256", SIGNATURE_KEY);
	hmac.update(NOTIFICATION_URL + body);
	const hash = hmac.digest("base64");

	return hash === signature;
}

export default function mailchimpSignup(
	req: GatsbyFunctionRequest,
	res: GatsbyFunctionResponse
) {
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
	console.log(req.body);
}
