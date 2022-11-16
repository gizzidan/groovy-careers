import {
  Link,
  Wrap,
  WrapItem,
  VStack,
  Tag,
  HStack,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react'
import React from 'react'
import { SearchBox, RefinementList, useMenu, UseMenuProps } from 'react-instantsearch-hooks-web';
import ClearSearch from './clear-search';

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
    <VStack spacing={[6]}>
      <ClearSearch />
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
              href='#'
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
    <VStack spacing={[3, 6]} pb={6}>
      <SearchBox placeholder="Search for your dream job" />
      <VStack>
        <TagMenu attribute="tags.tagName" limit={25} sortBy={['count:desc', 'name:asc']} />
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