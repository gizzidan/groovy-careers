import { FiMenu } from "react-icons/fi";

export default {
	name: "navItemGroup",
	title: "Nav Item Group",
	type: "document",
	icon: FiMenu,
	preview: {
		select: {
			title: "name",
		},
	},
	fields: [
		{
			title: "Name",
			name: "name",
			type: "string",
		},
		{
			name: "navItems",
			type: "array",
			title: "Nav Items",
			of: [
				{
					type: "reference",
					to: [
						{
							type: "navItem",
						},
					],
				},
			],
		},
	],
};
