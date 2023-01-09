import { Box, VStack, Text, Heading, Link } from '@chakra-ui/react'
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
        bg="#D0C4DF"      >
        <Header />
        <Box
          as="div"
          margin="0 auto"
        >
          <Box as="main">{children}</Box>
          <VStack textAlign="center" py={[10, 20]} as="footer">
            <Heading fontFamily={"GT-America-Extended"} fontWeight="500" size="md" as="h4">Send new jobs to your inbox:</Heading>
            <NewsletterSignup />
            <Text>
              © {new Date().getFullYear()}, Groovy Careers
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