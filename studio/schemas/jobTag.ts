export default {
	name: "jobTag",
	title: "Job Tag",
	type: "document",
	fields: [
		{
			name: "tagName",
			title: "Tag Name",
			type: "string",
			validation: (Rule) => [
				Rule.lowercase().warning("Tags must be lowercase."),
				Rule.regex(/^\S*$/).warning("No spaces allowed."),
				Rule.required(),
			],
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "tag",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		},
	],
};
