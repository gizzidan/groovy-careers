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
import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import Search from './search'

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
    allSanityCategory(sort: {order: ASC, fields: categoryName}) {
      nodes {
        id
        categoryName
        }
      }
    }
  `)

  const jobTag = data.allSanityJobTag.nodes
  const category = data.allSanityCategory.nodes


  return (
    <VStack spacing={6}>
      <Input
        borderColor="mantis.800"
        bg="whiteAlpha.100"
        _hover={{
          borderColor: 'mantis.600',
        }}
        borderWidth={1}
        width="300px"
        focusBorderColor='mantis.400'
        fontFamily="GT-America-Mono"
        placeholder='🔎 Tag or Location'
      />
      <Wrap
        spacing={3}
        justify="center"
        display={["none", "block"]}
      >
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
                  bg: "blackAlpha.800",
                  color: "white"
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