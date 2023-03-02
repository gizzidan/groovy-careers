import { Popover, Link, PopoverTrigger, Button, VStack, PopoverContent, PopoverBody } from "@chakra-ui/react";
import { Link as GatsbyLink } from 'gatsby'
import React from "react";
import { GoChevronUp, GoChevronDown } from "react-icons/go";

type TypeLink = {
  text: string,
  href: string
}

type TypeLinkSet = {
  linkSet: {
    title: string
    links: TypeLink[]
  }
}

const PopoverMenu = ({ linkSet }: TypeLinkSet) => {
  return (
    <Popover trigger='hover'>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              _hover={{
                textDecoration: "none"
              }}
              variant="link"
              colorScheme={"black"}
              iconSpacing={1}
              fontSize={{ base: 'lg', md: 'md' }}
              rightIcon={isOpen ? <GoChevronUp /> : <GoChevronDown />}
            >
              {linkSet.title}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <VStack spacing={0} align="left">
                {linkSet.links.map((link: any) =>
                  <Link
                    fontFamily="GT-America"
                    p={1}
                    key={link.text}
                    as={GatsbyLink}
                    to={link.href}>
                    {link.text}
                  </Link>
                )}
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}

export default PopoverMenu
