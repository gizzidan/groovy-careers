export default {
	name: "homepageHero",
	title: "Homepage Hero",
	type: "document",
	fields: [
		{ title: "Heading", name: "heading", type: "string" },
		{
			title: "Typewriter",
			name: "typewriter",
			type: "array",
			of: [
				{
					type: "string",
				},
			],
		},
		{ title: "Kicker", name: "kicker", type: "string" },
		{ title: "Subhead", name: "subhead", type: "string" },
		{ title: "Image", name: "image", type: "image" },
		{ title: "Text", name: "text", type: "string" },
		{
			title: "CTA",
			name: "cta",
			type: "reference",
			to: {
				type: "navItem",
			},
		},
	],
};
