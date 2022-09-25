import {
  Link,
  Flex,
  Wrap,
  WrapItem,
  VStack,
  Tag,
  Heading,
  HStack,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react'
import React from 'react'
import { SearchBox, RefinementList, useMenu, UseMenuProps } from 'react-instantsearch-hooks-web';

const TagMenu = (props: UseMenuProps) => {
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

  return (
    <VStack spacing={6}>
      <Wrap
        spacing={3}
        justify="center"
        display={["none", "block"]}
      >
        {items.map((item) => (
          <WrapItem key={item.value}>
            <Link
              _hover={{
                textDecoration: "none"
              }}
              href={createURL(item.value)}
              onClick={event => {
                event.preventDefault();
                refine(item.value);
              }}
            >
              <Tag
                fontFamily="GT-America-Mono"
                _hover={{
                  bg: "blackAlpha.600",
                  color: "white"
                }}
                variant={item.isRefined ? "solid" : "subtle"}
              >
                <TagLabel>{item.label}</TagLabel>
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
    <VStack spacing={6} pb={6}>
      <SearchBox placeholder='Search for cannabis-friendly careers' />
      <VStack>
        <TagMenu attribute="tags.tagName" limit={25} sortBy={['count:desc', 'name:asc']} />
      </VStack>
      <HStack>
        <VStack>
          <Heading variant="filter" as="h3">Filter by diverse ownership:</Heading>
          <RefinementList attribute="diverseOwnership.diverseOwnership"
            sortBy={['count:desc', 'name:asc']} />
        </VStack>
      </HStack>
    </VStack>
  )
}

export default SearchBoxComponent