import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import {
	Link,
	Flex,
	Button,
	VStack,
	Wrap,
	Box,
	chakra,
	Text,
	Heading
} from '@chakra-ui/react'
import JobPosting from './job-posting'

const PostingContainer = () => {
	return (
		<Box width='100%' my={8}>
			<JobPosting />
		</Box>
	)
}

export default PostingContainer