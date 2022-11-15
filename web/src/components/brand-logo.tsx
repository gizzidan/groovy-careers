import React from "react"
import { Box, Link, Text, useMediaQuery } from "@chakra-ui/react"
import { Link as GatsbyLink } from 'gatsby'


const Logo = (props: any) => {
	const [isLargerThan600] = useMediaQuery('(max-width: 600px)')
	return (
		<Box {...props}>
			<Link
				as={GatsbyLink}
				to="/"
				color="white"
				mb={["1", "0"]}
				lineHeight="0"
				fontSize={["4xl", "3xl"]}
				fontFamily="Gulax"
				_hover={{
					textDecoration: "none",
				}}
			>
				{isLargerThan600 ? 'GROOVY' : 'GROOVY CAREERS'}
			</Link>
		</Box>
	)
}

export default Logo