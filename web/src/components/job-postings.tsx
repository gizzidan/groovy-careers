import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import TimeAgo from 'react-timeago'
import {
  Link,
  Flex,
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
  chakra,
  Text,
  Heading
} from '@chakra-ui/react'

interface Props {
  _createdAt: any
  applicationLink: URL
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
              "yellow.50" : "whiteAlpha.100"
            const border = node.highlight === true ?
              "5px solid" : ""
            const borderColor = node.highlight === true ?
              "yellow.500" : ""
            const buttonVariant = node.highlight == true ? "black" : "outline"
            const time = node.stickyLength > 0
              ? <Badge colorScheme="green">Featured</Badge>
              : <TimeAgo date={node._createdAt} />


            return (
              < Grid
                p={3}
                my={3}
                templateColumns='repeat(5, 1fr)'
                width="100%"
                alignItems="center"
                bg={bgColor}
                borderColor={borderColor}
                key={node.id}
              >
                <GridItem colSpan={2}>
                  <HStack spacing={5}>
                    {node.company.logo
                      ? <Avatar name={node.company.name} src={node.company.logo.asset.url}></Avatar>
                      : <Avatar name={node.company.name}></Avatar>
                    }
                    <VStack spacing={1} align="left">
                      <Heading variant="card" as="h3">{node.position}</Heading>
                      <Text fontSize="md">{node.company.name}
                        {node.company.diverseOwnership
                          ? node.company.diverseOwnership.sort().map((ownership) => {
                            const color = ownership == "Minority-Owned" ? "gray" : ownership == "Women-Owned" ? "pink" : ownership == "Veteran-Owned" ? "cyan" : "whiteAlpha"
                            return (
                              <Badge key={ownership.toString()} mb={1} ml={2} variant="solid" fontSize="0.7rem" colorScheme={color}>{ownership.slice(0, -6)}</Badge>
                            )
                          }
                          )
                          : null
                        }
                      </Text>
                      <Text variant="mono" fontSize="xs">{minSalary} - {maxSalary}</Text>
                    </VStack>
                  </HStack>
                </GridItem>
                <GridItem colSpan={1} alignSelf="start">
                  <Text variant="mono" fontSize="sm">{node.location}</Text>
                </GridItem>
                <GridItem colSpan={1} alignSelf="start">
                  <Wrap align="center">
                    {node.tags.map((tag) =>
                      <Tag
                        key={tag.id}
                        fontFamily="GT-America-Mono"
                      >
                        {tag.tagName}
                      </Tag>
                    )}
                  </Wrap>
                </GridItem>
                <GridItem colSpan={1}>
                  <HStack verticalAlign="center" float="right">
                    {time}
                    <Button variant={buttonVariant}>Apply</Button>
                  </HStack>
                </GridItem>
              </Grid >
            )
          })
        }
      </>
    </Box>
  )
}

export default JobPostings