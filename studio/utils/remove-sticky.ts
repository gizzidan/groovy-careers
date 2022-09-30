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
	'*[_type == "jobPosting" && stickyLength >= $minLength] {_id, stickyLength}';
const params = { minLength: 5 };

client.fetch(query, params).then((postings) => {
	postings.forEach((posting: any) => {
		client
			.patch(posting._id)
			.set({ stickyLength: 1 })
			.commit()
			.then((updatedPosting) => {
				console.log("Hurray, the posting is updated! New document:");
				console.log(updatedPosting);
			})
			.catch((err) => {
				console.error("Oh no, the update failed: ", err.message);
			});
	});
});
