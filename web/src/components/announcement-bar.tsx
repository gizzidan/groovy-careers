import React from "react"
import { Box, Center, Link, Text, useMediaQuery } from "@chakra-ui/react"
import { graphql, Link as GatsbyLink, useStaticQuery } from 'gatsby'

const AnnouncementBar = () => {
  const data = useStaticQuery(graphql`
    query AnnouncementQuery {
      sanityAnnouncement {
        text
      }
    }
  `)

  return (
    <Center py={1} bg="black">
      <Text color="white" fontFamily="GT-America-Mono">{data.sanityAnnouncement.text}</Text>
    </Center>
  )
}

export default AnnouncementBar