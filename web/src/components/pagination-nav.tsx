import React from "react"
import { FiArrowRight, FiArrowLeft } from "react-icons/fi"
import {
  Text,
  Button,
  Box,
  Link,
  ButtonGroup,
} from '@chakra-ui/react'
import { usePagination } from 'react-instantsearch-hooks-web'

const PaginationNav = ({ props }: any) => {
  const {
    pages,
    currentRefinement,
    nbHits,
    nbPages,
    isFirstPage,
    isLastPage,
    refine,
    createURL,
  } = usePagination(props)
  const currentPage = currentRefinement
  let nextDisplay = false
  let nextDisabled = false
  currentPage < nbPages
    ? (nextDisplay = false, nextDisabled = false)
    : (nextDisplay = true, nextDisabled = true)

  var prevDisplay = false
  var prevDisabled = false
  currentPage > 0
    ? (prevDisplay = false, prevDisabled = false)
    : (prevDisplay = true, prevDisabled = true)

  return (
    <Box pt={2} textAlign="center">
      {nbPages > 1 ?
        <ButtonGroup isAttached={true}>
          {isFirstPage
            ?
            <>
              <Button
                borderRightRadius={0}
                borderRightWidth={0}
                leftIcon={<FiArrowLeft />}
                variant="outline"
                colorScheme="black"
                isDisabled={true}>
                Prev
              </Button>
              <Button
                borderRadius={0}
                variant="outline"
                colorScheme="black"
                isActive={true} >
                {currentPage + 1}
              </Button>
              <Link
                _hover={{
                  textDecoration: "none"
                }}
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  refine(currentPage + 1);
                }}>
                <Button
                  borderLeftRadius={0}
                  borderLeftWidth={0}
                  rightIcon={<FiArrowRight />}
                  variant="outline"
                  colorScheme="black"
                  isDisabled={nextDisplay}>
                  Next
                </Button>
              </Link>
            </>
            : isLastPage
              ?
              <>
                <Link
                  _hover={{
                    textDecoration: "none"
                  }}
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    refine(currentPage - 1);
                  }}>
                  <Button
                    borderRightRadius={0}
                    borderRightWidth={0}
                    leftIcon={<FiArrowLeft />}
                    variant="outline"
                    colorScheme="black"
                  >
                    Prev
                  </Button>
                </Link>
                <Button
                  borderRadius={0}
                  variant="outline"
                  colorScheme="black"
                  isActive={true} >
                  {currentPage + 1}
                </Button>
                <Button
                  borderLeftRadius={0}
                  borderLeftWidth={0}
                  rightIcon={<FiArrowRight />}
                  variant="outline"
                  colorScheme="black"
                  isDisabled={true}>
                  Next
                </Button>

              </>
              :
              <>
                <Link
                  _hover={{
                    textDecoration: "none"
                  }}
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    refine(currentPage - 1);
                  }}>
                  <Button
                    borderRightRadius={0}
                    borderRightWidth={0}
                    leftIcon={<FiArrowLeft />}
                    variant="outline"
                    colorScheme="black"
                    isDisabled={prevDisplay}>
                    Prev
                  </Button>
                </Link>
                <Button
                  borderRadius={0}
                  variant="outline"
                  colorScheme="black"
                  isActive={true} >
                  {currentPage + 1}
                </Button>
                <Link
                  _hover={{
                    textDecoration: "none"
                  }}
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    refine(currentPage + 1);
                  }}>
                  <Button
                    borderLeftRadius={0}
                    borderLeftWidth={0}
                    rightIcon={<FiArrowRight />}
                    variant="outline"
                    colorScheme="black"
                  >
                    Next
                  </Button>
                </Link>
              </>
          }
        </ButtonGroup>
        : null
      }
      <Text pt="10px" fontSize="sm" color="blackAlpha.800">{currentRefinement + 1} of {nbPages} page(s) for {nbHits} listing(s)</Text>

    </Box>
  )
}

export default PaginationNav