import React from 'react'
import { Box, Text } from "@chakra-ui/react"

interface ButtonProps {
  cardId: number
  onClick?: () => void
}

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode
  iconId?: string
}

export const NumberButton = ({ number, cardId, onClick }: { number: number } & ButtonProps) => (
  <Box
    key={`card${cardId}-button${number}`}
    as="button"
    display="flex"
    alignItems="center"
    justifyContent="center"
    width="64px"
    height="64px"
    borderRadius="full"
    border="2px solid"
    borderColor="gray.500"
    bg="bg"
    cursor="pointer"
    _hover={{ bg: 'bg.subtle' }}
    _active={{ bg: 'bg.muted' }}
    onClick={onClick}
  >
    <Text color="gray.500" fontSize="xl" fontWeight="bold">{number}</Text>
  </Box>
)

export const IconButton = ({ icon, cardId, iconId, onClick }: IconButtonProps) => (
  <Box
    key={`card${cardId}-icon-${iconId || 'default'}`}
    as="button"
    display="flex"
    alignItems="center"
    justifyContent="center"
    width="64px"
    height="64px"
    borderRadius="full"
    border="2px solid"
    borderColor="gray.500"
    bg="bg"
    cursor="pointer"
    _hover={{ bg: 'bg.subtle' }}
    _active={{ bg: 'bg.muted' }}
    onClick={onClick}
  >
    {icon}
  </Box>
) 