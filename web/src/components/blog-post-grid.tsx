import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { TextToUpper as cap } from '../utils/convert-to-uppercase'
import { FiArrowRight } from "react-icons/fi";
import {
  Link,
  Avatar,
  Button,
  Box,
  Badge,
  Tag,
  VStack,
  Grid,
  GridItem,
  HStack,
  Wrap,
  Text,
  Heading,
  useMediaQuery,
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  WrapItem,
  textDecoration,
  CardFooter
} from '@chakra-ui/react'


type BlogPostType = {
  heading: string
  data: {
    allSanityBlogPost: {
      nodes: {
        id: string,
        publishedAt: any,
        title: string,
        summary: string,
        image: {
          asset: {
            url: string
          }
        }
        tags: {
          id: string,
          tagName: string,
          slug: {
            current: string
          }
        }[]
        slug: {
          current: string
        }
      }[]
    }
    allSanityBlogPostTag: {
      nodes: {
        id: string
        tagName: string
        slug: {
          current: string
        }
      }[]
    }
  }
}
const BlogPostGrid = ({ data, heading }: BlogPostType) => {
  const posts = data.allSanityBlogPost.nodes
  const tags = data.allSanityBlogPostTag.nodes
  return (
    <Box
      bg="white"
      width="100%"
      mx={"auto"}
      p={[5, 10]}
    >
      <VStack maxW="1100px" mx="auto" spacing={6}>
        <Heading textAlign="center" as="h1">{cap(heading)} Posts</Heading>
        <Wrap
          spacing={3}
          justify="center"
          display={["block", "block"]}
          p={3}
        >
          <WrapItem>
            <Link
              as={GatsbyLink}
              _hover={{
                textDecoration: "none"
              }}
              to='/blog'
            >
              <Tag
                colorScheme='blackAlpha'
                fontFamily="GT-America-Mono"
                _hover={{
                  bg: "blackAlpha.600",
                  color: "white"
                }}
              >
                all
              </Tag>
            </Link>
          </WrapItem>
          {tags.map((tag) => (
            <Link
              as={GatsbyLink}
              _hover={{
                textDecoration: "none"
              }}
              to={`/tags/${tag.slug.current}`}
              key={tag.id}
            >
              <WrapItem>

                <Tag
                  colorScheme='blackAlpha'
                  fontFamily="GT-America-Mono"
                  _hover={{
                    bg: "blackAlpha.600",
                    color: "white"
                  }}
                >
                  {tag.tagName}
                </Tag>
              </WrapItem>
            </Link>

          ))}
        </Wrap>
      </VStack>

      <>
        <SimpleGrid
          py={6}
          minChildWidth='320px'
          spacingX='30px'
          spacingY='30px'
        >
          {posts.map((post) => {
            const thumbnail = getImage(post.image.asset)
            return (
              <Card variant="outline" key={post.id}>
                <CardBody>
                  <Link
                    as={GatsbyLink}
                    _hover={{
                      textDecoration: "none"
                    }}
                    to={`/blog/${post.slug.current}`}>
                    <GatsbyImage image={thumbnail!} alt={`${post.title} image`} />
                  </Link>
                  <Stack mt='6' spacing='3'>
                    <Link as={GatsbyLink} to={`/blog/${post.slug.current}`}>
                      <Heading fontSize="xl" as="h2">{post.title}</Heading>
                    </Link>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <Wrap>
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
                </CardFooter>
              </Card>
            )
          })}
        </SimpleGrid>
      </>
    </Box >
  )
}

export default BlogPostGrid