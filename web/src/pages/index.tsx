import {
  Box,
} from '@chakra-ui/react'
import React from 'react'
import SEO from '../components/seo'
import Hero from '../components/hero'
import Search from '../components/search'

const IndexPage = () => {

  return (
    <>
      <Hero />
      <Box id="results" py={2} bg={["whiteAlpha.700"]}>
        <Search />
      </Box>
    </>
  )
}

export default IndexPage

export const Head = () => (
  <SEO />
)