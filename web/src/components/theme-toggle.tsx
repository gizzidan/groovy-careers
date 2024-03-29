import { FiMoon, FiSun } from 'react-icons/fi'
import {
    IconButton,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

export default function ThemeToggle() {
    const { toggleColorMode: toggleMode } = useColorMode()
    const ToggleIcon = useColorModeValue(FiMoon, FiSun)

    return (
        <IconButton
            icon={<ToggleIcon />}
            variant="ghost"
            aria-label="Toggle Theme"
            onClick={toggleMode}
        />
    )
}