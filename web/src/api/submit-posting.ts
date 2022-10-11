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
	const company = {
		name: req.body.companyName,
		invoiceAddress: req.body.invoiceAddress,
	};
	const posting = {
		_type: "jobPosting",
		position: req.body.position,
	};

	console.log(`submitted form`, req.body);

	sanity.create(posting).then((res) => {
		console.log(`Job Posting was created, document ID is ${res._id}`);
	});
	res.json(`ok`);
}
