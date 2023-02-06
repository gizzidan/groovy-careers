import sgMail from "@sendgrid/mail";
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";

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
	console.log(req.body);
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: req.body.email,
		from: "dan@groovy.careers",
		templateId: "d-32b9889f23bd47d6a6a5188556134998",
		dynamicTemplateData: {
			jobTitle: req.body.position,
			postingUrl: `${process.env.NOTIFICATION_URL}/req.body.slug.current`,
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
	return res.status(200).json("Email successfully sent");
};

export default postingLive;
