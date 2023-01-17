import {
  Box, Button, Flex, SimpleGrid, Card, CardHeader, CardBody, Heading, VStack, CardFooter, Text, UnorderedList, ListItem, Link, HStack, Grid, GridItem
} from '@chakra-ui/react'
import React from 'react'
import SEO from '../components/seo'

const Subscriptions = () => {

  return (
    <>
      <Box bg="white" py={20} px={4}>
        <VStack
          spacing={6}
          align="center"
          m="auto"
          maxW="800px"
        >
          <Heading
            as="h1"
            size={['2xl', '2xl']}
            textAlign="center"
            fontFamily="Gulax"
            textTransform="uppercase"
            fontWeight="normal"
            color="black"
            whiteSpace="pre-wrap"
          >
            Subscribe to save time & money
          </Heading>
          <Text
            fontSize={['lg', 'lg']}
            opacity="1"
            color="black"
            variant="body"
            textAlign="center"
          >
            Subscribe to one of our monthly plans to get more bang for your buck. The number of postings reload each month and rollover month-to-month. If you cancel you keep all of your postings until you use them. Each plan can be paused for up to 3 billing cycles.
          </Text>
        </VStack >
        <Heading
          as="h1"
          size={['2xl', '2xl']}
          textAlign="center"
          fontFamily="Gulax"
          pt={10}
          textTransform="uppercase"
          fontWeight="normal"
          color="black"
          whiteSpace="pre-wrap"
        >
          How it Works
        </Heading>
        <Grid pt={5} w="2xl" mx="auto" gridTemplateColumns={"1fr 5fr"}>
          <GridItem>
            <Text color="mantis.400" textAlign="center" px={3} fontFamily="GT-America-Extended" fontSize="5xl">1</Text>
          </GridItem>
          <GridItem>
            <Heading pt={4} fontSize="lg" as="h3">Pick your plan</Heading>
            <Text fontSize="lg" pt={2} >Select the plan below that includes the features that work for your business & budget.</Text>
          </GridItem>
        </Grid >
        <Grid py={5} w="2xl" mx="auto" gridTemplateColumns={"1fr 5fr"}>
          <GridItem>
            <Text color="mantis.400" textAlign="center" px={3} fontFamily="GT-America-Extended" fontSize="5xl">2</Text>
          </GridItem>
          <GridItem>
            <Heading pt={4} fontSize="lg" as="h3">Pay online</Heading>
            <Text fontSize="lg" pt={2}>Use your company email, enter your company name, and pay online. When complete, we'll send a receipt to the provided email.</Text>
          </GridItem>
        </Grid>
        <Grid pb={10} w="2xl" mx="auto" gridTemplateColumns={"1fr 5fr"}>
          <GridItem>
            <Text color="mantis.400" textAlign="center" px={3} fontFamily="GT-America-Extended" fontSize="5xl">3</Text>
          </GridItem>
          <GridItem>
            <Heading pt={4} fontSize="lg" as="h3">Get your code</Heading>
            <Text fontSize="lg" pt={2}>After payment is confirmed you will receive a coupon code send to your email that you can use whenever you submit a new job posting. Besides saving you money per posting, this coupon will also save you time by completely bypassing the typical checkout process.</Text>
          </GridItem>
        </Grid>
        <Box maxW="800px" m="auto" >
          <Heading py={2} fontSize="lg" as="h4">Subscription Plans</Heading>
          <Text fontSize="lg" color="blackAlpha.700">The plan that works best for the needs of my company is:</Text>
          <SimpleGrid py={6} spacing={7} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            <Card variant="outline">
              <CardHeader>
                <Heading color="purple.500" size='md'>Iridium</Heading>
                <Text color="purple.500" fontSize="md"><Text fontSize="2xl" as="span">$250</Text>/month</Text>
                <Text color="blackAlpha.600" size="sm">3 postings per month.</Text>
              </CardHeader>
              <CardBody>
                <Text>Each post includes:</Text>
                <UnorderedList>
                  <ListItem>Brand logo</ListItem>
                  <ListItem>Sticky for 1 day</ListItem>
                </UnorderedList>
              </CardBody>
              <CardFooter>
                <Link w="100%" target="_blank" rel="noreferrer noopener" href="https://square.link/u/73h9wkYa">
                  <Button colorScheme="purple" variant="outline" w="100%">Subscribe</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card variant="outline">
              <CardHeader>
                <Heading color="pink.500" size='md'>Rhodium</Heading>
                <Text color="pink.500" fontSize="md"><Text fontSize="2xl" as="span">$420</Text>/month</Text>
                <Text color="blackAlpha.600" size="sm">4 postings per month.</Text>
              </CardHeader>
              <CardBody>
                <Text>Each post includes:</Text>
                <UnorderedList>
                  <ListItem>Brand logo</ListItem>
                  <ListItem>Sticky for 1 day</ListItem>
                  <ListItem>Highlight</ListItem>
                </UnorderedList>
              </CardBody>
              <CardFooter>
                <Link w="100%" target="_blank" rel="noreferrer noopener" href="https://square.link/u/NGFtV2r2">
                  <Button colorScheme="pink" variant="outline" w="100%">Subscribe</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card bg="gray.100" variant="outline">
              <CardHeader>
                <Heading size='md'>Cesium</Heading>
                <Text fontSize="md"><Text fontSize="2xl" as="span">$690</Text>/month</Text>
                <Text color="blackAlpha.600" size="sm">6 postings per month.</Text>
              </CardHeader>
              <CardBody>
                <Text>Each post includes:</Text>
                <UnorderedList>
                  <ListItem>Brand logo</ListItem>
                  <ListItem>Sticky for 7 days</ListItem>
                  <ListItem>Highlight</ListItem>
                </UnorderedList>
              </CardBody>
              <CardFooter>
                <Link w="100%" target="_blank" rel="noreferrer noopener" href="https://square.link/u/88zl0Q4a">
                  <Button bg="black" variant="solid" w="100%">Subscribe</Button>
                </Link>
              </CardFooter>
            </Card>
          </SimpleGrid>
        </Box>

      </Box>
    </>
  )
}

export default Subscriptions

export const Head = () => (
  <SEO />
)