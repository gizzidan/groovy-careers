export default {
	name: "company",
	title: "Company",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "logo",
			title: "Logo",
			type: "image",
		},
		{
			name: "invoiceAddress",
			title: "Invoice Address",
			type: "text",
			description: "Address for receiving invoices.",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "diverseOwnership",
			title: "Diverse Ownership",
			type: "array",
			of: [
				{
					type: "string",
					options: {
						list: [
							"Black-Owned",
							"Minority-Owned",
							"Women-Owned",
							"Veteran-Owned",
						],
					},
				},
			],
			description:
				"Select if majority is diversely owned (ps: honor system, people will find out if you lie!)",
		},
		{
			name: "twitter",
			title: "Twitter",
			type: "string",
			description: "Company Twitter username",
			validation: (Rule) =>
				Rule.regex(/(^|[^@\w])@(\w{1,15})\b/).warning(
					"Must be a Twitter username"
				),
		},
		{
			name: "instagram",
			title: "Instagram",
			type: "string",
			description: "Company Instagram username",
			validation: (Rule) =>
				Rule.regex(/(^|[^@\w])@(\w{1,15})\b/).warning(
					"Must be an Instagram username"
				),
		},
	],
};
