import React from "react"
import {
  Text,
  Heading,
  Badge,
  useMediaQuery
} from '@chakra-ui/react'

const DiversityTags = ({ label, diverseOwnership }: any) => {
  const [isSmallerThan380] = useMediaQuery('(max-width: 380px)')


  return (
    < Text fontSize="sm" > {label}
      {
        diverseOwnership !== null
          ? diverseOwnership.sort().map((ownership: string) => {
            const color = ownership == "Minority-Owned" ? "gray" : ownership == "Women-Owned" ? "pink" : ownership == "Veteran-Owned" ? "cyan" : "whiteAlpha"

            return (
              <Badge key={ownership.toString()} mb={1} ml={[1, 2]} variant="solid" fontSize="0.7rem" colorScheme={color}>
                {isSmallerThan380 ? ownership.slice(0, 1) : ownership.slice(0, -6)}</Badge>
            )
          }
          )
          : null
      }
    </Text >
  )
}

export default DiversityTags