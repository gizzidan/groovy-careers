import {
  Link,
  Flex,
  VStack,
  Heading,
} from '@chakra-ui/react'
import React from 'react'
import { SearchBox, RefinementList, RangeInput } from 'react-instantsearch-hooks-web';

const SearchBoxComponent = () => {

  return (
    <VStack spacing={6} pb={6}>
      <SearchBox placeholder='Search for cannabis-friendly careers' />
      <VStack>
        <Heading variant="filter" as="h3">Filter by diverse ownership:</Heading>
        <RefinementList attribute="diverseOwnership.diverseOwnership"
          sortBy={['count:desc', 'name:asc']} />
      </VStack>
    </VStack>
  )
}

export default SearchBoxComponent