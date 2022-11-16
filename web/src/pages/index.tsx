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
import PaginationNav from '../components/pagination-nav'
import Search from '../components/search'

const IndexPage = () => {

  return (
    <>
      <Hero />
      <Box py={2} bg="#f3f3f3">
        <Search />
      </Box>
    </>
  )
}

export default IndexPage

export const Head = () => (
  <SEO />
)