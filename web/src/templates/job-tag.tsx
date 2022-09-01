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
  data: {
    sanityJobTag: {
      tagName: string
    }
  }
}
export const data = useStaticQuery(graphql`
  query JobTagTemplateQuery($id: String!) {
    sanityJobTag(id: {$id}) {
      tagName
    }
  }
`)

const JobTagTemplate = ({ data }: Props) => {
  const tagName = data.sanityJobTag.tagName

  return (
    <Flex>
      {tagName}
    </Flex>
  )
}

export default JobTagTemplate

