import {
  Link,
  Wrap,
  WrapItem,
  VStack,
  Tag,
  HStack,
  TagLabel,
  TagCloseButton,
  Box,
} from '@chakra-ui/react'
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react'
import { SearchBox, RefinementList, useMenu, UseMenuProps } from 'react-instantsearch-hooks-web';
import ClearSearch from './clear-search';

const TagMenu = (props: UseMenuProps) => {
  const data = useStaticQuery(graphql`
    query SearchBoxQuery {
      allSanityCategory(sort:
      {fields: [categoryName],
      order: [ASC]})
      {
        nodes {
          id
          categoryName
        }
      }
    }
  `)
  const {
    items,
    createURL,
    refine,
    canRefine,
    isShowingMore,
    toggleShowMore,
    canToggleShowMore,
    sendEvent,
  } = useMenu(props)

  const categories = ['']
  data.allSanityCategory.nodes.map((node: any) =>
    categories.push(node.categoryName)
  )

  return (
    <VStack spacing={[6]}>
      <Wrap
        spacing={3}
        justify="center"
        display={["block", "block"]}
        p={3}
      >
        {items.map((item) => (
          <WrapItem key={item.value}>
            <Link
              _hover={{
                textDecoration: "none"
              }}
              href='#'
              onClick={event => {
                event.preventDefault();
                refine(item.value);
              }}
            >
              <Tag
                colorScheme='blackAlpha'
                fontFamily="GT-America-Mono"
                _hover={{
                  bg: "blackAlpha.600",
                  color: "white"
                }}
                variant={item.isRefined ? "solid" : "subtle"}
              >
                <TagLabel>{categories.indexOf(item.label) > -1 ? item.label.toUpperCase() : item.label}</TagLabel>
                {item.isRefined ?
                  <TagCloseButton />
                  : null}
              </Tag>
            </Link>
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
  )
}

const SearchBoxComponent = () => {

  return (
    <VStack spacing={[3, 6]} pb={6}>
      <SearchBox placeholder="Find your dream job" />\
      <ClearSearch />

      <VStack>
        <TagMenu attribute="category" limit={25} sortBy={['count:desc', 'name:asc']} />
        <Box display={['none', 'block']} >
          <TagMenu attribute="tags.tagName" limit={25} sortBy={['count:desc', 'name:asc']} />
        </Box>
        <Box display={['block', 'none']} >
          <TagMenu attribute="tags.tagName" limit={12} sortBy={['count:desc', 'name:asc']} />
        </Box>
      </VStack>
      <HStack>
        <VStack>
          <RefinementList attribute="diverseOwnership.diverseOwnership"
            sortBy={['count:desc', 'name:asc']} />
        </VStack>
      </HStack>
    </VStack >
  )
}

export default SearchBoxComponent