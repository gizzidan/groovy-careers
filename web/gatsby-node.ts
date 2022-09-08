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
					id: string;
					tagName: string;
					slug: {
						current: string;
					};
				}[];
			};
			allSanityJobPosting: {
				nodes: {
					id: string;
					position: string;
					slug: {
						current: string;
					};
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
			allSanityJobPosting {
				nodes {
					id
					position
					slug {
						current
					}
				}
			}
		}
	`);

	const tagTemplate = path.resolve("./src/templates/job-tag.tsx");
	const jobPostingTemplate = path.resolve("./src/templates/job-posting.tsx");

	const allJobTags = data.data?.allSanityJobTag;
	const allJobPostings = data.data?.allSanityJobPosting;

	const createTagPromise = allJobTags?.nodes.map((tag) => {
		const { id, slug = {} } = tag;
		if (!slug) return;
		createPage({
			path: `/${tag.slug.current}-jobs`,
			component: tagTemplate,
			context: { id },
		});
	});

	const createJobPostingPromise = allJobPostings?.nodes.map((posting) => {
		const { id, slug = {} } = posting;
		if (!slug) return;
		createPage({
			path: `/${posting.slug.current}`,
			component: jobPostingTemplate,
			context: { id },
		});
	});

	await Promise.all([createTagPromise]);
	await Promise.all([createJobPostingPromise]);
};
