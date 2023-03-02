import { Grid, GridItem, Input, MenuButton, IconButton, MenuList, MenuOptionGroup, Menu, VStack, MenuItemOption, Text, Button, FormControl, useToast } from '@chakra-ui/react';
import { useStaticQuery, graphql } from 'gatsby';
import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FiSliders } from 'react-icons/fi';

// Types
type TypeNewsletterInputs = {
  email: string,
  frequency: string,
  categories: string[]
}

// Form Component
const NewsletterSignup = () => {
  const data = useStaticQuery(graphql`
    query NewsletterQuery {
      allSanityCategory(sort:
      {fields: [categoryName],
      order: [ASC]})
      {
        nodes {
          id
          categoryName
        }
      }
    }
  `)

  const categories: any[] = []
  data.allSanityCategory.nodes.map((node: any) =>
    categories.push(node.categoryName)
  )

  const { register, setValue, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<TypeNewsletterInputs>({ defaultValues: { categories: categories } });
  const toast = useToast()
  const API_ENDPOINT = '/api/mailchimp-signup';
  const onSubmit: SubmitHandler<TypeNewsletterInputs> = async data => {
    console.log(data)
    await fetch(API_ENDPOINT, {
      method: `POST`,
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
    })
      .then(res => res.json())
      .then(body => {
        toast({
          title: "You're subscribed!",
          position: "top",
          status: "success",
          duration: 3000,
          isClosable: true
        });
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={3} align="center">
        <Grid
          mt={3}
          gap={1}
          templateColumns={['repeat(4, 1fr)', '.25fr 2fr 1fr']}
          alignItems="center"
          width={['85vw', '500px']}

        >
          <GridItem colStart={[2, 2]} colEnd={[5, 2]}>
            <FormControl isInvalid={errors.email ? true : false}>
              <Input placeholder="Email address" borderColor={"blackAlpha.200"} bg="whiteAlpha.700" {...register("email", { required: true, pattern: /^\S+@\S+$/i })}></Input>
            </FormControl>
          </GridItem>
          <GridItem rowStart={1} colStart={[1, 1]} colEnd={1}>
            <Menu closeOnSelect={false}>
              <MenuButton
                as={IconButton}
                icon={<FiSliders />}
                variant="solid"
                w="100%"
                colorScheme='whiteAlpha'
                color="blackAlpha.7 00"
              >
                Select
              </MenuButton>
              <MenuList zIndex="9999" minWidth='240px'>
                <Controller
                  control={control}
                  name="categories"
                  defaultValue={categories}
                  render={({ field }) => (
                    <>
                      <MenuOptionGroup
                        {...field}
                        onChange={(value: any) => {
                          field.onChange(value);
                        }}
                        title='Category'
                        type='checkbox'
                      >
                        {data.allSanityCategory.nodes.map((node: any) =>
                          <MenuItemOption key={node.id} value={node.categoryName}>{node.categoryName}</MenuItemOption>
                        )}
                      </MenuOptionGroup>
                    </>
                  )}
                />

              </MenuList>
            </Menu>
          </GridItem>
          <GridItem colSpan={[4, 1]}>
            <Button w="100%" isLoading={isSubmitting} type="submit" colorScheme={"pink"}>Subscribe</Button>
          </GridItem>
        </Grid>
        <Text fontSize="sm" color="blackAlpha.700">Get new jobs sent to your inbox weekly</Text>
      </VStack>
    </form >
  );
}

export default NewsletterSignup