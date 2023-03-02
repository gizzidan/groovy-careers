import React, { useState } from 'react'
import Logo from './brand-logo'
import MenuToggle from './menu-toggle'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import { FiX, FiMenu } from "react-icons/fi"
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
  PopoverTrigger,
  IconButton,
  Box,
  VStack,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  ListItem
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
        { text: "FAQ - Companies", href: "/faq-companies" },
        { text: "Subscription Plans", href: "/subscriptions" },
        { text: "Resume Database - Coming Soon", href: "#" }
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
  const [display, changeDisplay] = useState('none')
  return (
    <chakra.header id="header">
      <AnnouncementBar />
      <Flex
        display={{ base: 'none', lg: 'flex' }}
        as="nav"
        bg="transparent"
        w="100%"
        maxW="1200px"
        px={["3", "5"]}
        py={["3", "5"]}
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
                    <List
                      fontSize={{ base: 'lg', md: 'md' }}
                      fontFamily="GT-America-Extended" key={navItems.id}>
                      {navItems.href.externalContent ? (
                        <Link href={navItems.href.linkUrl} target='_blank' rel='noopener noreferer'>{navItems.text}</Link>
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
      <Flex
        display={{ base: "flex", lg: "none" }}
        px={2}
        py={2}
        position="relative"
        justify="space-between"
        align="center"
      >
        <HStack>
          <IconButton
            aria-label="Open Menu"
            size="lg"
            icon={<FiMenu />}
            variant="ghost"
            float="left"
            bg="whiteAlpha.400"
            mr={1}
            onClick={() => changeDisplay('flex')} // added line
          />
          <Logo />
        </HStack>
        <Link
          onClick={() => changeDisplay('none')}
          float="right"
          _hover={{
            textDecoration: "none"
          }}
          as={GatsbyLink}
          to={`/${cta.href.linkUrl}`}
        >
          <Button variant="brand">Post $49</Button>
        </Link>

        <Flex
          w="100vw"
          display={display}
          bgColor="purple.50"
          zIndex={99999999999}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
        >
          <VStack>
            <Box w="100%">
              <AnnouncementBar />
            </Box>
            <Flex
              w="100%"
              px={2}
              position="relative"
              justify="left"
              align="center"
            >

              <IconButton
                aria-label="Open Menu"
                size="lg"
                mr={3}
                icon={<FiX />}
                onClick={() => changeDisplay('none')} // added line
              />
              <Logo />

            </Flex>
            <Accordion w="100%" defaultIndex={[2]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton fontFamily="GT-America-Extended">
                    <Box as="span" flex='1' textAlign='left'>
                      {applicantLinks.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                {applicantLinks.links.map((link: any) =>
                  <AccordionPanel key={link.text} pb={4}>
                    <Link
                      onClick={() => changeDisplay('none')}
                      fontFamily="GT-America"
                      py={2}
                      as={GatsbyLink}
                      to={link.href}>
                      {link.text}
                    </Link>
                  </AccordionPanel>
                )}
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton fontFamily="GT-America-Extended">
                    <Box as="span" flex='1' textAlign='left'>
                      {companyLinks.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                {companyLinks.links.map((link: any) =>
                  <AccordionPanel key={link.text} pb={4}>
                    <Link
                      onClick={() => changeDisplay('none')}
                      fontFamily="GT-America"
                      py={2}
                      as={GatsbyLink}
                      to={link.href}>
                      {link.text}
                    </Link>
                  </AccordionPanel>
                )}
              </AccordionItem>
            </Accordion>
            {navItemsGroup.map((node: { navItems: any[] }) => (
              <React.Fragment key={node.navItems.toString()}>
                {node.navItems ? (
                  <Box
                    px={4}
                    display="block"
                    w="100%"
                    fontSize="lg"
                  >
                    {node.navItems.map((navItems) => (
                      <List fontFamily="GT-America" key={navItems.id}>
                        {navItems.href.externalContent ? (
                          <ListItem py={2}>
                            <Link onClick={() => changeDisplay('none')} href={navItems.href.linkUrl} target='_blank' rel='noopener noreferer'>{navItems.text}</Link>
                          </ListItem>
                        )
                          :
                          <ListItem py={2}>
                            <Link onClick={() => changeDisplay('none')} as={GatsbyLink} to={`/${navItems.href.linkUrl}`}>{navItems.text}</Link>
                          </ListItem>
                        }
                      </List>
                    ))}
                  </Box>
                ) : null}
              </React.Fragment>
            ))}
            <Link
              onClick={() => changeDisplay('none')}
              pt={3}
              _hover={{
                textDecoration: "none"
              }}
              as={GatsbyLink}
              to={`/${cta.href.linkUrl}`}
            >
              <Button variant="brand">{cta.text}</Button>
            </Link>
          </VStack>
        </Flex>
      </Flex>

    </chakra.header>
  )
}

export default Header