import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { sanity } from "./algolia-sanity";

export default async function handler(
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
		description: req.body.description,
		primarySkill: req.body.primarySkill,
		location: req.body.location,
		applicationLink: req.body.applicationLink,
		email: req.body.email,
		minAnnualSalary: req.body.minSalary,
		maxAnnualSalary: req.body.maxSalary,
		includeLogo: req.body.includeLogo,
		stickyLength: req.body.stickyLength,
		highlight: req.body.highlight,
		coupon: req.body.couponCode,
	};

	await sanity.create(posting).then((res) => {
		console.log(`Job Posting was created, document ID is ${res._id}`);
	});
}
