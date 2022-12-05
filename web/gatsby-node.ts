import { GatsbyNode } from "gatsby";
import * as path from "path";

exports.onCreateWebpackConfig = ({
	stage,
	rules,
	loaders,
	plugins,
	actions,
}: any) => {
	if (stage === "build-html") {
		actions.setWebpackConfig({
			externals: ["canvas"],
		});
	}
};

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

	const allJobPostings = data.data?.allSanityJobPosting;

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
