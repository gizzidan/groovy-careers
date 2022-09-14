import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import JobPostings from '../components/job-postings'
import SEO from '../components/seo'
import { TextToUpper as cap } from '../utils/convert-to-uppercase'
import {
  Link,
  Flex,
  Button,
  Input,
  Wrap,
  Center,
  VStack,
  Tag,
  chakra,
  Text,
  Heading,
  WrapItem
} from '@chakra-ui/react'
import PaginationNav from '../components/pagination-nav'

interface Props {
  pageContext: {
    id: string
  },
  data: {
    sanityJobTag: {
      tagName: string
    }
    allSanityJobPosting: any
  }
}

export const query = graphql`
  query JobTagTemplateQuery($id: String, $skip: Int!, $limit: Int!) {
    sanityJobTag(id: {eq: $id}) {
      tagName
    }
     allSanityJobPosting(
      filter: {tags: {elemMatch: {id: {eq: $id}}}}
      sort: { fields: [stickyLength, _createdAt], order: [DESC, DESC] }
      limit: $limit
      skip: $skip
      )
      {
        nodes {
          _createdAt
          applicationLink
          position
          highlight
          id
          email
          includeLogo
          minAnnualSalary
          maxAnnualSalary
          location
          paymentStatus
          stickyLength
          slug {
            current
          }
          primarySkill {
            skillName
          }
          tags {
            id
            tagName
            slug {
              current
            }
          }
          company {
            name
            diverseOwnership
            logo {
              asset {
                url
              }
            }
          }
        }
      }
    }
  `

const JobTagTemplate = ({ pageContext, data }: Props) => {
  const { id } = pageContext
  const tagName = data.sanityJobTag?.tagName
  const tag = cap(tagName)

  return (
    <VStack spacing={5}>
      <Heading
        as="h1"
        textAlign="center"
        fontWeight="500"
      >
        {tag} Careers</Heading>
      <JobPostings data={data} />
      <PaginationNav pageContext={pageContext} />
    </VStack>
  )
}

export default JobTagTemplate

export const Head = ({ data }: any) => {
  const tagName = data.sanityJobTag?.tagName
  const title = "Cannabis Friendly " + cap(tagName) + " Careers"
  return (
    <SEO title={title} />
  )
}
