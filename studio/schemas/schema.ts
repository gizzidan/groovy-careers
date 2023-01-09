// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

import blogPost from "./blogPost";
import jobPosting from "./jobPosting";
import category from "./category";
import jobTag from "./jobTag";
import company from "./company";
import faq from "./faq";
import questionAnswer from "./questionAnswer";

import homepage from "./homepage";
import homepageHero from "./homepageHero";

import announcement from "./announcement";
import link from "./link";
import navItem from "./navItem";
import navItemGroup from "./navItemGroup";
import socialLink from "./socialLink";
import layout from "./layout";
import layoutHeader from "./layoutHeader";
import layoutFooter from "./layoutFooter";

import page from "./page";
// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
	// We name our schema
	name: "default",
	// Then proceed to concatenate our document type
	// to the ones provided by any plugins that are installed
	types: schemaTypes.concat([
		// things
		blogPost,
		jobPosting,
		category,
		jobTag,
		company,
		// homepage
		homepage,
		homepageHero,
		// layout
		announcement,
		link,
		navItem,
		navItemGroup,
		socialLink,
		layout,
		layoutHeader,
		layoutFooter,
		// HTML page
		page,
		faq,
		questionAnswer,
	]),
});
