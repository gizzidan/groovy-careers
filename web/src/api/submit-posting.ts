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

	const query = '*[_type == "primarySkill" && skillName == $skillName] {_id}';
	const params = { skillName: req.body.primarySkill };

	const companyQuery = '*[_type == "company" && name == $companyName] {_id}';
	const companyParams = { companyName: req.body.companyName };
	const id = req.body.companyName.replace(/\s+/g, "-");

	sanity.fetch(companyQuery, companyParams).then((company) => {
		const newCompany = {
			_id: company[0] && company[0]._id ? company[0]._id : `drafts.${id}`,
			_type: "company",
			name: req.body.companyName,
		};
		console.log(newCompany._id);
		sanity.transaction().createIfNotExists(newCompany).commit();
	});

	sanity.fetch(query, params).then((primarySkill) => {
		const posting = {
			_id: "drafts.",
			_type: "jobPosting",
			position: req.body.position,
			primarySkill: {
				_ref: primarySkill[0]._id,
				_type: "reference",
			},
			location: req.body.location,
			applicationLink: req.body.applicationLink,
			minAnnualSalary: req.body.minSalary,
			maxAnnualSalary: req.body.maxSalary,
			email: req.body.email,
			stickyLength: parseInt(req.body.stickyLength),
			includeLogo: req.body.includeLogo,
			highlight: req.body.highlight,
			coupon: req.body.couponCode,
		};
		sanity.transaction().createOrReplace(posting).commit();
	});
	res.json(`ok`);
}
