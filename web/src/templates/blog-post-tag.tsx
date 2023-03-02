import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import { TextToUpper as cap } from '../utils/convert-to-uppercase'
var a = require('indefinite');
import BlogPostGrid from '../components/blog-post-grid'

interface Props {
  pageContext: {
    id: string
    tagName: string
  },
  data: {
    allSanityBlogPost: {
      nodes: {
        id: string,
        publishedAt: any,
        title: string,
        summary: string,
        image: {
          asset: {
            gatsbyImageData: any
            url: string
          }
        }
        tags: {
          id: string,
          tagName: string,
          slug: {
            current: string
          }
        }[]
        slug: {
          current: string
        }
      }[]
    }
    allSanityBlogPostTag: {
      nodes: {
        id: string
        tagName: string
        slug: {
          current: string
        }
      }[]
    }
  }
}


const BlogPostTagTemplate = ({ pageContext, data }: Props) => {
  const { id } = pageContext

  return (
    <>
      <BlogPostGrid data={data} heading={pageContext.tagName} />
    </>
  )
}

export const query = graphql`
  query BlogPostTagTemplateQuery($id: String) {
    allSanityBlogPost(
      sort: {order: DESC, fields: publishedAt}
      filter: {
        tags: {
          elemMatch: {
            id: {
              eq: $id}}}}
  )  {
      nodes {
        id
        publishedAt
        title
        summary
        image {
          asset {
            gatsbyImageData(
              aspectRatio: 1.618
            )
            url
          }
        }
        tags {
          id
          tagName
          slug {
            current
          }
        }
        slug {
          current
        }
      }
    }
    allSanityBlogPostTag(sort: {fields: tagName, order: ASC}) {
      nodes {
        id
        tagName
        slug {
          current
        }
      }
    }
  }
`

export default BlogPostTagTemplate

export const Head = ({ data, pageContext }: any) => {
  return (
    <SEO title={`${cap(pageContext.tagName)} Blog Posts`} description={`Groovy Careers ${pageContext.tagName} blog posts`} />
  )
}