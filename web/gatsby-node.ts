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
			module: {
				rules: [
					{
						test: /canvas/,
						use: loaders.null(),
					},
				],
			},
		});
	}
};

// Types
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

type TypeBlogPost = {
	id: string;
	title: string;
	slug: {
		current: string;
	};
};

type TypeBlogPostTag = {
	id: string;
	tagName: string;
	slug: {
		current: string;
	};
};

type TypeData = {
	allSanityBlogPost: {
		nodes: TypeBlogPost[];
	};
	allSanityJobTag: {
		nodes: TypeTag[];
	};
	allSanityBlogPostTag: {
		nodes: TypeBlogPostTag[];
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
			allSanityBlogPost {
				nodes {
					id
					title
					slug {
						current
					}
				}
			}
			allSanityBlogPostTag {
				nodes {
					id
					tagName
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

	// Job Posting stuff
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

	// Blog Post stuff
	const blogPostTemplate = path.resolve("./src/templates/blog-post.tsx");
	const allBlogPosts = data.data?.allSanityBlogPost;
	const createBlogPostPromise = allBlogPosts?.nodes.map((node) => {
		const { id, slug = {} } = node;
		if (!slug) return;
		createPage({
			path: `/blog/${node.slug.current}`,
			component: blogPostTemplate,
			context: { id },
		});
	});

	// Blog Post Tag stuff
	const blogPostTagTemplate = path.resolve("./src/templates/blog-post-tag.tsx");
	const allBlogPostTags = data.data?.allSanityBlogPostTag;
	const createBlogPostTagPromise = allBlogPostTags?.nodes.map((node) => {
		const { id, tagName, slug = {} } = node;
		if (!slug) return;
		createPage({
			path: `/tags/${node.slug.current}`,
			component: blogPostTagTemplate,
			context: { id, tagName },
		});
	});

	await Promise.all([
		createJobPostingPromise,
		createBlogPostPromise,
		createBlogPostTagPromise,
	]);
};
