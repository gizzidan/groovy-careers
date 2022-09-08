import React from 'react'
import { graphql } from 'gatsby'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import { PortableTextTypeComponent } from '@portabletext/react'

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
  Box,
  Heading,
  Avatar,
  WrapItem,
  position
} from '@chakra-ui/react'

type Block = {
  _key: string;
  _type: string;
}
type BlockChild = Block & {
  marks: string[];
  text: string;
}
type BlockDefault = Block & {
  children: BlockChild[];
  style: string;
}

const components: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <Text>{children}</Text>,
  }
};

interface Props {
  pageContext: {
    id: string
  },
  data: {
    sanityJobPosting: {
      applicationLink: URL
      position: string
      description: BlockDefault
      _rawDescription: any
      id: string
      includeLogo: boolean
      minAnnualSalary: number
      maxAnnualSalary: number
      location: string
      primarySkill: {
        skillName: string
      }
      tags: {
        id: string
        tagName: string
        slug: {
          current: string
        }
      }[]
      company: {
        name: string
        diverseOwnership: string[]
        logo: {
          asset: {
            url: string
          }
        }
      }
    }
  }
}


export const query = graphql`
  query JobPostingTemplateQuery($id: String) {
    sanityJobPosting(id: {eq: $id}) {
      applicationLink
      position
      description {
        _key
        _type
        children {
          text
          marks
        }
        style
      }
      _rawDescription(resolveReferences: {maxDepth: 10})
      id
      includeLogo
      minAnnualSalary
      maxAnnualSalary
      location
      primarySkill {
        skillName
      }
      tags {
        id
        tagName
        slug {
          current
        }
      }
      company {
        name
        diverseOwnership
        logo {
          asset {
            url
          }
        }
      }
    }
  }
`


const JobPostingTemplate = ({ pageContext, data }: Props) => {
  const { id } = pageContext
  const posting = data.sanityJobPosting
  const minSalary = "$" + posting.minAnnualSalary / 1000 + "k"
  const maxSalary = "$" + posting.maxAnnualSalary / 1000 + "k"

  return (
    <VStack
      p={10}
      maxWidth="70%"
      m="auto"
    >
      {posting.includeLogo ?
        posting.company.logo
          ? <Avatar name={posting.company.name} src={posting.company.logo.asset.url}></Avatar>
          : <Avatar name={posting.company.name}></Avatar>
        : <Avatar name={posting.company.name}></Avatar>
      }
      <Heading
        as="h1"
        fontFamily="GT-America"
        textAlign="center"
        fontWeight="500"
        whiteSpace="pre-wrap"
      >{posting.company.name} is hiring a
        <br /><strong>{posting.position}</strong>
      </Heading>
      <Text variant="mono">
        Compensation: {minSalary} - {maxSalary}
      </Text>
      <Text variant="mono">
        {posting.location}
      </Text>
      <Button variant="solid">Apply Now</Button>
      <PortableText value={posting._rawDescription} components={components} />
    </VStack>
  )
}

export default JobPostingTemplate