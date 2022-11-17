import React, { ReactNode, useState, useEffect, useRef } from 'react'
import loadable from '@loadable/component'
import { useForm } from '@mantine/form';
import { TextInput, Checkbox, Group } from '@mantine/core';
import {
  Box,
  Button,
  Divider,
  ButtonGroup,
  Heading,
  Link,
  List,
  ListItem,
  FormLabel,
  FormErrorMessage,
  VStack,
  HStack,
  Textarea,
  Input,
  InputGroup,
  Select,
  Radio,
  RadioGroup,
  Stack,
  Flex,
  FormControl,
  Switch,
  FormHelperText,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  RangeSliderMark,
  Text
} from '@chakra-ui/react'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import SEO from '../components/seo'

const Faq = ({ q, a }: any) => {
  return (
    <VStack
      align="left"
    >
      <Heading
        fontFamily="GT-America"
        fontWeight="bold"
        textAlign="left"
        as="h2"
        size="md"
      >
        {q}
      </Heading>
      <Text
        fontSize="lg"
      >
        {a}
      </Text>
    </VStack>
  )
}

const FaqApplicants = (data: any) => {
  const faq = data.sanityFaq

  return (
    <Flex
      bg="white"
      align="center"
      px={8}
      py={10}
    >
      <VStack
        spacing={12}
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
            FAQ for Applicants
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
        </VStack>
      </VStack>

    </Flex>
  )
}

export const query = graphql`
  query FaqApplicantsQuery {
    sanityFaq(audience: {eq: "Applicants"}) {
      audience
      faqList {
        answer
        question
      }
    }
  }
`

export default FaqApplicants