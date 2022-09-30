import { Box, Link } from '@chakra-ui/react'
import { graphql, useStaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Header from './header'

interface Props {
  children?: any
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Box
        bg="#FBFBFB"
      >
        <Header />
        <Box
          as="div"
          margin="0 auto"
          maxWidth="1100px"
          px={[1, 6]}
        >
          <Box as="main">{children}</Box>
          <Box as="footer" marginTop="2rem" fontSize="l">
            © {new Date().getFullYear()}, Cannabis Friendly Jobs
          </Box>
        </Box>
      </Box>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout