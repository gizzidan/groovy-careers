export default {
	name: "blogPost",
	title: "Blog Post",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		},
		{
			name: "publishedAt",
			title: "Published At",
			type: "date",
			initialValue: new Date().toISOString().substring(0, 10),
		},
		{
			name: "summary",
			title: "Summary",
			type: "text",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "body",
			title: "Body",
			type: "array",
			of: [
				{
					type: "block",
				},
			],
			validation: (Rule) => Rule.required(),
		},
	],
	preview: {
		select: {
			title: "title",
		},
	},
};
