export default {
	name: "jobPosting",
	title: "Job Posting",
	type: "document",
	fields: [
		{
			name: "position",
			title: "Position",
			type: "string",
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
		},
		{
			name: "company",
			title: "Company",
			type: "string",
		},
	],
};
