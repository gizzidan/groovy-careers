import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Link,
  List,
  ListItem,
  Text
} from '@chakra-ui/react'
import React from 'react'
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Highlight, SearchBox, connectHits } from 'react-instantsearch-dom'


const Hits = connectHits(({ hits }) => (
  <Box>
    {hits.length ? (
      <>
        <Text>
          These are the results of your search. The title and excerpt are
          displayed, though your search may have been found in the content of
          the post as well.
        </Text>
        {hits.map(hit => {
          return (
            <Box>
              <Heading>
                <Highlight attribute="position" hit={hit} tagName="strong" />
              </Heading>
            </Box>
          )
        })}
      </>
    )
      : <Text>No results for your search.</Text>
    }
  </Box>
))

const Search = () => {
  const algolia = algoliasearch(
    "WCOAAGSNH7",
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  );

  return (
    <InstantSearch
      indexName="dev_cannabisfriendly"
      searchClient={algolia}
    >
      <SearchBox />
      <Hits />
    </InstantSearch>
  )
}

export default Search