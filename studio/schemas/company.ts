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
			type: "string",
			description: "Address for receiving invoices.",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "twitter",
			title: "Twitter",
			type: "string",
			description: "Company Twitter username",
			validation: (Rule) => Rule.regex(/^@?(\w){1,15}$/),
		},
		{
			name: "instagram",
			title: "Instagram",
			type: "string",
			description: "Company Instagram username",
			validation: (Rule) => Rule.regex(/^@?(\w){1,15}$/),
		},
	],
};
