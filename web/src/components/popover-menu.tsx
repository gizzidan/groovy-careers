import { Popover, Link, PopoverTrigger, Button, PopoverContent, PopoverBody } from "@chakra-ui/react";
import { Link as GatsbyLink } from 'gatsby'
import React from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

type TypeLink = {
  link: {
    text: string
    href: string
  }[]
}

const PopoverMenu = (title: string, links: TypeLink) => {
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
              rightIcon={isOpen ? <FiChevronUp /> : <FiChevronDown />}
            >
              {title}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              {links.link.map((link) =>
                <Link
                  as={GatsbyLink}
                  to={link.href}>
                  {link.text}
                </Link>
              )}

            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}

export default PopoverMenu
