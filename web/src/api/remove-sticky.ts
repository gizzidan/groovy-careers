import { sanity } from "./algolia-sanity";
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";

function numDaysBetween(d1: any, d2: any) {
	var diff = Math.abs(new Date(d1).getTime() - new Date(d2).getTime());
	return diff / (1000 * 60 * 60 * 24);
}

export default async function removeSticky(
	req: GatsbyFunctionRequest,
	res: GatsbyFunctionResponse
) {
	if (req.method !== `POST`) {
		res.status(400);
		res.json({ message: "Bad request" });
		return;
	}

	const userpass = Buffer.from(req.headers.authorization || "").toString();
	if (userpass !== process.env.CRONHOOKS_PASSWORD) {
		res.writeHead(401, { "WWW-Authenticate": 'Basic realm="nope"' });
		res.end("HTTP Error 401 Unauthorized: Access is denied");
		return;
	}
	res.end("You are in! Yay!!");

	res.status(200);
	const query =
		'*[_type == "jobPosting" && stickyLength >= $minLength] {_id, publishedAt, stickyLength}';
	const params = { minLength: 0 };

	sanity.fetch(query, params).then((postings) => {
		postings.forEach((posting: any) => {
			const time = numDaysBetween(posting.publishedAt, new Date());
			time > posting.stickyLength
				? sanity
						.patch(posting._id)
						.set({ stickyLength: 0 })
						.commit()
						.then((updatedPosting) => {
							console.log("Hurray, the posting is updated! New document:");
							console.log(updatedPosting);
						})
						.catch((err) => {
							console.error("Oh no, the update failed: ", err.message);
						})
				: console.log(`Posting ${posting._id} is still featured.`);
		});
	});
}
