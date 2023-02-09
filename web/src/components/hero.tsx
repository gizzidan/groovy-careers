import React from 'react'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import {
  Flex,
  VStack,
  Text,
  Heading,
  useMediaQuery,
} from '@chakra-ui/react'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { FiChevronDown, FiSettings, FiSliders } from "react-icons/fi"
import NewsletterSignup from './newsletter-signup'


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
      allSanityCategory(sort:
      {fields: [categoryName],
      order: [ASC]})
      {
        nodes {
          id
          categoryName
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
      minH="20vh"
      px={[5, 8]}
      mt={7}
      mb={7}
    >
      <VStack
        spacing={6}
        align="center"
        m="auto"
      >
        <Heading
          as="h1"
          size={['2xl', '2xl']}
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
          fontSize={['lg', 'lg']}
          opacity="1"
          color="black"
          variant="body"
          textAlign="center"
        >
          {HomepageHero.text}
        </Text>
        <NewsletterSignup />
      </VStack >
    </Flex >
  )
}

export default Hero

