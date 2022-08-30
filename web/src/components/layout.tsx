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
        bg="#EDF2E4"
      >
			  <Header />
        <Box
          as="div"
          margin="0 auto"
          maxWidth="1200px"
          px="6"
        >
          <Box as="main">{children}</Box>
          <Box as="footer" marginTop="2rem" fontSize="xl">
            © {new Date().getFullYear()}, Built with
            {` `}
            <Link
              isExternal
              textDecor="underline"
              color="purple.500"
              href="https://www.gatsbyjs.com"
            >
              Gatsby
            </Link>
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