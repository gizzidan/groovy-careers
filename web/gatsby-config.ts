import type { GatsbyConfig } from "gatsby";
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
	proxy: {
		prefix: "/api",
		url: "https://groovy.careers",
	},
	siteMetadata: {
		title: `Groovy Careers`,
		description: `A job board tailored for socially innovative and culturally disruptive companies.`,
		author: `Groovy Careers`,
		image: `src/images/icon.png`,
		siteUrl: `https://groovy.careers`,
	},
	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	flags: {
		DEV_SSR: false,
	},
	plugins: [
		{
			resolve: `gatsby-plugin-facebook-pixel`,
			options: {
				pixelId: "742048860601364",
			},
		},
		{
			resolve: "gatsby-source-sanity",
			options: {
				projectId: "6t1tj18u",
				dataset: "production",
			},
		},
		"gatsby-plugin-image",
		"gatsby-plugin-smoothscroll",
		"gatsby-plugin-sitemap",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				icon: "src/images/icon.png",
			},
		},
		"gatsby-plugin-mdx",
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: "./src/images/",
			},
			__key: "images",
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "pages",
				path: "./src/pages/",
			},
			__key: "pages",
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "fonts",
				path: "./src/fonts/",
			},
			__key: "fonts",
		},
		{
			resolve: "@chakra-ui/gatsby-plugin",
			options: {
				resetCSS: true,
			},
		},
		{
			resolve: `gatsby-plugin-rudderstack`,
			options: {
				prodKey: process.env.RUDDERSTACK_PROD_WRITE_KEY,
				devKey: process.env.RUDDERSTACK_DEV_WRITE_KEY,
				trackPage: true,
				trackPageDelay: 50,
				dataPlaneUrl: `https://groovydanwkdl.dataplane.rudderstack.com`,
				delayLoad: false,
				delayLoadTime: 1000,
				manualLoad: false,
			},
		},
	],
};

export default config;
