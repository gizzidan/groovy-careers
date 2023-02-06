import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
const mailchimp = require("@mailchimp/mailchimp_marketing");
const md5 = require("md5");

export default function mailchimpSignup(
	req: GatsbyFunctionRequest,
	res: GatsbyFunctionResponse
) {
	res.status(200);
	console.log(req.body);
	res.json({ message: "Good to go." });

	mailchimp.setConfig({
		apiKey: process.env.MAILCHIMP_API_KEY,
		server: "us18",
	});

	const listId = "e2c4ef207c";
	const subscriberHash = md5(req.body.email.toLowerCase());
	const subscribingUser = {
		email: req.body.email,
	};

	const tags: any[] = [];
	req.body.categories.map((node: any) =>
		tags.push({ name: node, status: "active" })
	);

	async function run() {
		const listResponse = await mailchimp.lists.setListMember(
			listId,
			subscriberHash,
			{
				email_address: subscribingUser.email,
				status: "subscribed",
			}
		);

		console.log(listResponse);
		const tagResponse = await mailchimp.lists.updateListMemberTags(
			listId,
			subscriberHash,
			{ tags: tags }
		);
		console.log(tagResponse);
	}

	run();
}
