import React from "react"
import { Box, Text } from "@chakra-ui/react"


export default function Logo(props: any) {
    return (
        <Box {...props}>
            <Text fontSize="2xl" fontFamily="PicnicFont">
                Cannabis Friendly Careers
            </Text>
        </Box>
    )
}