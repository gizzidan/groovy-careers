import React from 'react'
import {
  Button,
} from '@chakra-ui/react'
import { UseClearRefinementsProps, useClearRefinements } from 'react-instantsearch-hooks-web';
import { Link } from 'gatsby'
import { FiX } from "react-icons/fi"

const ClearSearch = (props: UseClearRefinementsProps) => {
  const { refine, canRefine, createURL } = useClearRefinements(props);

  return (
    canRefine ?
      <Link
        to="/"
      >
        <Button rightIcon={<FiX />} colorScheme="black" variant="outline" size="xs" onClick={() => refine()}>Clear All</Button >
      </Link>
      : null
  )
}

export default ClearSearch