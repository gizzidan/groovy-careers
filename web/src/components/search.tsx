import React from 'react'
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
  useMediaQuery
} from '@chakra-ui/react'
import {
  InstantSearch,
  Hits,
  Highlight,
  Configure,
} from 'react-instantsearch-hooks-web';
import { FiExternalLink } from "react-icons/fi"
import algoliasearch from "algoliasearch/lite";
import TimeAgo from 'react-timeago'
import enShort from 'react-timeago/lib/language-strings/en-short'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import DiversityTags from './diversity-tags';
import PaginationNav from './pagination-nav';
import SearchBoxComponent from './search-box';
import getRouting from './routing';

const indexName = "dev_cannabisfriendly"
const routing = getRouting(indexName)

export const formatter = buildFormatter(enShort)

const Hit = (props: any) => {
  const [isLargerThan400] = useMediaQuery('(min-width: 400px)')
  const node = props.hit
  const minSalary = "$" + node.minAnnualSalary / 1000 + "k"
  const maxSalary = "$" + node.maxAnnualSalary / 1000 + "k"
  const bgColor = node.highlight === true ?
    "orange.100" : ["whiteAlpha.50", "whiteAlpha.200"]
  const bgHover = node.highlight === true ?
    "yellow.200" : "blackAlpha.50"
  const border = node.highlight === true ?
    "5px solid" : "5px solid"
  const borderColor = node.highlight === true ?
    "yellow.400" : "transparent"
  const buttonVariant = node.highlight == true ? "black" : "outline"
  const time = Boolean(node.stickyLength)
    ? <Badge fontSize={[".6em", "xs"]} colorScheme="mantis">Featured</Badge>
    : <Text><TimeAgo formatter={formatter} date={node.publishedAt_str} /></Text>

  console.log(node.publishedAt)
  return (
    < Grid
      p={[2, 3]}
      my={3}
      gap={[2, 0]}
      templateColumns={['2fr 1fr 1fr', 'repeat(5, 1fr)']}
      width="100%"
      alignItems="center"
      bg={bgColor}
      _hover={{
        bg: bgHover
      }}
      borderLeft={border}
      borderColor={borderColor}
      key={node.objectID}

    >
      <GridItem zIndex="docked" height="100%" gridRow={1} colStart={[1, 1]} colSpan={[3, 5]}>
        <Link target="_blank" rel="noreferrer noopener" href={`/${node.path}/`}><Box height="100%" ></Box></Link>
      </GridItem>
      <GridItem colStart={[1, 1]} gridRow={[1, 1]} colSpan={[1, 2]}>
        <HStack spacing={[3, 5]}>
          {isLargerThan400 ?
            node.includeLogo === true ?
              node.logo
                ? <Avatar name={node.companyName} src={node.logo.logo.asset.url}></Avatar>
                : <Avatar color="black" bg="blackAlpha.300" name={node.companyName}></Avatar>
              : <Avatar color="black" bg="blackAlpha.300" name={node.companyName}></Avatar>
            : null
          }
          <VStack spacing={1} align="left">
            <Heading size={['xs', 'sm']} variant="card" as="h3">
              <Highlight attribute="position" hit={props.hit} />
            </Heading>
            {node.diverseOwnership
              ? <DiversityTags label={node.companyName} node={node}
                diverseOwnership={node.diverseOwnership.diverseOwnership} />
              : null}
            {node.minAnnualSalary > 0 ?
              <Text variant="mono" fontSize="xs">{minSalary} - {maxSalary}</Text>
              : null}
          </VStack>
        </HStack>
      </GridItem>
      <GridItem colStart={[2, 3]} gridRow={1} colSpan={[1]} alignSelf={["start", "start"]}>
        <Text color="blackAlpha.800" fontSize="sm">
          <Highlight attribute="location" hit={props.hit} />
        </Text>
      </GridItem>
      <GridItem display={["none", "flex"]} colStart={4} gridRow={1} colSpan={1} alignSelf="start">
        <Wrap align="center">
          <Link
            zIndex="sticky"
            _hover={{
              textDecoration: "none",
            }}
            href={`/?category=${node.category}`}
          >
            <Tag
              fontFamily="GT-America-Mono"
              _hover={{
                bg: "blackAlpha.600",
                color: "white"
              }}
            >
              {node.category.toUpperCase()}
            </Tag>
          </Link>
          {node.tags
            ? node.tags.map((tag: any) =>
              <Link
                zIndex="sticky"
                _hover={{
                  textDecoration: "none",
                }}
                href={`/?tag=${tag.tagName}`}
                key={tag.slug.current}
              >
                <Tag
                  fontFamily="GT-America-Mono"
                  _hover={{
                    bg: "blackAlpha.600",
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
      <GridItem colStart={[3, 5]} gridRow={1} colSpan={1}>
        <HStack verticalAlign="center" float={['left', 'right']}>
          <VStack align={['left', 'right']}>
            <HStack>
              {time}
              <Link
                _hover={{
                  textDecoration: "none",
                }}
                zIndex="sticky"
                href={node.applicationLink}
                isExternal
              >
                <Button display={["none", "flex"]} rightIcon={<FiExternalLink />} variant={buttonVariant}>Apply</Button>
              </Link>
            </HStack>
            {node.source ? <Text align={['left', 'right']} pr="2px" color="blackAlpha.700" fontSize="sm" >Via {node.source}</Text> : null}
          </VStack>
        </HStack>
      </GridItem>
    </Grid >
  )
}

const Search = () => {
  const d = new Date()
  const timeBetween = Math.floor(d.setDate(d.getDate() - 60))
  console.log(timeBetween)

  const algolia = algoliasearch(
    "WCOAAGSNH7",
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  );

  return (
    <InstantSearch
      indexName={indexName}
      searchClient={algolia}
      routing={routing}

    >
      <Configure
        filters={`publishedAt > ${timeBetween}`} />
      <Box maxWidth="1100px"
        my={8} mx={"auto"} >
        <SearchBoxComponent />
        <Hits hitComponent={Hit} />
        <PaginationNav />
      </Box>
    </InstantSearch>
  )
}

export default Search

