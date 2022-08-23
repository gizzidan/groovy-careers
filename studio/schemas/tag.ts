export default {
	name: "tag",
	title: "Tag",
	type: "document",
	fields: [
		{
			name: "tag",
			title: "Tag",
			type: "string",
			validation: (Rule) => [
				Rule.lowercase().warning("Tags must be lowercase."),
				Rule.regex(/^\S*$/).warning("No spaces allowed."),
				Rule.required(),
			],
		},
	],
};
