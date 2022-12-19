import React from 'react'
import Logo from './brand-logo'
import MenuToggle from './menu-toggle'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import {
  useDisclosure,
  Link,
  List,
  Flex,
  HStack,
  Button,
  Text,
  Wrap,
  chakra,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from '@chakra-ui/react'
import AnnouncementBar from './announcement-bar'
import PopoverMenu from './popover-menu'


const Header = () => {
  const data = useStaticQuery(graphql`
    query Header {
      sanityNavItemGroup(name: {in: ""}) {
        name
        navItems {
          href {
            linkUrl
            externalContent
          }
          text
        }
      }
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initRef = React.useRef()

  const companyLinks =
  {
    title: "For Companies",
    links:
      [
        { text: "FAQ - Companies", href: "/faq-companies" }
      ]
  }

  const applicantLinks =
  {
    title: "For Applicants",
    links:
      [
        { text: "FAQ - Applicants", href: "/faq-applicants" }
      ]
  }

  return (
    <chakra.header id="header">
      <AnnouncementBar />
      <Flex
        as="nav"
        bg="transparent"
        w="100%"
        maxW="1200px"
        px={["2", "5"]}
        py={["2", "5"]}
        m="auto"
        align="center"
        position="relative"
        justify="space-between"
      >
        <Flex float="left">
          <Logo />
        </Flex>
        <HStack float="right" spacing={5}>
          <PopoverMenu linkSet={companyLinks} />
          <PopoverMenu linkSet={applicantLinks} />
          {navItemsGroup.map((node: { navItems: any[] }) => (
            <React.Fragment key={node.navItems.toString()}>
              {node.navItems ? (
                <Wrap
                  display={{ base: show ? "block" : "none", md: "block" }}
                  spacing='30px'
                >
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


          <Link
            _hover={{
              textDecoration: "none"
            }}
            as={GatsbyLink} to={`/${cta.href.linkUrl}`}>
            <Button variant="brand">{cta.text}</Button>
          </Link>
        </HStack>
      </Flex>
    </chakra.header>
  )
}

export default Header