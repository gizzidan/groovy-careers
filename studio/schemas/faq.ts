export default {
	name: "faq",
	title: "FAQ",
	type: "document",
	fields: [
		{
			title: "Audience",
			name: "audience",
			type: "string",
		},
		{
			title: "FAQ List",
			name: "faqList",
			type: "array",
			of: [
				{
					title: "Question and Answer",
					name: "questionAnswer",
					type: "questionAnswer",
				},
			],
		},
	],
};
