import React from 'react'
import {
  Button,
} from '@chakra-ui/react'
import { SearchBox, RefinementList, UseClearRefinementsProps, useClearRefinements, UseMenuProps } from 'react-instantsearch-hooks-web';
import { FiTrash2 } from "react-icons/fi"

const ClearSearch = (props: UseClearRefinementsProps) => {
  const { refine, canRefine, createURL } = useClearRefinements(props);

  return (
    canRefine ?
      <Button colorScheme="gray" variant="link" size="sm" onClick={() => refine()}>Clear Filters</Button>
      : null
  )
}

export default ClearSearch