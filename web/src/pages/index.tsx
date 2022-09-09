import { Box, Heading, Link, Text } from '@chakra-ui/react'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import React from 'react'
import SEO from '../components/seo'
import Hero from '../components/hero'
import PostingContainer from '../components/job-postings'
import SearchSection from '../components/search-section'
import JobPostings from '../components/job-postings'


const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query JobPostingQuery {
      allSanityJobPosting
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
  `)
  return (
    <>
      <Hero />
      <SearchSection />
      <JobPostings data={data} />
    </>
  )

}


export default IndexPage

export const Head = () => (
  <SEO />
)