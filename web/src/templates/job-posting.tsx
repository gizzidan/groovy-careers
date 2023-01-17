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
  Box,
  Text,
  Heading,
  Avatar,
  UnorderedList,
  Grid,
  GridItem,
  OrderedList
} from '@chakra-ui/react'
import DiversityTags from '../components/diversity-tags'
import { FiExternalLink } from 'react-icons/fi'

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
    bullet: ({ children }) => <UnorderedList pl={"7%"} fontSize={"lg"}>{children}</UnorderedList>,
    number: ({ children }) => <OrderedList pl={"7%"} fontSize={"lg"}>{children}</OrderedList>
  },
  listItem: {
    bullet: ({ children }) => <ListItem>{children}</ListItem>,
    number: ({ children }) => <ListItem>{children}</ListItem>
  }
};

interface Props {
  pageContext: {
    id: string
  },
  data: {
    sanityJobPosting: {
      _createdAt: any
      applicationLink: string
      position: string
      description: BlockDefault
      _rawDescription: any
      id: string
      includeLogo: boolean
      minAnnualSalary: number
      maxAnnualSalary: number
      location: string
      source: string
      category: {
        categoryName: string
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
      source
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
      category {
        categoryName
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
      p={[7, "50px"]}
      px={[4, "200px"]}
      maxWidth={["100%", "1165px"]}
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
      {posting.company.diverseOwnership.length > 0 ? <DiversityTags label={null} diverseOwnership={posting.company.diverseOwnership} /> : null}
      <Heading
        as="h1"
        size="lg"
        fontFamily="GT-America-Extended"
        textAlign="center"
        fontWeight="500"
        whiteSpace="pre-wrap"
      >{posting.company.name} is hiring {a(posting.position, { articleOnly: true })}
        <br /><strong>{posting.position}</strong>
      </Heading>
      {posting.minAnnualSalary > 0
        ? <Text variant="mono">
          Compensation: {minSalary} - {maxSalary}
        </Text>
        : null}
      <Text variant="mono">
        {posting.location}
      </Text>
      <Box>
        <Link
          _hover={{
            textDecoration: "none",
          }}
          href={posting.applicationLink}
          isExternal
        >
          <Button rightIcon={<FiExternalLink />} variant="solid">Apply Now</Button>
        </Link>
        {posting.source ? <Text pt={2} fontSize={["sm", "md"]} align="center" fontStyle="italic" color="black" >Via {posting.source}</Text> : null
        }
      </Box>
      <VStack pt="12px" align={"left"}>
        <PortableText value={posting._rawDescription} components={components} />
      </VStack>
      <Box>
        <Link
          _hover={{
            textDecoration: "none",
          }}
          href={posting.applicationLink}
          isExternal
        >
          <Button rightIcon={<FiExternalLink />} variant="solid">Apply Now</Button>
        </Link>
        {posting.source ? <Text pt={2} fontSize={["sm", "md"]} align="center" fontStyle="italic" color="black" >Via {posting.source}</Text> : null
        }
      </Box>
      <Grid
        pt={10}
        px={"12px"}
        templateColumns='repeat(3, 1fr)'
        width="100%"
        gap={5}
        alignItems={"center"}
        textAlign={"center"}
      >
        <GridItem>
          <Text align="left" ><TimeAgo date={posting._createdAt} formatter={formatter} /></Text>
        </GridItem>
        <GridItem>
          <Text whiteSpace={"pre-wrap"}>View more jobs at
            < br /><Link
              textDecoration="underline"
              href={`/?query=${posting.company.name}`}
            >{posting.company.name}</Link></Text>
        </GridItem>
        <GridItem>
          <Wrap justify="right">
            {posting.tags.map((tag) =>
              <Link
                _hover={{
                  textDecoration: "none",
                }}
                href={`/?tag=${tag.tagName}`}
                key={tag.slug.current}
              >
                <Tag
                  fontFamily="GT-America-Mono"
                  _hover={{
                    bg: "blackAlpha.600",
                    color: "white"
                  }}
                >
                  {tag.tagName}
                </Tag>
              </Link>
            )}
          </Wrap>
        </GridItem>
      </Grid>
    </VStack >
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