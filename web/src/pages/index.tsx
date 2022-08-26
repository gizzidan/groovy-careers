import { Box, Heading, Link, Text } from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import SEO from '../components/seo'
import Hero from '../components/hero'

const IndexPage = () => (
  <Hero />
)

export default IndexPage

export const Head = () => (
  <SEO />
)