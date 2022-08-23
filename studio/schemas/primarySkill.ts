export default {
	name: "primarySkill",
	title: "Primary Skill",
	type: "document",
	fields: [
		{
			name: "skillName",
			title: "Skill Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "skillCategory",
			title: "Skill Category",
			type: "reference",
			to: [
				{
					type: "skillCategory",
				},
			],
			validation: (Rule) => Rule.required(),
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "skillName",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		},
	],
};
