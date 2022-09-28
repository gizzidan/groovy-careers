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
import { Link as GatsbyLink } from 'gatsby'


const PaginationNav = ({ props }: any) => {
  const {
    pages,
    currentRefinement,
    nbHits,
    nbPages,
    isFirstPage,
    isLastPage,
    canRefine,
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
    <Box textAlign="center">
      <Text>{currentRefinement + 1} of {nbPages} page(s) for {nbHits} listing(s)</Text>
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
                colorScheme="mantis"
                isDisabled={true}>
                Prev
              </Button>
              <Button
                borderRadius={0}
                variant="outline"
                colorScheme="mantis"
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
                  colorScheme="mantis"
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
                    colorScheme="mantis"
                  >
                    Prev
                  </Button>
                </Link>
                <Button
                  borderRadius={0}
                  variant="outline"
                  colorScheme="mantis"
                  isActive={true} >
                  {currentPage + 1}
                </Button>
                <Button
                  borderLeftRadius={0}
                  borderLeftWidth={0}
                  rightIcon={<FiArrowRight />}
                  variant="outline"
                  colorScheme="mantis"
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
                    colorScheme="mantis"
                    isDisabled={prevDisplay}>
                    Prev
                  </Button>
                </Link>
                <Button
                  borderRadius={0}
                  variant="outline"
                  colorScheme="mantis"
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
                    colorScheme="mantis"
                  >
                    Next
                  </Button>
                </Link>
              </>
          }
        </ButtonGroup>
        : null
      }

    </Box>
  )
}

export default PaginationNav