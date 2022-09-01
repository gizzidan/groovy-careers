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
				}[];
				id: string;
				tagName: string;
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
	const createPostPromise =
		allJobTags &&
		allJobTags.nodes.map((tag) => {
			createPage({
				path: `posts/${tag.slug.current}`,
				component: tagTemplate,
				context: {
					id: allJobTags.id,
				},
			});
		});

	await Promise.all([createPostPromise]);
};
