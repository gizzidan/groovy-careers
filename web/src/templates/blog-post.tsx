import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import SEO from '../components/seo'
import { TextToUpper as cap } from '../utils/convert-to-uppercase'
import { WrapItem } from '@chakra-ui/react'
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'
import {
  Link,
  Wrap,
  VStack,
  ListItem,
  Tag,
  Box,
  Text,
  Heading,
  UnorderedList,
  OrderedList
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


interface Props {
  pageContext: {
    id: string
  },
  data: {
    allSanityImageAsset: {
      nodes: {
        _id: string
        url: string
        gatbsyImageData: any
      }[]
    }
    sanityBlogPost: {
      _createdAt: any
      publishedAt: any
      image: {
        asset: {
          url: string
          gatsbyImageData: any
        }
      }
      title: string
      summary: string
      body: BlockDefault
      _rawBody: any
      id: string
      tags: {
        id: string
        tagName: string
        slug: {
          current: string
        }
      }[]
    }
  }
}


export const query = graphql`
  query BlogPostTemplateQuery($id: String) {
    allSanityImageAsset {
      nodes {
        _id
        url
        gatsbyImageData(
          placeholder: BLURRED
        )
      }
    }
    sanityBlogPost(id: {eq: $id}) {
      _createdAt
      publishedAt
      image {
          asset {
            gatsbyImageData(
              aspectRatio: 1.618
            )
            url
          }
        }
      title
      summary
      body {
        _key
        _type
        children {
          text
          marks
        }
        style
      }
      _rawBody(resolveReferences: {maxDepth: 10})
      id
      tags {
        id
        tagName
        slug {
          current
        }
      }
    }
  }
`

const BlogPostTemplate = ({ pageContext, data }: Props) => {
  const allImages = data.allSanityImageAsset.nodes
  const components: Partial<PortableTextReactComponents> = {
    types: {
      image: ({ value }) => {
        console.log(value)
        const imageAsset = allImages.find(x => x._id == value.asset.id)
        const inlineImage = getImage(imageAsset!)
        const imageAlt = value.asset.description ? value.asset.description : post.title + ' inline image'
        console.log(imageAsset)
        return (
          <Box py={6}>
            <GatsbyImage
              image={inlineImage!}
              alt={imageAlt}
            >
            </GatsbyImage>
          </Box>
        )
      },
    },
    block: {
      normal: ({ children }) => <Text pb={3} justifyItems="left" fontSize={"lg"} > {children}</Text>,
      h1: ({ children }) => <Heading py={3} as="h1" size={"lg"}>{children}</Heading>,
      h2: ({ children }) => <Heading py={3} as="h2" size={"md"}>{children}</Heading>,
      h3: ({ children }) => <Heading textTransform={"uppercase"} py={3} as="h3" size={"sm"}>{children}</Heading>
    },
    list: {
      bullet: ({ children }) => <UnorderedList pb={3} pl={"7%"} fontSize={"lg"}>{children}</UnorderedList>,
      number: ({ children }) => <OrderedList pb={3} pl={"7%"} fontSize={"lg"}>{children}</OrderedList>
    },
    listItem: {
      bullet: ({ children }) => <ListItem>{children}</ListItem>,
      number: ({ children }) => <ListItem>{children}</ListItem>
    }
  };
  const { id } = pageContext
  const post = data.sanityBlogPost
  const featureImage = getImage(post.image.asset)

  return (
    <VStack
      p={[7, "50px"]}
      px={4}
      maxW={["1200px"]}
      m="auto"
      spacing={5}
      bg="white"
    >
      {post.image && post.image.asset ?
        <GatsbyImage
          image={featureImage!} alt={`${post.title} feature image`}
        >
        </GatsbyImage>
        : null
      }
      <VStack spacing={7} maxW={'700px'}>
        <>
          <Wrap
            spacing={3}
            justify="center"
            p={1}
          >
            {post.tags.map((tag: any) =>
              <Link as={GatsbyLink} to={`/tags/${tag.slug.current}`} key={tag.id} >
                <WrapItem>
                  <Tag
                    colorScheme={"purple"}
                    fontFamily="GT-America-Mono"
                    textDecoration={"none"}
                    _hover={{
                      bg: "purple.700",
                      color: "white",
                      textDecoration: "none"
                    }}
                  >
                    {tag.tagName}
                  </Tag>
                </WrapItem>
              </Link>
            )}
          </Wrap>
        </>
        <Heading textAlign={"center"}>{post.title}</Heading>
        <Text fontStyle="italic" fontSize={"xl"} textAlign={"center"}>{post.summary}</Text>
        <Box>
          <PortableText value={post._rawBody} components={components} />
        </Box>
      </VStack>
    </VStack >
  )
}

export default BlogPostTemplate

export const Head = ({ data }: any) => {
  const featureImageSrc = getSrc(data.sanityBlogPost.image.asset)

  return (
    <SEO
      title={data.sanityBlogPost.title}
      description={data.sanityBlogPost.summary}
      image={`${data.sanityBlogPost.image.asset.url}?w=1200`}
    />
  )
}