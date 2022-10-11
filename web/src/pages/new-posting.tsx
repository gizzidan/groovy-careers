import React, { ReactNode, useState, useRef } from 'react'
import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form"
import {
  Box,
  Button,
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

type Inputs = {
  position: string,
  description: string,
  companyName: string,
  skillCategory: string,
  primarySkill: string,
  tags: string,
  location: string,
  applicationLink: string,
  email: string,
  invoiceAddress: string,
  minSalary: number,
  maxSalary: number,
  stickyLength: number,
  includeLogo: boolean,
  highlight: boolean,
  couponCode: string,
  file_: FileList
}

type PrimarySkill = {
  data: {
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

const NewPostingPage = ({ data }: PrimarySkill) => {
  const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm<Inputs>()

  const API_ENDPOINT = '/api/submit-posting';
  const handlePost: SubmitHandler<Inputs> = async data => {
    try {
      await fetch(API_ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
      })
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  const [sliderValue, setSliderValue] = useState([75000, 100000])
  const min = 10000
  const max = 300000

  const [showText, setShowText] = useState(false)
  const handleShow = () => setShowText(true)
  const handleHide = () => setShowText(false)

  const [showUpload, setShowUpload] = useState(false)
  const handleUpload = () => setShowUpload(showUpload ? false : true)

  const [selected, setSelected] = useState("")
  const changeSelectOptionHandler = (event: any) => {
    setSelected(event.target.value)
  }

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return 'Files is required'
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024)
      const MAX_FILE_SIZE = 10
      if (fsMb > MAX_FILE_SIZE) {
        return 'Max file size 10mb'
      }
    }
    return true
  }

  const skill = data.allSanityPrimarySkill.nodes
  const category = data.allSanitySkillCategory.nodes

  return (
    <>
      <Heading p={6} textAlign="center" as="h1">Post a Cannabis-Friendly Career</Heading>
      <form onSubmit={handleSubmit(handlePost)} method="post">
        <VStack spacing={8} maxW="700px" m="auto">
          <FormControl isInvalid={errors.position ? true : false}>
            <FormLabel htmlFor='position'>Position Title</FormLabel>
            <Input
              id='position'
              placeholder='Position'
              {...register('position', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })}
            />
            <FormErrorMessage>
              {errors.position && errors.position.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.position ? true : false}>
            <FormLabel htmlFor="description">Description of Position</FormLabel>
            <Textarea
              id="description"
              placeholder='Description'
              {...register('description', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.companyName ? true : false}>
            <FormLabel htmlFor='companyName'>Company Name</FormLabel>
            {showText
              ? <Input {...register("companyName", { required: "This is required" })} placeholder="Company Name"></Input>
              : <Select {...register("companyName", { required: "This is required" })} placeholder='Select your company'>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
              </Select>}
            <FormHelperText>
              {showText
                ? <Button fontFamily="GT-America" size="sm" colorScheme="blue" variant="link" onClick={handleHide}>Choose From List</Button>
                : <Button fontFamily="GT-America" size="sm" colorScheme="blue" variant="link" onClick={handleShow}>Add New Company</Button>}
            </FormHelperText>
            <FormErrorMessage>
              {errors.companyName && errors.companyName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.skillCategory ? true : false}>
            <FormLabel htmlFor='jobCategory' variant="tip">Job Category</FormLabel>
            <Select
              id="jobCategory"
              placeholder='Select one job category'
              {...register('skillCategory', {
                onChange: changeSelectOptionHandler,
                required: 'This is required',
              })}
            >
              {category.map((node) =>
                <option key={node.id} value={node.categoryName}>{node.categoryName}
                </option>
              )}
            </Select>
            <FormErrorMessage>
              {errors.skillCategory && errors.skillCategory.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={errors.primarySkill ? true : false}
            isDisabled={selected ? false : true}
          >
            <FormLabel htmlFor='primarySkill' variant="tip">Primary Skill</FormLabel>

            <Select
              id="primarySkill"
              placeholder='Select one primary skill'
              {...register('primarySkill', {
                required: 'This is required',
              })}
            >
              {skill.map((node) =>
                node.skillCategory.categoryName === selected ?
                  <option key={node.id} value={node.skillName}>{node.skillName}
                  </option> : null)}
            </Select>
            <FormErrorMessage>
              {errors.primarySkill && errors.primarySkill.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.tags ? true : false} >
            <FormLabel htmlFor='tags' variant="tip">Tags</FormLabel>
            <Input {...register("tags", {
              pattern: {
                value: /^[a-zA-Z0-9-\S]+(?:[,]+[a-zA-Z0-9-]+){0,4}$/,
                message: "Invalid tag"
              }
            })} placeholder='cultivation,retail,front-end' />
            <FormHelperText>List relevant tags separated with a comma and no spaces (max five).</FormHelperText>
            <FormErrorMessage>
              {errors.tags && errors.tags.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.location ? true : false}>
            <FormLabel htmlFor='location'>Location</FormLabel>
            <Input {...register("location")} placeholder='City, State (or Country) or Remote' />
          </FormControl>
          <FormControl isInvalid={errors.applicationLink ? true : false}>
            <FormLabel htmlFor='applicationLink' variant="tip">Application Link
            </FormLabel>
            <Input {...register("applicationLink", { pattern: { value: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/, message: "Invalid URL" } })} placeholder='https://www.company.com/application' />
          </FormControl>
          <FormControl isInvalid={errors.email ? true : false}>
            <FormLabel htmlFor='email' variant="tip">Email Address
            </FormLabel>
            <Input {...register("email", {
              required: "This is required",
              pattern: { value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Invalid email address." }
            })} placeholder='email@company.com' />
            <FormHelperText>For invoices & communication. Stays private.</FormHelperText>
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.invoiceAddress ? true : false}>
            <FormLabel htmlFor='invoiceAddress' variant="tip">Invoice Address
            </FormLabel>
            <Textarea {...register("invoiceAddress")} placeholder='Invoice Address' />
            <FormHelperText>Will be shown on invoices.</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='salaryRange' variant="tip">Salary Range
            </FormLabel>
            <Text pb={2} align="center">${sliderValue[0].toLocaleString("en-US")} - ${sliderValue[1].toLocaleString("en-US")}</Text>
            <RangeSlider
              onChange={(val) => setSliderValue(val)}
              aria-label={[String(min), String(max)]}
              colorScheme='green'
              defaultValue={[75000, 100000]}
              min={min} max={max} step={5000}
            >
              <RangeSliderMark color="blackAlpha.800" value={(.25 * max)} mt='1' ml='-2.5' fontSize='sm'>
                ${(.25 * max).toLocaleString("en-US")}
              </RangeSliderMark>
              <RangeSliderMark color="blackAlpha.800" value={(.50 * max)} mt='1' ml='-2.5' fontSize='sm'>
                ${(.50 * max).toLocaleString("en-US")}
              </RangeSliderMark>
              <RangeSliderMark color="blackAlpha.800" value={(.75 * max)} mt='1' ml='-2.5' fontSize='sm'>
                ${(.75 * max).toLocaleString("en-US")}
              </RangeSliderMark>
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb {...register("minSalary")} index={0} />
              <RangeSliderThumb {...register("maxSalary")} index={1} />
            </RangeSlider>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='stickyLength'>Pin your post to the top for:</FormLabel>
            <RadioGroup w="100%" defaultValue='1'>
              <Stack>
                <Radio {...register("stickyLength")} value='0'>
                  No pin
                </Radio>
                <Radio {...register("stickyLength")} value='1'>24 hours (+$49)</Radio>
                <Radio {...register("stickyLength")} value='7'>7 days (+$99)</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl isInvalid={!!errors.file_} alignItems={"center"}>
            <Flex>
              <FormLabel htmlFor='includeLogo' pb="0" mb="0">Add a logo to your posting (+$29)</FormLabel>
              <Switch
                {...register('includeLogo', {
                  onChange: handleUpload,
                })}
                pb="0"
                mb="0"
              />
            </Flex>
            {showUpload
              ?
              <Flex py={2}>
                <FileUpload
                  accept={'image/*'}
                  register={register('file_', {
                    validate: validateFiles
                  })}
                >
                </FileUpload>

              </Flex>
              : null
            }
            <FormHelperText>Upload a logo if you're a new company or want to change your logo. PNG/JPG less than 10MB.</FormHelperText>
            <FormErrorMessage>
              {errors.file_ && errors?.file_.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl display="flex" alignItems={"center"}>
            <FormLabel htmlFor='highlight' pb="0" mb="0">Highlight your posting (+$49)</FormLabel>
            <Switch
              {...register('highlight')}
              pb="0"
              mb="0"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='coupon'>Coupon Code</FormLabel>
            <Input {...register('couponCode')} placeholder='Coupon Code' />
            <FormHelperText>If you pre-purchased listings, enter a code here.</FormHelperText>
          </FormControl>
          <Button isLoading={isSubmitting} type="submit">Submit</Button>
        </VStack >
      </form>
    </>
  )
}

export const query = graphql`
  query NewPostingPageQuery {
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

export default NewPostingPage


export const Head = () => (
  <SEO title="Submit a new cannabis job posting" />
)