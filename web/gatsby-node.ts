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
		group: {
			totalCount: number;
			fieldValue: string;
		}[];
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
				group(field: tags___tagName) {
					totalCount
					fieldValue
				}
			}
		}
	`);

	const jobPostingTemplate = path.resolve("./src/templates/job-posting.tsx");
	const jobPostingListTemplate = path.resolve("./src/templates/job-list.tsx");

	const allJobTags = data.data?.allSanityJobTag;
	const allJobPostings = data.data?.allSanityJobPosting;

	const postsPerPage = 2;
	const numPages = allJobPostings
		? Math.ceil(allJobPostings.edges.length / postsPerPage)
		: 1;

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

	await Promise.all([createJobPostingPromise]);
};
