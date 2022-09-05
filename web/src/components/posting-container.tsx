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
	const data = useStaticQuery(graphql`
    query JobPostingQuery {
      allSanityJobPosting
      {
        nodes {
          _createdAt
          applicationLink
          position
          highlight
          id
          email
          includeLogo
          minAnnualSalary
          maxAnnualSalary
          location
          paymentStatus
          stickyLength
          primarySkill {
            skillName
          }
          tags {
            id
            tagName
            slug {
              current
            }
          }
          company {
            name
            diverseOwnership
            logo {
              asset {
                url
              }
            }
          }
        }
      }
    }
  `)
	return (
		<Box width='100%' my={8}>
			<JobPosting data={data} />
		</Box>
	)
}

export default PostingContainer