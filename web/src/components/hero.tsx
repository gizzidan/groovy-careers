import React from 'react'
import { GatsbyImage, getImage} from 'gatsby-plugin-image'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import {
    Link,
    Flex,
    Button,
    VStack,
    Wrap,
    chakra,
    Text,
    Heading
} from '@chakra-ui/react'

const Hero = () => {
  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="nowrap"
      minH="70vh"
      px={8}
      mb={16}
    >
      <VStack
        spacing={4}
        w={{ base: "80%", md: "40%" }}
        align="center"
        m="auto"
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign="center"
        >
          Title
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign="center"
        >
          Subtitle
        </Heading>
        <Link as={GatsbyLink} to={`/$`}>
          <Button variant="brand-main">CTA Text</Button>
        </Link>
        <Text
          fontSize="xs"
          mt={2}
          textAlign="center"
          color="primary.800"
          opacity="0.6"
        >
          No credit card required.
        </Text>
      </VStack>
    </Flex>
  )
}

export default Hero