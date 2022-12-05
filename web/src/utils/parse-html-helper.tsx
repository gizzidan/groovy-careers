import Schema from "@sanity/schema";
import blockTools from "@sanity/block-tools";
import JSONBig from "json-bigint";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export function parseHtmlHelper(htmlString: string) {
  const defaultSchema = Schema.compile({
    name: "myPosting",
    types: [
      {
        name: "jobPosting",
        title: "Job Posting",
        type: "document",
        fields: [
          {
            name: "position",
            title: "Position",
            type: "string",
            validation: (Rule: { required: () => any }) => Rule.required(),
          },
          {
            name: "htmlToDescription",
            title: "HTML to Description",
            type: "htmlToPortableText",
          },
          {
            name: "description",
            title: "Description",
            type: "array",
            of: [
              {
                type: "block",
              },
            ],
            validation: (Rule: { required: () => any }) => Rule.required(),
          },
        ],
        initialValue: {
          stickyLength: 0,
          highlight: false,
          paymentStatus: false,
          includeLogo: false,
        },
      },
    ],
  });

  const blockContentType = defaultSchema
    .get("jobPosting")
    .fields.find((field: { name: string }) => field.name === "description")
    .type;

  const blocks = blockTools.htmlToBlocks(
    htmlString,
    blockContentType,
    {
      parseHtml: (html: any) => new JSDOM(html).window.document,
    }
  );

  console.log(blocks)
  return blocks
}

export default parseHtmlHelper
