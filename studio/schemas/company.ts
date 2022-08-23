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
	],
};
