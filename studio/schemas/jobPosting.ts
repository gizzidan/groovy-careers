import { salaryRange } from "../components/salaryRange";
export default {
	name: "jobPosting",
	title: "Job Posting",
	type: "document",
	preview: {
		select: {
			title: "position",
			subtitle: "company.name",
		},
	},
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
							type: "jobTag",
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
				).required(),
		},
		{
			name: "minAnnualSalary",
			title: "Minimum Annual Salary",
			type: "number",
			options: {
				list: salaryRange,
			},
		},
		{
			name: "maxAnnualSalary",
			title: "Maximum Annual Salary",
			type: "number",
			options: {
				list: salaryRange,
			},
			validation: (Rule) =>
				Rule.min(Rule.valueOfField("minAnnualSalary")).warning(
					"The maximum salary can't be lower than the minimum salary."
				),
		},
		{
			name: "includeLogo",
			title: "Include Logo",
			type: "boolean",
			description: "Set to include company logo in job post.",
		},
		{
			name: "stickyLength",
			title: "Sticky Length",
			type: "number",
			description: "How many days to pin post to the top.",
			options: {
				list: [0, 1, 7],
				layout: "radio",
			},
			validation: (Rule) => Rule.required(),
		},
		{
			name: "highlight",
			title: "Highlight",
			type: "boolean",
			description: "Highlight your posting.",
		},
		{
			name: "coupon",
			title: "Coupon",
			type: "string",
			description: "Coupon code for pre-purchased postings.",
		},
		{
			name: "paymentStatus",
			title: "Payment Received",
			type: "boolean",
			description: "Set to Payment Received if Stripe payment was completed.",
		},
	],
	initialValue: {
		stickyLength: 0,
		highlight: false,
		paymentStatus: false,
		includeLogo: false,
	},
};
