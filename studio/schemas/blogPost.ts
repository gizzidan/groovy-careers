export default {
	name: "blogPost",
	title: "Blog Post",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
		},
		{
			name: "publishedAt",
			title: "Published At",
			type: "date",
		},
		{
			name: "summary",
			title: "Summary",
			type: "text",
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
		},
	],
	preview: {
		select: {
			title: "title",
		},
	},
};
