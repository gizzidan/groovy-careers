import React from "react"
import { Badge, Box, Link, Text, useMediaQuery } from "@chakra-ui/react"
import { Link as GatsbyLink } from 'gatsby'


const Logo = (props: any) => {
	const [isLargerThan600] = useMediaQuery('(max-width: 600px)')
	return (
		<Box {...props}
		>
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
				<Text display={{ base: 'none', md: 'block' }}>GROOVY CAREERS</Text>
				<Text display={{ base: 'block', md: 'none' }}>GROOVY</Text>
			</Link>

		</Box>
	)
}

export default Logo