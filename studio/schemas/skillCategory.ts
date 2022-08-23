export default {
	name: "skillCategory",
	title: "Skill Category",
	type: "document",
	fields: [
		{
			name: "categoryName",
			title: "Category Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "categoryName",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		},
	],
};
