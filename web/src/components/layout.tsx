import { Box, VStack, Text, Heading, Link, Highlight } from '@chakra-ui/react'
import { graphql, useStaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Header from './header'
import NewsletterSignup from './newsletter-signup'

interface Props {
  children?: any
}
const Layout = ({ children }: Props) => {
  return (
    <>
      <Box
        bgGradient='linear(to-r, purple.100, pink.100, purple.100)'>
        <Header />
        <Box
          as="div"
          margin="0 auto"
        >
          <Box as="main">{children}</Box>
          <VStack textAlign="center" py={[5, 10]} as="footer">
            <NewsletterSignup />
            <Text pt={10}>
              © {new Date().getFullYear()}, Groovy Careers | view <Link href="https://headwayapp.co/groovy-changelog" color="purple.500">changelog</Link>
            </Text>
          </VStack>
        </Box>
      </Box>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout