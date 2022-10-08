import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { sanity } from "./algolia-sanity";

export default function handler(
	req: GatsbyFunctionRequest,
	res: GatsbyFunctionResponse
) {
	if (req.headers["content-type"] !== "application/json") {
		res.status(400);
		res.json({ message: "Bad request" });
		return;
	}
}
