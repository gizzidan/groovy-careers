import React, { ReactNode, useState, useEffect, useRef } from 'react'
import loadable from '@loadable/component'
import { useForm } from '@mantine/form';
import { TextInput, Checkbox, Group } from '@mantine/core';
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
    allSanityCategory: {
      nodes: {
        id: string
        categoryName: string
      }[]
    }
    allSanityJobTag: {
      nodes: {
        id: string
        tagName: string
      }[]
    }
  }
}

const CreateJobPosting = (data: PopulateList) => {
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
    allSanityCategory(sort:
    {fields: [categoryName],
    order: [ASC]})
    {
      nodes {
        id
        categoryName
      }
    }
    allSanityJobTag(sort:{fields: [tagName], order: [ASC]})
    {
      nodes {
        id
        tagName
      }
    }
  }
`

export default CreateJobPosting

export const Head = () => (
  <SEO title="Create new job posting" />
)