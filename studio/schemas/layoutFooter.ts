export default {
	name: "layoutFooter",
	title: "Layout Footer",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Name",
			type: "string",
		},
		{
			title: "Nav Items",
			name: "navItems",
			type: "array",
			of: [
				{
					type: "reference",
					to: [
						{
							type: "navItemGroup",
						},
					],
				},
			],
		},
		{
			title: "Social Links",
			name: "socialLinks",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "socialLink" }],
				},
			],
		},
		{
			title: "Copyright",
			name: "copyright",
			type: "string",
		},
	],
};
