import React from 'react'
import {
  Button,
} from '@chakra-ui/react'
import { UseClearRefinementsProps, useClearRefinements, UseMenuProps } from 'react-instantsearch-hooks-web';
import { FiTrash2 } from "react-icons/fi"

const ClearSearch = (props: UseClearRefinementsProps) => {
  const { refine, canRefine, createURL } = useClearRefinements(props);

  return (
    canRefine ?
      <Button rightIcon={<FiTrash2 />} colorScheme="pink" variant="solid" size="xs" onClick={() => refine()}>Clear Filters</Button>
      : null
  )
}

export default ClearSearch