import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { sanity } from "./algolia-sanity";
import { Client, Environment } from "square";
import { v4 as uuidv4 } from "uuid";
import JSONBig from "json-bigint";
import delay from "delay";
import sgMail from "@sendgrid/mail";

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

	// Query params
	const query = '*[_type == "category" && categoryName == $categoryName] {_id}';
	const params = { categoryName: req.body.category };
	const companyQuery = '*[_type == "company" && name == $companyName] {_id}';
	const companyParams = { companyName: req.body.companyName };
	const couponQuery =
		'*[_type == "subscription" && couponCode.current == $couponCode] {_id, subscriptionName, postingCount}';
	const couponParams = { couponCode: req.body.couponCode };

	const id = req.body.companyName.replace(/\s+/g, "-");

	const tags = req.body.tags.split(",");

	const diversity = req.body.diverseOwnership
		? req.body.diverseOwnership.split(",")
		: null;

	// Create new tags if they don't exist
	tags[0] && tags[0] != "undefined"
		? await tags.map((tag: any) => {
				const tagQuery = '*[_type == "jobTag" && tagName == $tagName] {_id}';
				const tagParams = { tagName: tag };
				const tagName = tag.replace(/\s+/g, "-").toLowerCase();
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
	await sanity.fetch(companyQuery, companyParams).then(async (company) => {
		const newCompany = {
			_id: company[0] && company[0]._id ? company[0]._id : id,
			_type: "company",
			name: req.body.companyName,
			diverseOwnership:
				req.body.diverseOwnership == "false" ? undefined : diversity,
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
					const tagReference = {
						_key: uuidv4(),
						_ref: tag[0]?._id,
						_type: "reference",
					};
					tagArray.push(tagReference);
				});
		  })
		: null;

	// Create new posting
	const postingId = uuidv4();
	const salaryRange = req.body.salaryRange.split(",");
	const highlight = JSON.parse(req.body.highlight);
	const includeLogo = JSON.parse(req.body.includeLogo);
	await sanity.fetch(companyQuery, companyParams).then(async (company) => {
		const companyRef = company[0]._id;
		await sanity.fetch(query, params).then(async (category) => {
			const categoryRef = category[0]._id;
			await sanity.fetch(couponQuery, couponParams).then(async (coupon) => {
				console.log(coupon);
				const logo =
					coupon[0] &&
					coupon[0].subscriptionName &&
					coupon[0].postingCount > 0 &&
					["Iridium", "Rhodium", "Cesium"].includes(coupon[0].subscriptionName)
						? true
						: includeLogo;

				const sticky =
					coupon[0] &&
					coupon[0].subscriptionName &&
					coupon[0].postingCount > 0 &&
					["Iridium", "Rhodium"].includes(coupon[0].subscriptionName)
						? 1
						: coupon[0] &&
						  coupon[0].subscriptionName &&
						  coupon[0].subscriptionName == "Cesium"
						? 7
						: parseInt(req.body.stickyLength);

				const customHigh =
					coupon[0] &&
					coupon[0].subscriptionName &&
					coupon[0].postingCount > 0 &&
					["Iridium", "Rhodium"].includes(coupon[0].subscriptionName)
						? false
						: coupon[0] &&
						  coupon[0].subscriptionName &&
						  coupon[0].postingCount > 0 &&
						  coupon[0].subscriptionName == "Cesium"
						? true
						: JSON.parse(req.body.customHighlight);

				const high =
					coupon[0] &&
					coupon[0].subscriptionName &&
					coupon[0].postingCount > 0 &&
					["Iridium", "Rhodium", "Cesium"].includes(coupon[0].subscriptionName)
						? true
						: highlight;

				const payment =
					coupon[0] &&
					coupon[0].subscriptionName &&
					coupon[0].postingCount > 0 &&
					["Iridium", "Rhodium", "Cesium"].includes(coupon[0].subscriptionName)
						? true
						: false;

				const posting = {
					_id: `drafts.`,
					_type: "jobPosting",
					position: req.body.position,
					descriptionPaste: req.body.description,
					company: {
						_ref: companyRef,
						_type: "reference",
					},
					category: {
						_ref: categoryRef,
						_type: "reference",
					},
					tags: tags[0] && tags[0] != "undefined" ? tagArray : undefined,
					location: req.body.location,
					applicationLink: req.body.applicationLink,
					minAnnualSalary: parseInt(salaryRange[0]),
					maxAnnualSalary: parseInt(salaryRange[1]),
					email: req.body.email,
					stickyLength: sticky,
					includeLogo: logo,
					highlight: high,
					customHighlight: customHigh,
					customHighlightColor: req.body.customHighlightColor,
					squareId: postingId,
					paymentStatus: payment,
					coupon: req.body.couponCode,
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
			});
		});
	});

	// Square API code
	const square = new Client({
		accessToken: process.env.SQUARE_SANDBOX_TOKEN,
		environment: Environment.Production,
	});

	const checkoutApi = square.checkoutApi;

	const pinModifier = {
		catalogObjectId:
			req.body.stickyLength == "1"
				? process.env.STICKY_LENGTH_1
				: req.body.stickyLength == "7"
				? process.env.STICKY_LENGTH_7
				: process.env.STICKY_LENGTH_0,
	};

	const highlightModifier = {
		catalogObjectId:
			req.body.highlight == "true" && req.body.customHighlight == "true"
				? process.env.CUSTOM_HIGHLIGHT_TRUE
				: req.body.highlight == "true"
				? process.env.HIGHLIGHT_TRUE
				: process.env.HIGHLIGHT_FALSE,
	};

	const logoModifier = {
		catalogObjectId:
			req.body.includeLogo == "true"
				? process.env.INCLUDE_LOGO_TRUE
				: process.env.INCLUDE_LOGO_FALSE,
	};
	const modifierList = [pinModifier, highlightModifier, logoModifier];

	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	await sanity.fetch(couponQuery, couponParams).then(async (coupon) => {
		if (
			coupon[0] &&
			coupon[0].subscriptionName &&
			coupon[0].postingCount > 0 &&
			["Iridium", "Rhodium", "Cesium"].includes(coupon[0].subscriptionName)
		) {
			await sanity.patch(coupon[0]._id).inc({ postingCount: -1 }).commit();
			res.status(200).json("Pass");
			const msg = {
				to: req.body.email,
				from: "dan@groovy.careers",
				templateId: "d-0fdd40cc23614662a0395815505a513e",
				dynamicTemplateData: {
					subscriptionName: `<strong>${coupon[0].subscriptionName}</strong>`,
					jobTitle: req.body.position,
					postingCount: `<strong>${coupon[0].postingCount - 1}</strong>`,
				},
			};
			console.log(msg);
			sgMail
				.send(msg)
				.then(() => {
					console.log("Email sent");
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			try {
				const response = await checkoutApi.createPaymentLink({
					idempotencyKey: uuidv4(),
					order: {
						locationId: process.env.SQUARE_LOCATION_ID!,
						lineItems: [
							{
								quantity: "1",
								catalogObjectId: process.env.JOB_POSTING_ID,
								itemType: "ITEM",
								modifiers: modifierList,
							},
						],
						metadata: {
							sanity_id: postingId,
						},
					},
				});

				console.log(response.result);
				const linkParsed = JSONBig.parse(
					JSONBig.stringify(response.result.paymentLink?.url!)
				);
				const msg = {
					to: req.body.email,
					from: "dan@groovy.careers",
					templateId: "d-7bcfbe39e39b49179476ee740dc4f9d3",
					dynamicTemplateData: {
						paymentUrl: linkParsed,
						jobTitle: req.body.position,
					},
				};
				console.log(msg);
				sgMail
					.send(msg)
					.then(() => {
						console.log("Email sent");
					})
					.catch((error) => {
						console.error(error);
					});
				await delay(1000);
				res.status(200).json(linkParsed);
			} catch (error) {
				console.log(error);
			}
		}
	});
}
