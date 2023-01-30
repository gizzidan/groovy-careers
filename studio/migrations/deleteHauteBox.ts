import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2021-06-07" });

client
	.delete({
		query:
			'*[_type == "jobPosting" && references("e8799bce-c90b-4e97-a87c-daecf40561be")][0...100]',
	})
	.then(() => {
		console.log("The documents were deleted");
	})
	.catch((err) => {
		console.error("Delete failed: ", err.message);
	});
