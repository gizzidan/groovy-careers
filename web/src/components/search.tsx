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
import ColorContrastChecker from 'color-contrast-checker'
import { colord } from "colord"
const indexName = "dev_cannabisfriendly"
const routing = getRouting(indexName)

export const formatter = buildFormatter(enShort)


const Hit = (props: any) => {
  const [isLargerThan400] = useMediaQuery('(min-width: 400px)')
  const node = props.hit

  // Color Checker
  var ccc = new ColorContrastChecker()
  const color1 = "#000000"
  const customColor = node.customHighlightColor ? colord(node.customHighlightColor).toHex() : "#4B2840"
  const bgColor = node.highlight === true && node.customHighlight === true
    ?
    customColor
    : node.highlight === true
      ? "yellow.100"
      : "whiteAlpha.400"

  const bgHover = node.highlight === true && node.customHighlight === true
    ?
    colord(customColor).darken(0.05).toHex()
    : node.highlight === true
      ? "yellow.200"
      : "white"

  const contrast = bgColor == customColor
    ? ccc.isLevelAAA(color1, bgColor, 12)
      ? "good"
      : "bad"
    : "good"

  const textColor = contrast == "good" ? "black" : "white"

  const borderColor = node.highlight === true && node.customHighlight === true
    ? contrast == "good"
      ? colord(customColor).darken(0.23).saturate(0.4).toHex()
      : colord(customColor).lighten(0.23).saturate(0.4).toHex()
    : node.highlight === true
      ? "yellow.400"
      : "transparent"

  const buttonBgColor = node.highlight === true && node.customHighlight === true
    ? contrast == "good"
      ? colord(customColor).darken(0.5).saturate(0.25).toHex()
      : colord(customColor).lighten(0.6).saturate(0.25).toHex()
    : node.highlight === true
      ? "black"
      : undefined

  const buttonBgHover = node.highlight === true && node.customHighlight === true
    ? contrast == "good"
      ? colord(customColor).darken(0.4).saturate(0.25).toHex()
      : colord(customColor).lighten(0.5).saturate(0.25).toHex()
    : node.highlight === true
      ? colord('#000000').lighten(0.2).toHex()
      : "purple.100"

  const buttonTextColor = node.highlight === true && node.customHighlight === true
    ? textColor == "white" ? "black" : "white"
    : node.highlight === true
      ? "white"
      : undefined

  const minSalary = "$" + node.minAnnualSalary / 1000 + "k"
  const maxSalary = "$" + node.maxAnnualSalary / 1000 + "k"

  const border = node.highlight === true ?
    "5px solid" : "5px solid"

  const buttonVariant = node.highlight == true ? "black" : contrast == "bad" ? "black" : "outline"
  const time = Boolean(node.stickyLength)
    ? <Badge fontSize={[".6em", "xs"]} bgColor={contrast == "good" ? "blackAlpha.800" : "whiteAlpha.800"} color={contrast == "good" ? "white" : "black"}>Featured</Badge>
    : <Text color={textColor} fontSize={["sm", "md"]}><TimeAgo formatter={formatter} date={node.publishedAt_str} /></Text>


  return (
    < Grid
      p={[2, 3]}
      my={3}
      gap={[2, 2]}
      templateColumns={['6fr 2fr 1fr', 'repeat(5, 1fr)']}
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
            <Heading color={textColor} size={['xs', 'sm']} variant="card" as="h3">
              <Highlight attribute="position" hit={props.hit} />
            </Heading>
            {node.diverseOwnership
              ? <Box color={textColor}>
                <DiversityTags label={node.companyName} node={node}
                  diverseOwnership={node.diverseOwnership.diverseOwnership} />
              </Box>
              : null}
            {node.minAnnualSalary > 0 ?
              <Text color={textColor} variant="mono" fontSize="xs">{minSalary} - {maxSalary}</Text>
              : null}
          </VStack>
        </HStack>
      </GridItem>
      <GridItem colStart={[2, 3]} gridRow={1} colSpan={[1]} alignSelf={["middle", "start"]}>
        <Text color={contrast == "good" ? "blackAlpha.900" : "whiteAlpha.900"} fontSize="sm">
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
              colorScheme={contrast == "good" ? "blackAlpha" : "whiteAlpha"}
              fontFamily="GT-America-Mono"
              _hover={{
                bg: contrast == "good" ? "blackAlpha.700" : "whiteAlpha.700",
                color: contrast == "good" ? "white" : "black"
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
                  colorScheme={contrast == "good" ? "blackAlpha" : "whiteAlpha"}
                  fontFamily="GT-America-Mono"
                  _hover={{
                    bg: contrast == "good" ? "blackAlpha.700" : "whiteAlpha.700",
                    color: contrast == "good" ? "white" : "black"
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
        <HStack verticalAlign="center" float={['right', 'right']}>
          <VStack align={['right', 'right']}>
            <HStack>
              {time}
              <Link
                _hover={{
                  textDecoration: "none",
                }}
                zIndex="sticky"
                display={["none", "flex"]}
                href={node.applicationLink}
                isExternal
              >
                <Button
                  rightIcon={<FiExternalLink />}
                  variant={buttonVariant}
                  bgColor={buttonBgColor}
                  color={buttonTextColor}
                  _hover={{
                    bgColor: buttonBgHover,
                  }}
                >
                  Apply
                </Button>
              </Link>
            </HStack>
            {node.source ? <Text display={["none", "block"]} fontStyle="italic" fontSize={["sm", "md"]} align={['left', 'right']} pr="2px" color={textColor} >Via {node.source}</Text> : null}
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
        my={8} mx={"auto"}>
        <SearchBoxComponent />
        <Hits hitComponent={Hit} />
        <PaginationNav />
      </Box>
    </InstantSearch>
  )
}

export default Search

