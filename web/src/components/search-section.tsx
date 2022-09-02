import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
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

const SearchSection = () => {
  const data = useStaticQuery(graphql`
    query JobTagQuery {
      allSanityJobTag(sort: {order: ASC, fields: tagName}, limit: 33) {
        nodes {
          tagName
          id
          slug {
            current
          }
        }
      }
    }
  `)

  const jobTag = data.allSanityJobTag.nodes

  return (
    <VStack spacing={6}>
      <Input
        borderColor="red.800"
        bg="whiteAlpha.100"
        _hover={{
          borderColor: 'red.600',
        }}
        borderWidth={1}
        width="300px"
        focusBorderColor='red.400'
        fontFamily="GT-America-Mono"
        placeholder='🔎 Tag or Location'
      />
      <Wrap spacing={3} justify="center">
        {jobTag.map((node: { id: string; tagName: string; slug: any }) => (
          <WrapItem key={node.id}>
            <Link
              _hover={{
                textDecoration: "none"
              }}
              as={GatsbyLink}
              to={`/${node.slug.current}-jobs`}
            >
              <Tag
                fontFamily="GT-America-Mono"
                _hover={{
                  bg: "green.100",
                }}
              >
                {node.tagName}
              </Tag>
            </Link>
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
  )
}

export default SearchSection