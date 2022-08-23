import { salaryRange } from "../components/salaryRange";
console.log(salaryRange);
export default {
	name: "jobPosting",
	title: "Job Posting",
	type: "document",
	fields: [
		{
			name: "position",
			title: "Position",
			type: "string",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "description",
			title: "Description",
			type: "array",
			of: [
				{
					type: "block",
				},
			],
			validation: (Rule) => Rule.required(),
		},
		{
			name: "company",
			title: "Company",
			type: "reference",
			to: [
				{
					type: "company",
				},
			],
			validation: (Rule) => Rule.required(),
		},
		{
			name: "primarySkill",
			title: "Primary Skill",
			type: "reference",
			to: [
				{
					type: "primarySkill",
				},
			],
			disableNew: true,
			validation: (Rule) => Rule.required(),
		},
		{
			name: "tags",
			title: "Tags",
			type: "array",
			of: [
				{
					type: "reference",
					to: [
						{
							type: "tag",
						},
					],
				},
			],
		},
		{
			name: "location",
			title: "Location",
			type: "string",
			description: "Remote and/or City, State, Country",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "applicationLink",
			title: "Application Link",
			type: "url",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "email",
			title: "Email",
			type: "string",
			description: "Email for invoices and edit links.",
			validation: (Rule) =>
				Rule.regex(
					/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
					{
						name: "email", // Error message is "Does not match email-pattern"
						invert: false, // Boolean to allow any value that does NOT match pattern
					}
				),
		},
		{
			name: "minAnnualSalary",
			title: "Minimum Annual Salary",
			type: "number",
			list: salaryRange,
		},
	],
};
