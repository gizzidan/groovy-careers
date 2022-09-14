import React from "react"
import { FiArrowRight, FiArrowLeft } from "react-icons/fi"
import { Link as GatsbyLink } from 'gatsby'
import {
  Text,
  Button,
  Box,
  Link,
  ButtonGroup,
} from '@chakra-ui/react'


const PaginationNav = ({ pageContext }: any) => {
  const currentPage = pageContext.currentPage
  const next = `${pageContext.link}page/${currentPage + 1}`
  const prev = currentPage === 2 ? `${pageContext.link}` : `${pageContext.link}page/${currentPage - 1}`
  let nextDisplay = false
  let nextDisabled = false
  currentPage < pageContext.numPages
    ? (nextDisplay = false, nextDisabled = false)
    : (nextDisplay = true, nextDisabled = true)

  var prevDisplay = false
  var prevDisabled = false
  currentPage > 1
    ? (prevDisplay = false, prevDisabled = false)
    : (prevDisplay = true, prevDisabled = true)

  return (
    <Box textAlign="center">
      <ButtonGroup isAttached={true}>
        {currentPage == 1
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
              {currentPage}
            </Button>
            <Link
              _hover={{
                textDecoration: "none"
              }}
              as={GatsbyLink}
              to={next}>
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
          : currentPage > 1 && currentPage < pageContext.numPages
            ?
            <>
              <Link
                _hover={{
                  textDecoration: "none"
                }}
                as={GatsbyLink}
                to={prev}>
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
                {currentPage}
              </Button>
              <Link
                _hover={{
                  textDecoration: "none"
                }}
                as={GatsbyLink}
                to={next}>
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
            :
            <>
              <Link
                _hover={{
                  textDecoration: "none"
                }}
                as={GatsbyLink}
                to={prev}>
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
                {currentPage}
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

        }
      </ButtonGroup>
    </Box>
  )
}

export default PaginationNav