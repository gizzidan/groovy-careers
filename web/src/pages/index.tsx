import { Box, Heading, Link, Text } from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import SEO from '../components/seo'
import Hero from '../components/hero'
import PostingContainer from '../components/posting-container'
import SearchSection from '../components/search-section'

const IndexPage = () => (
  <>
    <Hero />
    <SearchSection />
    <PostingContainer />
  </>
)

export default IndexPage

export const Head = () => (
  <SEO />
)