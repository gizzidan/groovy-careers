import React from 'react'
import {
  Button,
} from '@chakra-ui/react'
import { UseClearRefinementsProps, useClearRefinements } from 'react-instantsearch-hooks-web';
import { FiX } from "react-icons/fi"

const ClearSearch = (props: UseClearRefinementsProps) => {
  const { refine, canRefine, createURL } = useClearRefinements(props);

  return (
    canRefine ?
      <Button rightIcon={<FiX />} colorScheme="blackAlpha" variant="outline" size="xs" onClick={() => refine()}>Clear Filters</Button >
      : null
  )
}

export default ClearSearch