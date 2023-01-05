import React from "react"
import { Badge, Box, Link, Text, useMediaQuery } from "@chakra-ui/react"
import { Link as GatsbyLink } from 'gatsby'


const Logo = (props: any) => {
	const [isLargerThan600] = useMediaQuery('(max-width: 600px)')
	return (
		<Box {...props} mb="-10px">
			<Link
				as={GatsbyLink}
				to="/"
				color="purple.700"
				mb={["0", "0"]}
				lineHeight="0"
				fontSize={["3xl", "3xl"]}
				fontFamily="Gulax"
				_hover={{
					textDecoration: "none",
				}}
			>
				{isLargerThan600 ? 'GROOVY' : 'GROOVY CAREERS'}
			</Link>
			<Badge ml={2} mb={6} fontSize="10px" variant="solid" colorScheme="pink" transform="rotate(-15deg)">Beta</Badge>
		</Box>
	)
}

export default Logo