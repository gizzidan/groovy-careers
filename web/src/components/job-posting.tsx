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

const JobPosting = () => {
  return (
    <Grid
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
            <Heading variant="card" as="h3">Dispensary Associate</Heading>
            <Text fontSize="sm">Haute Box Dispensary</Text>
            <Text variant="mono" fontSize="xs">$50k - $65k</Text>
          </VStack>
        </HStack>
      </GridItem>
      <GridItem colSpan={1} alignSelf="start">
        <Text variant="mono" fontSize="xs">New Jersey</Text>
      </GridItem>
      <GridItem colSpan={1} alignSelf="start">
        <Wrap align="center" maxWidth={200}>
          <Tag >customer-service</Tag>
        </Wrap>
      </GridItem>
      <GridItem colSpan={1}>
        <HStack verticalAlign="center" float="right">
          <Text>4h</Text>
          <Button variant="outline" colorScheme="green">Apply</Button>
        </HStack>
      </GridItem>
    </Grid>
  )
}

export default JobPosting