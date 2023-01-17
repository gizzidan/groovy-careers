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
				<Text display={['none', 'block']}>GROOVY CAREERS</Text>
				<Text display={['block', 'none']}>GROOVY</Text>
			</Link>

		</Box>
	)
}

export default Logo