import { GatsbyNode } from "gatsby";
import { resolve } from "path";
import * as path from "path";

export const createPages: GatsbyNode["createPages"] = async ({
	actions,
	graphql,
}) => {
	const { createPage } = actions;

	const data: {
		errors?: any;
		data?: {
			allSanityJobTag: {
				nodes: {
					slug: {
						current: string;
					};
					id: string;
					tagName: string;
				}[];
			};
		};
	} = await graphql(`
		query {
			allSanityJobTag {
				nodes {
					tagName
					id
					slug {
						current
					}
				}
			}
		}
	`);

	const tagTemplate = path.resolve("./src/templates/job-tag.tsx");
	const allJobTags = data.data?.allSanityJobTag;
	const createPostPromise = allJobTags?.nodes.map((tag) => {
		const { id, slug = {} } = tag;
		if (!slug) return;
		createPage({
			path: `/${tag.slug.current}-jobs`,
			component: tagTemplate,
			context: { id },
		});
	});

	await Promise.all([createPostPromise]);
};
