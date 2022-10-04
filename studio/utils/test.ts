import sanityClient from "part:@sanity/base/client";

const client = sanityClient.withConfig({
	projectId: "6t1tj18u",
	dataset: "production",
	// If your dataset is private you need to add a read token.
	// You can mint one at https://manage.sanity.io,
	apiVersion: "2021-03-25",
	token: process.env.SANITY_UPDATE_TOKEN,
	useCdn: false,
});

function numDaysBetween(d1: any, d2: any) {
	var diff = Math.abs(new Date(d1).getTime() - new Date(d2).getTime());
	return diff / (1000 * 60 * 60 * 24);
}

const query =
	'*[_type == "jobPosting" && stickyLength >= $minLength] {_id, publishedAt, stickyLength}';
const params = { minLength: 0 };

client.fetch(query, params).then((postings) => {
	postings.forEach((posting: any) => {
		const time = numDaysBetween(posting.publishedAt_str, new Date());
		console.log(
			`Created at: ${posting.publishedAt} which is ${time} days ago.`
		);
	});
});
