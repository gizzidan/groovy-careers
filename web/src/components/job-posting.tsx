import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import {
  Link,
  Flex,
  Avatar,
  Button,
  Box,
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
    diverseOwnership: []
    logo: {
      asset: {
      }
    }
  }
}

const JobPosting = () => {
  const data = useStaticQuery(graphql`
    query JobPostingQuery {
      allSanityJobPosting {
        nodes {
          _createdAt
          applicationLink
          position
          highlight
          id
          email
          includeLogo
          minAnnualSalary
          maxAnnualSalary
          location
          paymentStatus
          stickyLength
          primarySkill {
            skillName
          }
          tags {
            id
            tagName
            slug {
              current
            }
          }
          company {
            name
            diverseOwnership
            logo {
              asset {
                gatsbyImageData(width: 100)
              }
            }
          }
        }
      }
    }
  `)

  const jobPosting = data.allSanityJobPosting.nodes
  const minSalary = jobPosting.minAnnualSalary

  return (
    <>
      {jobPosting.map((node: Props) => {

        const minSalary = "$" + node.minAnnualSalary / 1000 + "k"
        const maxSalary = "$" + node.maxAnnualSalary / 1000 + "k"

        return (
          < Grid
            p={2}
            my={2}
            templateColumns='repeat(5, 1fr)'
            width="100%"
            alignItems="center"
          >
            <GridItem colSpan={2}>
              <HStack spacing={5}>
                <Avatar></Avatar>
                <VStack spacing={1} align="left">
                  <Heading variant="card" as="h3">{node.position}</Heading>
                  <Text fontSize="sm">{node.company.name}</Text>
                  <Text variant="mono" fontSize="xs">{minSalary} - {maxSalary}</Text>
                </VStack>
              </HStack>
            </GridItem>
            <GridItem colSpan={1} alignSelf="start">
              <Text variant="mono" fontSize="xs">{node.location}</Text>
            </GridItem>
            <GridItem colSpan={1} alignSelf="start">
              <Wrap align="center">
                {node.tags.map((tag) =>
                  <Tag
                    fontFamily="GT-America-Mono"
                  >
                    {tag.tagName}
                  </Tag>
                )}
              </Wrap>
            </GridItem>
            <GridItem colSpan={1}>
              <HStack verticalAlign="center" float="right">
                <Text>4h</Text>
                <Button variant="outline" colorScheme="pink">Apply</Button>
              </HStack>
            </GridItem>
          </Grid >
        )
      })}
    </>
  )
}

export default JobPosting