import React from "react"
import { Box } from "@chakra-ui/react"
import { FiX, FiMenu } from "react-icons/fi"


const MenuToggle = ({ toggleMenu, show }: any) => {
    return (
        <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
            {show ? <FiX /> : <FiMenu />}
        </Box>
    )
}

export default MenuToggle