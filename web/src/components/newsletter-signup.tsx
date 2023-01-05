import { Grid, GridItem, Input, Tooltip, MenuButton, IconButton, MenuList, MenuOptionGroup, Menu, MenuItemOption, MenuDivider, Button, FormControl, useToast } from '@chakra-ui/react';
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
      <Grid
        p={1}
        my={3}
        gap={1}
        templateColumns={['repeat(4, 1fr)', '2fr .25fr 1fr']}
        alignItems="center"
        width={['80vw', '500px']}

      >
        <GridItem colSpan={[3, 1]}>
          <FormControl isInvalid={errors.email ? true : false}>
            <Input placeholder="Email address" borderColor={"blackAlpha.200"} bg="whiteAlpha.700" {...register("email", { required: true, pattern: /^\S+@\S+$/i })}></Input>
          </FormControl>
        </GridItem>
        <GridItem >
          <Menu closeOnSelect={false}>
            <Tooltip label="Change frequency and categories" aria-label='A tooltip'>
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
            </Tooltip>
            <MenuList zIndex="9999" minWidth='240px'>
              <Controller
                control={control}
                name="frequency"
                defaultValue='daily'
                render={({ field }) => (
                  <>
                    <MenuOptionGroup
                      {...field}
                      onChange={(value: any) => {
                        console.log(value);
                        field.onChange(value);
                      }}
                      defaultValue='daily'
                      title='Frequency'
                      type='radio'
                    >
                      <MenuItemOption value='daily'>Daily</MenuItemOption>
                      <MenuItemOption value='weekly'>Weekly</MenuItemOption>
                    </MenuOptionGroup>
                  </>
                )}
              />
              <MenuDivider />
              <FormControl>

              </FormControl>
              <Controller
                control={control}
                name="categories"
                defaultValue={categories}
                render={({ field }) => (
                  <>
                    <MenuOptionGroup
                      {...field}
                      onChange={(value: any) => {
                        console.log(value);
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
    </form >
  );
}

export default NewsletterSignup