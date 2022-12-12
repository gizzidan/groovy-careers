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
import React from 'react'
import SEO from '../components/seo'
import Hero from '../components/hero'
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