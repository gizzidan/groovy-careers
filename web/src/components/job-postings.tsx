import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import TimeAgo from 'react-timeago'
import { FiExternalLink } from "react-icons/fi"
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
import DiversityTags from './diversity-tags'

interface Props {
  _createdAt: any
  applicationLink: string
  position: string
  highlight: boolean
  id: string
  email: string
  includeLogo: boolean
  minAnnualSalary: number
  maxAnnualSalary: number
  location: string
  paymentStatus: boolean
  stickyLength: number
  slug: {
    current: URL
  }
  primarySkill: {
    skillName: string
  }
  tags: {
    id: string
    tagName: string
    slug: {
      current: string
    }
  }[]
  company: {
    name: string
    diverseOwnership: string[]
    logo: {
      asset: {
        url: string
      }
    }
  }
}



const JobPostings = ({ data }: { data: { allSanityJobPosting: { nodes: any } } }) => {


  const jobPosting = data.allSanityJobPosting.nodes

  return (
    <Box width='100%' my={8}>
      <>
        {jobPosting.sort((a: any, b: any) => {

          return (
            (
              (a.stickyLength > 0 && b.stickyLength > 0)
              || (a.stickyLength === 0 && b.stickyLength === 0)
            )
              ? a._createdAt > b._createdAt ? -1 : 1
              : a.stickyLength > 0 ? -1 : 1
          )
        })
          .map((node: Props) => {

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
            const time = node.stickyLength > 0
              ? <Badge colorScheme="mantis">Featured</Badge>
              : <Text><TimeAgo date={node._createdAt} /></Text>


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
                  <Link as={GatsbyLink} to={`/${node.slug.current}`}><Box height="100%" ></Box></Link>
                </GridItem>
                <GridItem colStart={1} gridRow={1} colSpan={2}>
                  <HStack spacing={5}>
                    {node.includeLogo ?
                      node.company.logo
                        ? <Avatar name={node.company.name} src={node.company.logo.asset.url}></Avatar>
                        : <Avatar color="black" bg="gray.200" name={node.company.name}></Avatar>
                      : <Avatar color="black" bg="blackAlpha.300" name={node.company.name}></Avatar>
                    }
                    <VStack spacing={1} align="left">
                      <Heading variant="card" as="h3">{node.position}
                      </Heading>
                      <DiversityTags label={node.company.name} node={node} diverseOwnership={node.company.diverseOwnership} />
                      <Text variant="mono" fontSize="xs">{minSalary} - {maxSalary}</Text>
                    </VStack>
                  </HStack>
                </GridItem>
                <GridItem colStart={3} gridRow={1} colSpan={1} alignSelf="start">
                  <Text fontSize="sm">{node.location}</Text>
                </GridItem>
                <GridItem colStart={4} gridRow={1} colSpan={1} alignSelf="start">
                  <Wrap align="center">
                    {node.tags.map((tag) =>
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
                    )}
                  </Wrap>
                </GridItem>
                <GridItem colStart={5} gridRow={1} colSpan={1}>
                  <HStack verticalAlign="center" float="right">
                    {time}
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
              </Grid >
            )
          })
        }
      </>
    </Box >
  )
}

export default JobPostings