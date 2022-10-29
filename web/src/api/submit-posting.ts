import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { sanity } from "./algolia-sanity";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
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

	const id = req.body.companyName.replace(/\s+/g, "-");

	const tags = req.body.tags.split(",");

	// Create new tags if they don't exist
	await tags.map((tag: any) => {
		const tagQuery = '*[_type == "jobTag" && tagName == $tagName] {_id}';
		const tagParams = { tagName: tag };
		const tagName = tag;
		sanity.fetch(tagQuery, tagParams).then(async (tag) => {
			const slug = {
				_type: "slug",
				current: tagName,
			};
			const newTag = {
				_id: tag[0] && tag[0]._id ? tag[0]._id : `drafts.${tagName}`,
				_type: "jobTag",
				tagName: tagName,
				slug: slug,
			};
			await sanity.transaction().createIfNotExists(newTag).commit();
		});
	});

	// Create new company if it doesn't exist
	const companyQuery = '*[_type == "company" && name == $companyName] {_id}';
	const companyParams = { companyName: req.body.companyName };
	await sanity.fetch(companyQuery, companyParams).then(async (company) => {
		const newCompany = {
			_id: company[0] && company[0]._id ? company[0]._id : `drafts.${id}`,
			_type: "company",
			name: req.body.companyName,
		};
		await sanity.transaction().createIfNotExists(newCompany).commit();
	});

	// Create tag references
	const tagArray: { _ref: any; _type: string }[] = [];
	await tags.map(async (tag: any) => {
		const tagQuery = '*[_type == "jobTag" && tagName == $tagName] {_id}';
		const tagParams = { tagName: tag };
		await sanity.fetch(tagQuery, tagParams).then((tag) => {
			console.log(tag);
			const tagReference = {
				_key: uuidv4(),
				_ref: tag[0]?._id,
				_type: "reference",
			};
			tagArray.push(tagReference);
		});
	});

	// Create new posting

	await sanity.fetch(companyQuery, companyParams).then(async (company) => {
		const companyRef = company[0]._id;
		await sanity.fetch(query, params).then(async (primarySkill) => {
			const primarySkillRef = primarySkill[0]._id;
			const posting = {
				_id: `drafts.7BwXuHYVFwl4lfuvbiftvU`,
				_type: "jobPosting",
				position: req.body.position,
				company: {
					_ref: companyRef,
					_type: "reference",
				},
				primarySkill: {
					_ref: primarySkillRef,
					_type: "reference",
				},
				tags: tagArray,
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
			console.log(posting);
			await sanity.transaction().createOrReplace(posting).commit();
			res.json(`ok`);
		});
	});
}
