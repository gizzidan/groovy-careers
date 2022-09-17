import React from "react"
import {
  Text,
  Heading,
  Badge
} from '@chakra-ui/react'

const DiversityTags = ({ node, label, diverseOwnership }: any) => {

  return (
    < Text fontSize="md" > {label}
      {
        diverseOwnership.diverseOwnership
          ? diverseOwnership.diverseOwnership.sort().map((ownership: string) => {
            const color = ownership == "Minority-Owned" ? "gray" : ownership == "Women-Owned" ? "pink" : ownership == "Veteran-Owned" ? "cyan" : "whiteAlpha"
            return (
              <Badge key={ownership.toString()} mb={1} ml={2} variant="solid" fontSize="0.7rem" colorScheme={color}>{ownership.slice(0, -6)}</Badge>
            )
          }
          )
          : null
      }
    </Text >
  )
}

export default DiversityTags