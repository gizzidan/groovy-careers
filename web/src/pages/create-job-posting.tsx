import React from 'react'
import loadable from '@loadable/component'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import SEO from '../components/seo'

const NewPostingForm = loadable(() => import('../components/new-posting-form.tsx'))

// Types
type PopulateList = {
  data: {
    allSanityCompany: {
      nodes: {
        id: string
        name: string
      }[]
    }
    allSanityCategory: {
      nodes: {
        id: string
        categoryName: string
      }[]
    }
    allSanityJobTag: {
      nodes: {
        id: string
        tagName: string
      }[]
    }
  }
}

const CreateJobPosting = (data: PopulateList) => {
  return (
    <NewPostingForm data={data.data} />
  )
}

// Page Query
export const query = graphql`
  query NewPageQuery {
    allSanityCompany(sort:
    {fields: [name],
    order: [ASC]})
    {
      nodes {
        id
        name
        logo {
          asset {
            url
          }
        }
      }
    }
    allSanityCategory(sort:
    {fields: [categoryName],
    order: [ASC]})
    {
      nodes {
        id
        categoryName
      }
    }
    allSanityJobTag(sort:{fields: [tagName], order: [ASC]})
    {
      nodes {
        id
        tagName
      }
    }
    allSanitySubscription {
      nodes {
        status
        subscriptionName
        postingCount
        couponCode {
          current
        }
      }
    }
  }
`

export default CreateJobPosting

export const Head = () => (
  <SEO title="Create new job posting" />
)