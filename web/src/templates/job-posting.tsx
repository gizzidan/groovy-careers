import React from 'react'
import { graphql } from 'gatsby'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import SEO from '../components/seo'
import TimeAgo from 'react-timeago'
import { TextToUpper as cap } from '../utils/convert-to-uppercase'
import { blocksToText } from '../utils/blocks-to-text'
var a = require('indefinite');
import { numDaysBetween } from '../utils/num-days-between'
import { formatter } from '../components/search'
import {
  Link,
  Flex,
  Button,
  Wrap,
  VStack,
  ListItem,
  Tag,
  Text,
  Heading,
  Avatar,
  UnorderedList,
  Grid,
  GridItem
} from '@chakra-ui/react'
import DiversityTags from '../components/diversity-tags'

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
    normal: ({ children }) => <Text justifyItems="left" fontSize={"lg"} > {children}</Text>,
  },
  list: {
    bullet: ({ children }) => <UnorderedList pl={"7%"} fontSize={"lg"}>{children}</UnorderedList>
  },
  listItem: {
    bullet: ({ children }) => <ListItem>{children}</ListItem>
  }
};

interface Props {
  pageContext: {
    id: string
  },
  data: {
    sanityJobPosting: {
      _createdAt: any
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
      _createdAt
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
      p={[3, "50px"]}
      maxWidth={["100%", "900px"]}
      m="auto"
      spacing={5}
      bg="white"
    >
      {posting.includeLogo ?
        posting.company.logo
          ? <Avatar size="lg" name={posting.company.name} src={posting.company.logo.asset.url}></Avatar>
          : <Avatar color="black" bg="blackAlpha.300" size="lg" name={posting.company.name}></Avatar>
        : <Avatar color="black" bg="blackAlpha.300" size="lg" name={posting.company.name}></Avatar>
      }
      <DiversityTags label={null} diverseOwnership={posting.company.diverseOwnership} />
      <Heading
        as="h1"
        fontFamily="GT-America"
        textAlign="center"
        fontWeight="500"
        whiteSpace="pre-wrap"
      >{posting.company.name} is hiring {a(posting.position, { articleOnly: true })}
        <br /><strong>{posting.position}</strong>
      </Heading>
      <Text variant="mono">
        Compensation: {minSalary} - {maxSalary}
      </Text>
      <Text variant="mono">
        {posting.location}
      </Text>
      <Button variant="solid">Apply Now</Button>
      <VStack align={"left"}>
        <PortableText value={posting._rawDescription} components={components} />
      </VStack>
      <Button variant="solid">Apply Now</Button>
      <Grid
        pt={10}
        templateColumns='repeat(3, 1fr)'
        width="100%"
        gap={5}
        alignItems={"center"}
        textAlign={"center"}
      >
        <GridItem>
          <Text><TimeAgo date={posting._createdAt} formatter={formatter} /></Text>
        </GridItem>
        <GridItem>
          <Text whiteSpace={"pre-wrap"}>View more jobs at
            < br />{posting.company.name}</Text>
        </GridItem>
        <GridItem>
          <Wrap align="center">
            {posting.tags.map((tag) =>
              <Tag
                key={tag.id}
                fontFamily="GT-America-Mono"
              >
                {tag.tagName}
              </Tag>
            )}
          </Wrap>
        </GridItem>
      </Grid>
    </VStack>
  )
}

export default JobPostingTemplate

export const Head = ({ data }: any) => {
  const position = data.sanityJobPosting?.position
  const company = data.sanityJobPosting?.company.name
  const location = data.sanityJobPosting?.location
  const minSalary = "$" + data.sanityJobPosting?.minAnnualSalary / 1000 + "k"
  const maxSalary = "$" + data.sanityJobPosting?.maxAnnualSalary / 1000 + "k"
  const description = blocksToText(data.sanityJobPosting?._rawDescription).split(/\s+/).slice(0, 19).join(" ") + "..."
  const title = cap(position)
    + " at " + company + " (" + minSalary + "-" + maxSalary + ")" + " in " + location
  return (
    <SEO title={title} description={description} />
  )
}