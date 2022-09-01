import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import {
  Link,
  Flex,
  Button,
  Input,
  Wrap,
  Center,
  VStack,
  Tag,
  chakra,
  Text,
  Heading,
  WrapItem
} from '@chakra-ui/react'

interface Props {
  pageContext: {
    id: string
  },
  data: {
    sanityJobTag: {
      tagName: string
    }
  }
}

export const query = graphql`
  query JobTagTemplateQuery($id: String) {
    sanityJobTag(id: {eq: $id}) {
      tagName
    }
  }
`

const JobTagTemplate = ({ pageContext, data }: Props) => {
  const { id } = pageContext
  const tagName = data.sanityJobTag?.tagName

  return (
    <Flex>
      <Text>Tag: {tagName}</Text>
    </Flex>
  )
}

export default JobTagTemplate

