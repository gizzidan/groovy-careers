import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { sanity } from "./algolia-sanity";
import { Client, Environment, ApiError } from "square";
import { v4 as uuidv4 } from "uuid";
import Schema from "@sanity/schema";
import blockTools from "@sanity/block-tools";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export default async function handler(
	req: GatsbyFunctionRequest,
	res: GatsbyFunctionResponse
) {
	if (req.method !== `POST`) {
		res.status(400);
		res.json({ message: "Bad request" });
		return;
	}

	interface ExtRequest extends GatsbyFunctionRequest {
		files: any;
	}

	console.log(req.body);
	const query = '*[_type == "primarySkill" && skillName == $skillName] {_id}';
	const params = { skillName: req.body.primarySkill };

	const id = req.body.companyName.replace(/\s+/g, "-");

	const tags = req.body.tags.split(",");

	// Create new tags if they don't exist
	tags[0]
		? await tags.map((tag: any) => {
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
		  })
		: null;

	// Create new company if it doesn't exist
	const companyQuery = '*[_type == "company" && name == $companyName] {_id}';
	const companyParams = { companyName: req.body.companyName };
	await sanity.fetch(companyQuery, companyParams).then(async (company) => {
		const newCompany = {
			_id: company[0] && company[0]._id ? company[0]._id : `drafts.${id}`,
			_type: "company",
			name: req.body.companyName,
			invoiceAddress: req.body.invoiceAddress,
			diverseOwnership: req.body.diverseOwnership,
		};
		await sanity.transaction().createIfNotExists(newCompany).commit();
	});

	// Update company logo
	await sanity.fetch(companyQuery, companyParams).then(async (company) => {
		const companyRef = company[0]._id;
		(req as ExtRequest).files && (req as ExtRequest).files[0]
			? await sanity.assets
					.upload("image", (req as ExtRequest).files[0].buffer)
					.then((imageAsset) => {
						// Here you can decide what to do with the returned asset document.
						// If you want to set a specific asset field you can to the following:
						return sanity
							.patch(companyRef)
							.set({
								logo: {
									_type: "image",
									asset: {
										_type: "reference",
										_ref: imageAsset._id,
									},
								},
							})
							.commit();
					})
					.then(() => {
						console.log("Logo updated!");
					})
					.catch((error) => {
						console.error("Upload failed:", error.message);
					})
			: console.log("No uploaded files");
	});

	// Create tag references
	const tagArray: { _ref: any; _type: string }[] = [];
	tags[0]
		? await tags.map(async (tag: any) => {
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
		  })
		: null;

	const defaultSchema = Schema.compile({
		name: "myPosting",
		types: [
			{
				name: "jobPosting",
				title: "Job Posting",
				type: "document",
				fields: [
					{
						name: "position",
						title: "Position",
						type: "string",
						validation: (Rule: { required: () => any }) => Rule.required(),
					},
					{
						name: "htmlToDescription",
						title: "HTML to Description",
						type: "htmlToPortableText",
					},
					{
						name: "description",
						title: "Description",
						type: "array",
						of: [
							{
								type: "block",
							},
						],
						validation: (Rule: { required: () => any }) => Rule.required(),
					},
				],
				initialValue: {
					stickyLength: 0,
					highlight: false,
					paymentStatus: false,
					includeLogo: false,
				},
			},
		],
	});

	const blockContentType = defaultSchema
		.get("jobPosting")
		.fields.find((field: { name: string }) => field.name === "description")
		.type;

	const blocks = blockTools.htmlToBlocks(
		req.body.description,
		blockContentType,
		{
			parseHtml: (html: any) => new JSDOM(html).window.document,
		}
	);

	// Create new posting
	const salaryRange = req.body.salaryRange.split(",");
	const highlight = JSON.parse(req.body.highlight);
	const includeLogo = JSON.parse(req.body.includeLogo);
	await sanity.fetch(companyQuery, companyParams).then(async (company) => {
		const companyRef = company[0]._id;
		await sanity.fetch(query, params).then(async (primarySkill) => {
			const primarySkillRef = primarySkill[0]._id;
			const posting = {
				_id: `drafts.7BwXuHYVFwl4lfuvbiftvU`,
				_type: "jobPosting",
				position: req.body.position,
				description: blocks,
				diverseOwnership: req.body.diverseOwnership,
				company: {
					_ref: companyRef,
					_type: "reference",
				},
				primarySkill: {
					_ref: primarySkillRef,
					_type: "reference",
				},
				tags: tags[0] ? tagArray : undefined,
				location: req.body.location,
				applicationLink: req.body.applicationLink,
				minAnnualSalary: parseInt(salaryRange[0]),
				maxAnnualSalary: parseInt(salaryRange[1]),
				email: req.body.email,
				stickyLength: parseInt(req.body.stickyLength),
				includeLogo: includeLogo,
				highlight: highlight,
				paymentStatus: false,
				coupon: req.body.couponCode,
				test: req.body.companyLogo,
				slug: {
					_type: "slug",
					current:
						req.body.position.toLowerCase().replace(/\s+/g, "-") +
						"-" +
						req.body.companyName.toLowerCase().replace(/\s+/g, "-") +
						"-" +
						uuidv4().slice(-6),
				},
			};
			await sanity.transaction().createOrReplace(posting).commit();
			res.json(`ok`);
		});
	});

	// Square API code
	const square = new Client({
		accessToken: process.env.SQUARE_ACCESS_TOKEN,
		environment: Environment.Sandbox,
	});

	const ordersApi = square.ordersApi;
	const checkoutApi = square.checkoutApi;

	try {
		const response = await checkoutApi.createPaymentLink({
			idempotencyKey: "42b5a91c-21a1-452d-a668-9b076e4480f5",
			order: {
				locationId: "LKA24FR5PZCZV",
				lineItems: [
					{
						quantity: "1",
						catalogObjectId: "WPOCQUDYD3IPHJRDQ4BXOZCC",
						itemType: "ITEM",
					},
				],
			},
		});

		console.log(response.result);
	} catch (error) {
		console.log(error);
	}
}
