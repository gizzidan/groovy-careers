import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import Layout from './components/layout'
import theme from './theme'
import Fonts from './fonts/fonts'

export const wrapPageElement = ({ element }: any) => {
    return (
        <ChakraProvider theme={theme} resetCSS>
            <Fonts />
            <Layout>{element}</Layout>
        </ChakraProvider>
    )
}