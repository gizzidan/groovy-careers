import { GatsbyNode } from "gatsby";
import { resolve } from "path";
import * as path from "path";

type TypeTag = {
	id: string;
	tagName: string;
	slug: {
		current: string;
	};
};

type TypeJobPosting = {
	node: {
		id: string;
		position: string;
		slug: {
			current: string;
		};
	};
};

type TypeData = {
	allSanityJobTag: {
		nodes: TypeTag[];
	};
	allSanityJobPosting: {
		edges: TypeJobPosting[];
	};
};

export const createPages: GatsbyNode["createPages"] = async ({
	actions,
	graphql,
}) => {
	const { createPage } = actions;

	const data = await graphql<TypeData>(`
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
				edges {
					node {
						id
						position
						slug {
							current
						}
					}
				}
			}
		}
	`);

	const tagTemplate = path.resolve("./src/templates/job-tag.tsx");
	const jobPostingTemplate = path.resolve("./src/templates/job-posting.tsx");
	const jobPostingListTemplate = path.resolve("./src/templates/job-list.tsx");

	const allJobTags = data.data?.allSanityJobTag;
	const allJobPostings = data.data?.allSanityJobPosting;

	const postsPerPage = 3;
	const numPages = allJobPostings
		? Math.ceil(allJobPostings.edges.length / postsPerPage)
		: 0;

	const createJobPaginationPromise = Array.from({ length: numPages }).forEach(
		(_, i) => {
			createPage({
				path: i === 0 ? `/job` : `/job/page/${i + 1}`,
				component: jobPostingListTemplate,
				context: {
					limit: postsPerPage,
					skip: i * postsPerPage,
					currentPage: i + 1,
					numPages,
				},
			});
		}
	);
	const createTagPromise = allJobTags?.nodes.map((tag) => {
		const { id, slug = {} } = tag;
		if (!slug) return;
		createPage({
			path: `/${tag.slug.current}-jobs`,
			component: tagTemplate,
			context: { id },
		});
	});

	const createJobPostingPromise = allJobPostings?.edges.map((node) => {
		const posting = node.node;
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
