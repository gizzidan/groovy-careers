import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2021-06-07" });

client
	.delete({ query: '*[_type == "subscription"][0...999]' })
	.then(() => {
		console.log("The documents were deleted");
	})
	.catch((err) => {
		console.error("Delete failed: ", err.message);
	});
