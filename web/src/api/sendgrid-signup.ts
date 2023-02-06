import sgMail from "@sendgrid/mail";
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";

export default function sendgridSignup(
	req: GatsbyFunctionRequest,
	res: GatsbyFunctionResponse
) {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: "gizzidan@me.com", // Change to your recipient
		from: "dan@groovy.careers", // Change to your verified sender
		subject: "Sending with SendGrid is Fun",
		text: "and easy to do anywhere, even with Node.js",
		html: "<strong>and easy to do anywhere, even with Node.js</strong>",
	};
	sgMail
		.send(msg)
		.then(() => {
			console.log("Email sent");
		})
		.catch((error) => {
			console.error(error);
		});
}
