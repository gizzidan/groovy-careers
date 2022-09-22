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
} from '@chakra-ui/react'
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  connectHits,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-dom';
import { FiExternalLink } from "react-icons/fi"
import React from 'react'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import algoliasearch from "algoliasearch/lite";
import TimeAgo from 'react-timeago'
import DiversityTags from './diversity-tags';

const Hit = (props: any) => {
  const node = props.hit
  const minSalary = "$" + node.minAnnualSalary / 1000 + "k"
  const maxSalary = "$" + node.maxAnnualSalary / 1000 + "k"
  const bgColor = node.highlight === true ?
    "mantis.50" : "whiteAlpha.200"
  const bgHover = node.highlight === true ?
    "mantis.100" : "blackAlpha.100"
  const border = node.highlight === true ?
    "5px solid" : "5px solid"
  const borderColor = node.highlight === true ?
    "mantis.500" : "transparent"
  const buttonVariant = node.highlight == true ? "black" : "outline"
  const test = Boolean(node.stickyLength)
    ? <Badge colorScheme="mantis">Featured</Badge>
    : <Text><TimeAgo date={node.createdAt} /></Text>
  return (
    < Grid
      p={3}
      my={3}
      templateColumns='repeat(5, 1fr)'
      width="100%"
      alignItems="center"
      bg={bgColor}
      _hover={{
        bg: bgHover
      }}
      borderLeft={border}
      borderColor={borderColor}
      key={node.id}

    >
      <GridItem zIndex="docked" height="100%" gridRow={1} colStart={1} colSpan={5}>
        <Link as={GatsbyLink} to={`/${node.path}`}><Box height="100%" ></Box></Link>
      </GridItem>
      <GridItem colStart={1} gridRow={1} colSpan={2}>
        <HStack spacing={5}>
          {node.includeLogo === true ?
            node.logo
              ? <Avatar name={node.companyName} src={node.logo.logo.asset.url}></Avatar>
              : <Avatar color="black" bg="gray.200" name={node.companyName}></Avatar>
            : <Avatar color="black" bg="blackAlpha.300" name={node.companyName}></Avatar>
          }
          <VStack spacing={1} align="left">
            <Heading variant="card" as="h3">
              <Highlight attribute="position" hit={props.hit} />
            </Heading>
            {node.diverseOwnership
              ? <DiversityTags label={node.companyName} node={node}
                diverseOwnership={node.diverseOwnership.diverseOwnership} />
              : null}
            <Text variant="mono" fontSize="xs">{minSalary} - {maxSalary}</Text>
          </VStack>
        </HStack>
      </GridItem>
      <GridItem colStart={3} gridRow={1} colSpan={1} alignSelf="start">
        <Text fontSize="sm">
          <Highlight attribute="location" hit={props.hit} />
        </Text>
      </GridItem>
      <GridItem colStart={4} gridRow={1} colSpan={1} alignSelf="start">
        <Wrap align="center">
          {node.tags
            ? node.tags.map((tag: any) =>
              <Link
                zIndex="sticky"
                _hover={{
                  textDecoration: "none",
                }}
                as={GatsbyLink}
                to={`/${tag.slug.current}-jobs`}
                key={tag.id}
              >
                <Tag
                  fontFamily="GT-America-Mono"
                  _hover={{
                    bg: "blackAlpha.800",
                    color: "white"
                  }}
                >
                  {tag.tagName}
                </Tag>
              </Link>
            )
            : null
          }
        </Wrap>
      </GridItem>
      <GridItem colStart={5} gridRow={1} colSpan={1}>
        <HStack verticalAlign="center" float="right">
          <Link
            _hover={{
              textDecoration: "none"
            }}
            zIndex="sticky"
            href={node.applicationLink}
            isExternal
          >
            <Button rightIcon={<FiExternalLink />} variant={buttonVariant}>Apply</Button>
          </Link>
        </HStack>
      </GridItem>
    </Grid>
  )
}

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
      <Box width='100%' my={8}>
        <Hits hitComponent={Hit} />
      </Box>
    </InstantSearch>
  )
}

export default Search

