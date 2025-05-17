'use client'

import React from 'react'
import { Box, Text } from "@chakra-ui/react"
import { EMOJI_SIZE, Option } from "@/utils/card-options"

export type CardContent = {
  id: string;
  content: React.ReactNode[];
  image: string;
  getOptions: (cardId: string) => React.ReactNode;
}

export const createCard = (
  cardId: string,
  content: React.ReactNode[],
  image: string,
  options: Option[],
  onOptionClick: (cardId: string, option?: Option) => void,
): CardContent => {
  return {
    id: cardId,
    content: content.map((item, index) => (
      <Box
        key={`content-${cardId}-${index}`}
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
        width="100%">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          gap="4"
          width="100%"
          height="100%">
          {item}
        </Box>
      </Box>
    )),
    image: image,
    getOptions: (cardId: string) => {
      return (
        <Box
          display="flex"
          gap="4"
          mt="4"
          overflowX="auto"
          width="100%"
          minWidth="100%"
          flexWrap="nowrap"
          justifyContent={{ base: "left", md: "center" }}
          css={{
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }}
        >
          {options.slice(0, 11).map((option, index) => (
            <Box
              key={`card${cardId}-icon-${option.index}`}
              as="button"
              display="flex"
              alignItems="center"
              width="64px"
              height="64px"
              flexShrink={0}
              borderRadius="full"
              border="0.5px solid"
              borderColor="gray.500"
              bg="bg"
              cursor="pointer"
              _hover={{ bg: 'bg.subtle' }}
              _active={{ bg: 'bg.muted' }}
              onClick={() => onOptionClick(cardId, option)}
            >
              <Text
                fontSize={EMOJI_SIZE}
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
              >
                {option.option}
              </Text>
            </Box>

          ))}
        </Box>
      );
    },
  }
} 