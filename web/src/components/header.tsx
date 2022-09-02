import React from 'react'
import Logo from './brand-logo'
import MenuToggle from './menu-toggle'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import {
  Link,
  List,
  Flex,
  HStack,
  Button,
  Wrap,
  chakra
} from '@chakra-ui/react'


const Header = () => {
  const data = useStaticQuery(graphql`
    query Header {
      sanityLayout {
        header {
          id
          navItemsGroup {
            id
            name
            navItems {
              text
              id
              href {
                externalContent
                linkUrl
              }
            }
          }
          cta {
            text
            href {
              externalContent
              linkUrl
            }
          }
        }
      }
    }
  `)

  const { navItemsGroup, cta } = data.sanityLayout.header
  const [show, setShow] = React.useState(false)
  const toggleMenu = () => setShow(!show)

  return (
    <chakra.header id="header">
      <Flex
        as="nav"
        bg="transparent"
        w="100%"
        maxW="1200px"
        px="6"
        py="5"
        m="auto"
        align="center"
        position="relative"
        justify="space-between"
      >
        <Flex float="left">
          <Logo />
        </Flex>
        <HStack float="right" spacing={5}>
          {navItemsGroup.map((node: { navItems: any[] }) => (
            <React.Fragment key={node.navItems.toString()}>
              {node.navItems ? (
                <Wrap spacing='30px'>
                  {node.navItems.map((navItems) => (
                    <List fontFamily="GT-America-Extended" key={navItems.id}>
                      {navItems.href.externalContent ? (
                        <a href={navItems.href.linkUrl} target='_blank' rel='noopener noreferer'>{navItems.text}</a>
                      )
                        : <Link as={GatsbyLink} to={`/${navItems.href.linkUrl}`}>{navItems.text}</Link>
                      }
                    </List>
                  ))}
                </Wrap>
              ) : null}
            </React.Fragment>
          ))}
          <Link as={GatsbyLink} to={`/${cta.href.linkUrl}`}>
            <Button variant="brand">{cta.text}</Button>
          </Link>
          <MenuToggle toggleMenu={toggleMenu} show={show} />
        </HStack>

      </Flex>
    </chakra.header>
  )
}

export default Header