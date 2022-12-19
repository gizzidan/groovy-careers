import React, { ReactNode, useState, useEffect, useRef } from 'react'
import loadable from '@loadable/component'
import { useForm, SubmitHandler, Controller, UseFormRegisterReturn } from "react-hook-form"
import {
  Box,
  Button,
  CheckboxGroup,
  Checkbox,
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
  Text,
  useToast
} from '@chakra-ui/react'
import SEO from '../components/seo'
import FileUpload from '../components/file-upload'
import RichTextEditor from '@mantine/rte';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
  AutoCompleteCreatable
} from "@choc-ui/chakra-autocomplete";


// Types
type Inputs = {
  position: string,
  description: string,
  companyName: string,
  skillCategory: string,
  category: string,
  tags: string[],
  location: string,
  applicationLink: string,
  email: string,
  diverseOwnership: string[],
  invoiceAddress: string,
  salaryRange: number[],
  stickyLength: number,
  includeLogo: boolean,
  highlight: boolean,
  couponCode: string,
  companyLogo: any,
}

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

const NewPostingForm = ({ data }: PopulateList) => {
  const { register, handleSubmit, control, setError, reset, watch, formState, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<Inputs>()
  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const toast = useToast()
  const API_ENDPOINT = '/api/submit-posting';
  const handlePost: SubmitHandler<Inputs> = async data => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      key == "companyLogo" && value[0]
        ? formData.append(key, value[0], value[0].name)
        : formData.append(key, value);
    }

    await fetch(API_ENDPOINT, {
      method: `POST`,
      body: formData,
    })
      .then(res => res.json())
      .then(body => {
        console.log("response: ", body)
        window.open(body, "_blank")
        toast({
          title: "Submitted!",
          position: "top",
          status: "success",
          duration: 6000,
          isClosable: true
        });
      })
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

  const category = data.allSanityCategory.nodes
  const company = data.allSanityCompany.nodes
  const tag = data.allSanityJobTag.nodes

  const options = tag.map((tag) => tag.tagName)

  const initialValue =
    '<p>Your initial <b>html value</b> or an empty string to init editor without value</p>';

  return (
    <>
      <Box bg="white" py={12}>
        <Heading pb={6} textAlign="center" as="h1">Submit a new job posting</Heading>
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
            <FormControl isInvalid={errors.description ? true : false}>
              <FormLabel htmlFor="description">Description of Position</FormLabel>
              <Controller
                control={control}
                name="description"
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { isTouched, isDirty, error },
                  formState,
                }) => (
                  <RichTextEditor
                    sx={{ background: "transparent", fontFamily: "GT-America", fontSize: "16px" }}
                    value={value}
                    onChange={onChange} // send value to hook form
                    controls={[
                      ['bold', 'italic', 'underline', 'strike', 'link'],
                      ['unorderedList', 'orderedList'],
                    ]}
                  />
                )}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
            {showText
              ?
              <>
                <FormControl isInvalid={errors.companyName ? true : false}>
                  <FormLabel htmlFor='companyName'>Company Name</FormLabel>
                  <Input {...register("companyName", { required: "This is required" })} placeholder="Company Name"></Input>
                  <FormErrorMessage>
                    {errors.companyName && errors.companyName.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.diverseOwnership ? true : false}>
                  <FormLabel htmlFor='diverseOwnership'>Diverse Ownership</FormLabel>
                  <CheckboxGroup>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                      <Checkbox {...register("diverseOwnership")} value='Black-Owned'>Black-Owned</Checkbox>
                      <Checkbox {...register("diverseOwnership")} value='Veteran-Owned'>Veteran-Owned</Checkbox>
                      <Checkbox {...register("diverseOwnership")} value='Women-Owned'>Women-Owned</Checkbox>
                    </Stack>
                  </CheckboxGroup>
                  <FormHelperText>Is the majority of your business diversely owned? Don't lie.</FormHelperText>
                </FormControl>
                <FormControl isInvalid={errors.invoiceAddress ? true : false}>
                  <FormLabel htmlFor='invoiceAddress' variant="tip">Invoice Address
                  </FormLabel>
                  <Textarea {...register("invoiceAddress", { required: "This is required" })} placeholder='Invoice Address' />
                  <FormHelperText>
                    <Button fontFamily="GT-America" size="sm" colorScheme="blue" variant="link" onClick={handleHide}>Choose Company From List</Button>
                  </FormHelperText>
                </FormControl>
                <Divider />
              </>
              :
              <FormControl isInvalid={errors.companyName ? true : false}>
                <FormLabel htmlFor='companyName'>Company Name</FormLabel>
                <Select {...register("companyName", { required: "This is required" })} placeholder='Select your company'>
                  {company.map((node) =>
                    <option key={node.id} value={node.name}>{node.name}
                    </option>
                  )}
                </Select>
                <FormHelperText>
                  <Button fontFamily="GT-America" size="sm" colorScheme="blue" variant="link" onClick={handleShow}>Add New Company</Button>
                </FormHelperText>
                <FormErrorMessage>
                  {errors.companyName && errors.companyName.message}
                </FormErrorMessage>
              </FormControl>}

            <FormControl
              isInvalid={errors.category ? true : false}

            >
              <FormLabel htmlFor='category' variant="tip">Category</FormLabel>

              <Select
                id="category"
                placeholder='Select one category for this position'
                {...register('category', {
                  required: 'This is required',
                })}
              >
                {category.map((node) =>
                  <option key={node.id} value={node.categoryName}>{node.categoryName}
                  </option>)}
              </Select>
              <FormErrorMessage>
                {errors.category && errors.category.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.tags ? true : false}>
              <FormLabel htmlFor='tags' variant="tip">Tags</FormLabel>
              <Controller
                control={control}
                name="tags"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { isTouched, isDirty, error },
                  formState,
                }) => (
                  <AutoComplete
                    maxSelections={4} openOnFocus multiple
                    onChange={onChange}
                    value={value}
                  >
                    <AutoCompleteInput variant="outline">
                      {({ tags }) =>
                        tags.map((tag, tid) => (
                          <AutoCompleteTag
                            key={tid}
                            label={tag.label}
                            colorScheme="purple"
                            onRemove={tag.onRemove}
                          />
                        ))
                      }
                    </AutoCompleteInput>
                    <AutoCompleteList>
                      {options.map((tags, cid) => (
                        <AutoCompleteItem
                          key={`option-${cid}`}
                          value={tags}
                          textTransform="capitalize"
                          _selected={{ bg: "blackAlpha.50" }}
                          _focus={{ bg: "blackAlpha.100" }}
                        >
                          {tags}
                        </AutoCompleteItem>
                      ))}
                    </AutoCompleteList>
                  </AutoComplete>
                )}
              />
              <FormHelperText>Max four tags.</FormHelperText>
            </FormControl>
            <FormControl isInvalid={errors.location ? true : false}>
              <FormLabel htmlFor='location'>Location</FormLabel>
              <Input {...register("location", { required: "This is required" })} placeholder='City, State (or Country) or Remote' />
            </FormControl>
            <FormControl isInvalid={errors.applicationLink ? true : false}>
              <FormLabel htmlFor='applicationLink' variant="tip">Application Link
              </FormLabel>
              <Input {...register("applicationLink", { pattern: { value: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/, message: "Invalid URL" }, required: "This is required" })} placeholder='https://www.company.com/application' />
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
            <FormControl>
              <FormLabel htmlFor='salaryRange' variant="tip">Salary Range
              </FormLabel>
              <Text pb={2} align="center">${sliderValue[0].toLocaleString("en-US")} - ${sliderValue[1].toLocaleString("en-US")}</Text>
              <Controller
                control={control}
                name="salaryRange"
                defaultValue={[75000, 100000]}
                render={({ field }) => (
                  <RangeSlider
                    {...field}
                    onChange={(value: any) => {
                      setSliderValue(value); console.log(value);
                      field.onChange(value);
                    }}
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
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                  </RangeSlider>
                )}
              />

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
            <FormControl alignItems={"center"}>
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
                  <input type='file' accept="image/*" {...register('companyLogo')} />
                </Flex>
                : null
              }
              <FormHelperText>Upload a logo if you're a new company or want to change your logo. PNG/JPG less than 10MB.</FormHelperText>
              <FormErrorMessage>
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
      </Box>
    </>
  )
}


export default NewPostingForm