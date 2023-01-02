import algoliasearch from "algoliasearch";
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import sanity from "./algolia-sanity";

const algolia = algoliasearch("WCOAAGSNH7", process.env.ALGOLIA_ADMIN_KEY);

async function readBody(readable: any) {
	const chunks = [];
	for await (const chunk of readable) {
		chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
	}
	return Buffer.concat(chunks).toString("utf8");
}

const handler = async (
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

	// Configure this to match an existing Algolia index name
	const body = await req.body; // Read the body into a string
	console.log(body);
	const algoliaIndex = algolia.initIndex("dev_cannabisfriendly");

	const deleteResponse = await algoliaIndex.deleteObject(body._id);
	return res.status(200).json({ deleteResponse });
};

export default handler;
