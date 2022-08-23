export default {
	name: "primarySkill",
	title: "Primary Skill",
	type: "document",
	fields: [
		{
			name: "skill",
			title: "Skill",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
	],
};
