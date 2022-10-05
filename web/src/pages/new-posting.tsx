import * as React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
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
  RangeSliderTrack
} from '@chakra-ui/react'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import SEO from '../components/seo'

type Inputs = {
  position: string,
  description: string,
  companyName: string,
  primarySkill: string,
  tags: string,
  location: string,
  applicationLink: string,
  email: string,
  invoiceAddress: string,
  minSalary: number,
  maxSalary: number,
  stickyLength: number,
  highlight: boolean,
  couponCode: string,
}

const NewPostingPage = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  return (
    <>
      <Heading p={6} textAlign="center" as="h1">Post a Cannabis-Friendly Career</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <FormLabel>Company Name</FormLabel>
            <Select {...register("companyName")} placeholder='Select your company'>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
            </Select>
            <FormHelperText>Select from list above or add new.</FormHelperText>
          </FormControl>
          <FormControl isInvalid={errors.primarySkill ? true : false}>
            <FormLabel variant="tip">Primary skill</FormLabel>
            <Select
              id="primarySkill"
              placeholder='Select one primary skill'
              {...register('primarySkill', {
                required: 'This is required',
              })}
            >
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
            <FormErrorMessage>
              {errors.primarySkill && errors.primarySkill.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl >
            <FormLabel variant="tip">Tags (max five)</FormLabel>
            <Input {...register("tags")} placeholder='cultivation, retail, front-end, etc...' />
            <FormHelperText>List relevant tags separated with a comma.</FormHelperText>
          </FormControl>
          <FormControl >
            <FormLabel>Location</FormLabel>
            <Input {...register("location")} placeholder='City, State (or Country) or Remote' />
          </FormControl>
          <FormControl >
            <FormLabel variant="tip">Application Link
            </FormLabel>
            <Input {...register("applicationLink")} placeholder='https://www.company.com/application' />
          </FormControl>
          <FormControl >
            <FormLabel variant="tip">Email Address
            </FormLabel>
            <Input{...register("email")} placeholder='email@company.com' />
            <FormHelperText>For invoices & communication. Stays private.</FormHelperText>
          </FormControl>
          <FormControl >
            <FormLabel variant="tip">Invoice Address
            </FormLabel>
            <Textarea {...register("invoiceAddress")} placeholder='Invoice Address' />
            <FormHelperText>Will be shown on invoices.</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel variant="tip">Salary Range
            </FormLabel>
            <RangeSlider aria-label={['min', 'max']} defaultValue={[10, 30]}>
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb {...register("minSalary")} index={0} />
              <RangeSliderThumb {...register("maxSalary")} index={1} />
            </RangeSlider>
          </FormControl>
          <FormControl>
            <FormLabel>Pin your post to the top for:</FormLabel>
            <RadioGroup w="100%" defaultValue='1'>
              <Stack>
                <Radio {...register("stickyLength")} value='1'>
                  No pin
                </Radio>
                <Radio {...register("stickyLength")} value='2'>24 hours (+$49)</Radio>
                <Radio {...register("stickyLength")} value='3'>7 days (+$99)</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl display="flex" alignItems={"center"}>
            <FormLabel pb="0" mb="0">Add a logo to your posting (+$29)</FormLabel>
            <Switch pb="0" mb="0" />
          </FormControl>
          <FormControl display="flex" alignItems={"center"}>
            <FormLabel pb="0" mb="0">Highlight your posting (+$49)</FormLabel>
            <Switch pb="0" mb="0" />
          </FormControl>
          <FormControl>
            <FormLabel>Coupon Code</FormLabel>
            <Input placeholder='Coupon Code' />
            <FormHelperText>If you pre-purchased listings, enter a code here.</FormHelperText>
          </FormControl>
          <Button isLoading={isSubmitting} type="submit">Submit</Button>
        </VStack >
      </form>
    </>
  )
}

export default NewPostingPage

export const Head = () => (
  <SEO title="Submit a new cannabis job posting" />
)