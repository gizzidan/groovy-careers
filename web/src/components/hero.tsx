import React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import {
  Link,
  Flex,
  Button,
  VStack,
  HStack,
  Center,
  Wrap,
  WrapItem,
  chakra,
  Image,
  Text,
  Heading
} from '@chakra-ui/react'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import professional from '../images/professional.png'
import jobhunt from '../images/jobhunt.png'
import blooming from '../images/blooming.png'


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
      mt={20}
      mb={4}
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
          fontFamily="PicnicFont"
          fontWeight="normal"
          color="black"
        >
          {HomepageHero.heading}&nbsp;
          <span>
            {text}
          </span>
          <Cursor />
        </Heading>
        <Text
          size="md"
          opacity="0.8"
          variant="body"
          textAlign="center"
        >
          {HomepageHero.text}
        </Text>
        <Link as={GatsbyLink} to={`/${HomepageHero.cta.linkUrl}`}>
          <Button variant="brand">{HomepageHero.cta.text}</Button>
        </Link>
        <Text
          fontSize="xs"
          mt={2}
          textAlign="center"
          color="primary.800"
          opacity="0.6"
        >
          {HomepageHero.kicker}
        </Text>
      </VStack>
    </Flex>
  )
}

export default Hero

