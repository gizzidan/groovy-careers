import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import {
	Link,
	Flex,
	Button,
	VStack,
	Wrap,
	chakra,
	Text,
	Heading
} from '@chakra-ui/react'
import JobPosting from './job-posting'

const PostingContainer = () => {
	return (
		<VStack>
			<JobPosting />
			<JobPosting />
			<JobPosting />
		</VStack>
	)
}

export default PostingContainer