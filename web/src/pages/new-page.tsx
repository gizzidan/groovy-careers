import React, { ReactNode, useState, useEffect, useRef } from 'react'
import loadable from '@loadable/component'
import { useForm } from '@mantine/form';
import { TextInput, Checkbox, Group } from '@mantine/core';
import {
  Box,
  Button,
  Divider,
  ButtonGroup,
  Heading,
  Link,
  List,
  ListItem,
  FormLabel,
  FormErrorMessage,
  VStack,
  HStack,
  Textarea,
  Input,
  InputGroup,
  Select,
  Radio,
  RadioGroup,
  Stack,
  Flex,
  FormControl,
  Switch,
  FormHelperText,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  RangeSliderMark,
  Text
} from '@chakra-ui/react'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import SEO from '../components/seo'
import FileUpload from '../components/file-upload'
import RichText from '../components/rich-text-editor'

const NewPostingForm = loadable(() => import('../components/new-posting-form'))

// Types
type PopulateList = {
  data: {
    allSanityCompany: {
      nodes: {
        id: string
        name: string
      }[]
    }
    allSanityPrimarySkill: {
      nodes: {
        id: string
        skillName: string
        skillCategory: {
          categoryName: string
        }
      }[]
    }
    allSanitySkillCategory: {
      nodes: {
        id: string
        categoryName: string
      }[]
    }
  }
}

const NewPage = (data: PopulateList) => {
  return (
    <NewPostingForm data={data.data} />
  )
}

// Page Query
export const query = graphql`
  query NewPageQuery {
    allSanityCompany(sort:
    {fields: [name],
    order: [ASC]})
    {
      nodes {
        id
        name
      }
    }
    allSanityPrimarySkill(sort:
    {fields: [skillName],
    order: [ASC]})
    {
      nodes {
        id
        skillName
        skillCategory {
          categoryName
        }
      }
    }
    allSanitySkillCategory(sort:
    {fields: [categoryName],
    order: [ASC]}) {
    nodes {
      id
      categoryName
    }
  }
  }
`

export default NewPage