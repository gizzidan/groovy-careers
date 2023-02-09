import React from 'react'
import {
  Heading,
  VStack,
  Flex,
  Text
} from '@chakra-ui/react'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import SEO from '../components/seo'
import { Faq } from './faq-applicants';

const FaqCompanies = (data: any) => {
  const faq = data.data.sanityFaq

  return (
    <Flex
      bg="white"
      align="center"
      px={8}
      py={[10, 20]}
    >
      <VStack
        spacing={8}
        m="auto"
        w="xl"
      >
        <VStack
          spacing={6}
          align="center"
        >
          <Heading
            as="h1"
          >
            FAQ for {faq.audience}
          </Heading>
          <Text
            fontSize="lg"
          >
            Curious about how to use Groovy Careers to help you find your dream job? Browse our frequently asked questions and answers below. If you're a company or employer then be sure to checkout that FAQ here.
          </Text>
        </VStack>
        <VStack
          align="left"
          spacing={8}
        >
          {faq.faqList.map((faq: any) =>
            <Faq key={faq.answer} q={faq.question} a={faq.answer} />
          )}
        </VStack>
      </VStack>

    </Flex>
  )
}

export const query = graphql`
  query FaqCompaniesQuery {
    sanityFaq(audience: {eq: "Companies"}) {
      audience
      faqList {
        answer
        question
      }
    }
  }
`

export default FaqCompanies

export const Head = () => (
  <SEO title="Company FAQ - Groovy Careers" />
)