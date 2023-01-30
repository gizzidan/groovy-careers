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
        bgGradient='linear(to-r, purple.100, pink.100, mantis.100)'>
        <Header />
        <Box
          as="div"
          margin="0 auto"
        >
          <Box as="main">{children}</Box>
          <VStack textAlign="center" py={[10, 20]} as="footer">
            <Heading fontFamily={"GT-America-Extended"} fontWeight="500" size="md" as="h4"><Highlight query={'new jobs'} styles={{ px: '2', py: '1', rounded: 'full', bg: 'mantis.100' }}>Send new jobs to your inbox:</Highlight> </Heading>
            <NewsletterSignup />
            <Text pt={4}>
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