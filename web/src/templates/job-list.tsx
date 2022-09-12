import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Link,
  List,
  ListItem,
  Text
} from '@chakra-ui/react'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import React from 'react'
import SEO from '../components/seo'
import Hero from '../components/hero'
import SearchSection from '../components/search-section'
import JobPostings from '../components/job-postings'
import { FiArrowRight, FiArrowLeft } from "react-icons/fi"

export const query = graphql`
    query JobListTemplateQuery($skip: Int!, $limit: Int!) {
      allSanityJobPosting(
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

const JobPostingListTemplate = ({ data, pageContext }: any) => {
  const currentPage = pageContext.currentPage
  const next = `/job/page/${currentPage + 1}`
  const prev = currentPage === 2 ? '/job' : `/job/page/${currentPage - 1}`
  let nextDisplay = false
  let nextDisabled = false
  currentPage < pageContext.numPages
    ? (nextDisplay = false, nextDisabled = false)
    : (nextDisplay = true, nextDisabled = true)

  var prevDisplay = false
  var prevDisabled = false
  currentPage > 1
    ? (prevDisplay = false, prevDisabled = false)
    : (prevDisplay = true, prevDisabled = true)

  return (
    <>
      <Hero />
      <SearchSection />
      <JobPostings data={data} />
      <Box textAlign="center">
        <ButtonGroup isAttached={true}>
          {currentPage == 1
            ?
            <>
              <Button
                borderRightRadius={0}
                borderRightWidth={0}
                leftIcon={<FiArrowLeft />}
                variant="outline"
                colorScheme="mantis"
                isDisabled={true}>
                Prev
              </Button>
              <Button
                borderRadius={0}
                variant="outline"
                colorScheme="mantis"
                isActive={true} >
                {currentPage}
              </Button>
              <Link
                _hover={{
                  textDecoration: "none"
                }}
                as={GatsbyLink}
                to={next}>
                <Button
                  borderLeftRadius={0}
                  borderLeftWidth={0}
                  rightIcon={<FiArrowRight />}
                  variant="outline"
                  colorScheme="mantis"
                  isDisabled={nextDisplay}>
                  Next
                </Button>
              </Link>
            </>
            : currentPage > 1 && currentPage < pageContext.numPages
              ?
              <>
                <Link
                  _hover={{
                    textDecoration: "none"
                  }}
                  as={GatsbyLink}
                  to={prev}>
                  <Button
                    borderRightRadius={0}
                    borderRightWidth={0}
                    leftIcon={<FiArrowLeft />}
                    variant="outline"
                    colorScheme="mantis"
                    isDisabled={prevDisplay}>
                    Prev
                  </Button>
                </Link>
                <Button
                  borderRadius={0}
                  variant="outline"
                  colorScheme="mantis"
                  isActive={true} >
                  {currentPage}
                </Button>
                <Link
                  _hover={{
                    textDecoration: "none"
                  }}
                  as={GatsbyLink}
                  to={next}>
                  <Button
                    borderLeftRadius={0}
                    borderLeftWidth={0}
                    rightIcon={<FiArrowRight />}
                    variant="outline"
                    colorScheme="mantis"
                  >
                    Next
                  </Button>
                </Link>
              </>
              :
              <>
                <Link
                  _hover={{
                    textDecoration: "none"
                  }}
                  as={GatsbyLink}
                  to={prev}>
                  <Button
                    borderRightRadius={0}
                    borderRightWidth={0}
                    leftIcon={<FiArrowLeft />}
                    variant="outline"
                    colorScheme="mantis"
                  >
                    Prev
                  </Button>
                </Link>
                <Button
                  borderRadius={0}
                  variant="outline"
                  colorScheme="mantis"
                  isActive={true} >
                  {currentPage}
                </Button>
                <Button
                  borderLeftRadius={0}
                  borderLeftWidth={0}
                  rightIcon={<FiArrowRight />}
                  variant="outline"
                  colorScheme="mantis"
                  isDisabled={true}>
                  Next
                </Button>

              </>

          }
        </ButtonGroup>
      </Box>
    </>
  )

}


export default JobPostingListTemplate

