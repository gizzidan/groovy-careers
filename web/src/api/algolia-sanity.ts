import indexer from "sanity-algolia";
import algoliasearch from "algoliasearch";
import sanityClient, { SanityDocumentStub } from "@sanity/client";
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { numDaysBetween } from "../utils/num-days-between";

const algolia = algoliasearch("WCOAAGSNH7", process.env.ALGOLIA_ADMIN_KEY);

const sanity = sanityClient({
	projectId: "6t1tj18u",
	dataset: "production",
	// If your dataset is private you need to add a read token.
	// You can mint one at https://manage.sanity.io,
	apiVersion: "2021-03-25",
	useCdn: false,
});

//  This function receives webhook POSTs from Sanity and updates, creates or
//  deletes records in the corresponding Algolia indices.
const handler = (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
	// Tip: Its good practice to include a shared secret in your webhook URLs and
	// validate it before proceeding with webhook handling. Omitted in this short
	// example.
	if (req.headers["content-type"] !== "application/json") {
		res.status(400);
		res.json({ message: "Bad request" });
		return;
	}

	// Configure this to match an existing Algolia index name
	const algoliaIndex = algolia.initIndex("dev_cannabisfriendly");

	const sanityAlgolia = indexer(
		// The first parameter maps a Sanity document type to its respective Algolia
		// search index. In this example both `post` and `article` Sanity types live
		// in the same Algolia index. Optionally you can also customize how the
		// document is fetched from Sanity by specifying a GROQ projection.
		//
		// In this example we fetch the plain text from Portable Text rich text
		// content via the pt::text function.
		//
		// _id and other system fields are handled automatically.
		{
			jobPosting: {
				index: algoliaIndex,
				projection: `{
					publishedAt,
          applicationLink,
          position,
          highlight,
          email,
          includeLogo,
          minAnnualSalary,
          maxAnnualSalary,
          location,
          paymentStatus,
          stickyLength,
          "tags": tags[]->{tagName, slug},
          "logo": company->{logo{asset->{url}}},
          "primarySkill": primarySkill->skillName,
          "path": slug.current,
          "diverseOwnership": company->{diverseOwnership},
          "companyName": company->name,
        }`,
			},
		},

		// The second parameter is a function that maps from a fetched Sanity
		// document to an Algolia Record. Here you can do further mutations to
		// the data before it is sent to Algolia.
		(document: SanityDocumentStub) => {
			switch (document._type) {
				case "jobPosting":
					return {
						publishedAt: Date.parse(document.publishedAt),
						publishedAt_str: document.publishedAt,
						applicationLink: document.applicationLink,
						position: document.position,
						highlight: document.highlight,
						email: document.email,
						includeLogo: document.includeLogo,
						minAnnualSalary: document.minAnnualSalary,
						maxAnnualSalary: document.maxAnnualSalary,
						location: document.location,
						paymentStatus: document.PaymentStatus,
						stickyLength: document.stickyLength,
						stickyBoolean: Boolean(document.stickyLength),
						tags: document.tags,
						logo: document.logo,
						primarySkill: document.primarySkill,
						path: document.path,
						diverseOwnership: document.diverseOwnership,
						companyName: document.companyName,
					};
				default:
					return document;
			}
		},
		// Visibility function (optional).
		//
		// The third parameter is an optional visibility function. Returning `true`
		// for a given document here specifies that it should be indexed for search
		// in Algolia. This is handy if for instance a field value on the document
		// decides if it should be indexed or not. This would also be the place to
		// implement any `publishedAt` datetime visibility rules or other custom
		// visibility scheme you may be using.
		(document: SanityDocumentStub) => {
			if (numDaysBetween(document._createdAt, new Date()) > 60) {
				return false;
			}
			return true;
		}
	);

	// Finally connect the Sanity webhook payload to Algolia indices via the
	// configured serializers and optional visibility function. `webhookSync` will
	// inspect the webhook payload, make queries back to Sanity with the `sanity`
	// client and make sure the algolia indices are synced to match.
	return sanityAlgolia
		.webhookSync(sanity, req.body)
		.then(() => res.status(200).send("ok"));
};

export default handler;
