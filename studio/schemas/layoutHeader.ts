export default {
	name: "layoutHeader",
	title: "Layout Header",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Name",
			type: "string",
		},
		{
			title: "Nav Items Group",
			name: "navItemsGroup",
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
			title: "CTA",
			name: "cta",
			type: "reference",
			to: [
				{
					type: "navItem",
				},
			],
		},
	],
};
