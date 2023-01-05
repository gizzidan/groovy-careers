import React from "react"
import { Box, Center, Link, Text, useMediaQuery } from "@chakra-ui/react"
import { Link as GatsbyLink } from 'gatsby'

const AnnouncementBar = () => {

  return (
    <Center py={1} bg="black">
      <Text color="white" fontFamily="GT-America-Mono">Get 69% off with code GROOVYBETA</Text>
    </Center>
  )
}

export default AnnouncementBar