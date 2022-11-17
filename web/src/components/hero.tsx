import React from 'react'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import {
  Link,
  Flex,
  Button,
  VStack,
  Text,
  Box,
  Image,
  Heading,
  useMediaQuery
} from '@chakra-ui/react'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import heroImage from "../images/tokyo-magnifier-web-search-with-elements.png"


const Hero = () => {
  const data = useStaticQuery(graphql`
    query HomepageHeader {
      sanityHomepageHero {
        heading
        kicker
        subhead
        text
        typewriter
        cta {
          text
          href {
            externalContent
            linkUrl
          }
        }
      }
    }
  `)
  const [isLargerThan600] = useMediaQuery('(max-width: 600px)')
  const HomepageHero = data.sanityHomepageHero
  const words = HomepageHero.typewriter.slice(0)
  const { text } = useTypewriter({
    words: words,
    loop: false,
    typeSpeed: 110,
    deleteSpeed: 70,
    delaySpeed: 2000
  })

  return (
    <Flex
      align="center"
      minH="25vh"
      px={8}
      mt={10}
      mb={10}
    >
      <VStack
        spacing={6}
        align="center"
        m="auto"
      >
        <Heading
          as="h1"
          size="2xl"
          textAlign="center"
          fontFamily="Gulax"
          textTransform="uppercase"
          fontWeight="normal"
          color="black"
          whiteSpace="pre-wrap"
        >{HomepageHero.heading}
          {isLargerThan600 ? '\n' : ' '}
          <span>
            {text}
          </span>
          <Cursor />
        </Heading>
        <Text
          fontSize="md"
          opacity="1"
          color="black"
          variant="body"
          textAlign="center"
        >
          {HomepageHero.text}
        </Text>
        <Link
          _hover={{
            textDecoration: "none"
          }}
          href={`/${HomepageHero.cta.href.linkUrl}`}>
          <Button variant="brand">{HomepageHero.cta.text}</Button>
        </Link>
        <Text
          fontSize="xs"
          mt={2}
          textAlign="center"
          color="black"
          opacity="1"
        >
          {HomepageHero.kicker}
        </Text>
      </VStack>
    </Flex>
  )
}

export default Hero

