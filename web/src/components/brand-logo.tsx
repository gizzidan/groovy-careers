import React from "react"
import { Box, Text, useMediaQuery } from "@chakra-ui/react"

export default function Logo(props: any) {
	const [isLargerThan600] = useMediaQuery('(max-width: 600px)')
	return (
		<Box {...props}>
			<Text
				color="black"
				mb={["1", "0"]}
				lineHeight="0"
				fontSize={["4xl", "3xl"]}
				fontFamily="PicnicFont"
			>
				{isLargerThan600 ? 'CFC' : 'Cannabis Friendly Careers'}
			</Text>
		</Box>
	)
}