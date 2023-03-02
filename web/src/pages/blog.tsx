import {
  Box,
} from '@chakra-ui/react'
import React from 'react'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import SEO from '../components/seo'
import BlogPostGrid from '../components/blog-post-grid'

interface Props {
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

const BlogPage = ({ data }: Props) => {

  return (
    <>
      <BlogPostGrid data={data} heading="All" />
    </>
  )
}

export const query = graphql`
  query BlogPageQuery {
    allSanityBlogPost( sort: {order: DESC, fields: publishedAt}) {
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
    allSanityBlogPostTag(sort: {fields: tagName, order: ASC}){
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

export default BlogPage

export const Head = () => (
  <SEO />
)