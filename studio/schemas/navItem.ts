import { FiLink } from "react-icons/fi";

export default {
	name: "navItem",
	title: "Nav Item",
	type: "document",
	icon: FiLink,
	preview: {
		select: {
			title: "text",
			subtitle: "href.linkUrl",
		},
	},
	fields: [
		{
			title: "Text",
			name: "text",
			type: "string",
		},
		{
			title: "HREF",
			name: "href",
			type: "link",
		},
		{
			title: "Icon",
			name: "icon",
			type: "image",
		},
		{
			title: "Description",
			name: "description",
			type: "string",
		},
	],
};
