import algoliasearch from "algoliasearch";
import sgMail from "@sendgrid/mail";
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import sanity from "./algolia-sanity";

const postingLive = async (
	req: GatsbyFunctionRequest,
	res: GatsbyFunctionResponse
) => {
	// Tip: Its good practice to include a shared secret in your webhook URLs and
	// validate it before proceeding with webhook handling. Omitted in this short
	// example.
	if (req.headers["content-type"] !== "application/json") {
		res.status(400);
		res.json({ message: "Bad request" });
		return;
	}

	const msg = {
		to: req.body.email,
		from: "dan@groovy.careers",
		templateId: "d-32b9889f23bd47d6a6a5188556134998 ",
		dynamicTemplateData: {
			jobTitle: req.body.position,
			postingUrl: req.body.slug.current,
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
	return res.status(200);
};

export default postingLive;
