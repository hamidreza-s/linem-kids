'use client'

import React from 'react'
import { Box, Text } from "@chakra-ui/react"
import { IconButton } from "@/components/ui/buttons"
import { EMOJI_SIZE, Option } from "@/utils/card-options"

export type CardContent = {
  id: string;
  content: React.ReactNode[];
  image: string;
  getOptions: (cardId: string) => React.ReactNode;
  getMoreOptions: (cardId: string) => React.ReactNode;
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
    content: content,
    image: image,
    getOptions: (cardId: string) => {
      return (
        <Box display="flex" gap="4" mt="4">
          {options.slice(0, 3).map((option, index) => (
            <IconButton
              key={`${cardId}-option-${index}`}
              icon={<Text fontSize={EMOJI_SIZE}>{option.option}</Text>}
              cardId={cardId}
              onClick={() => onOptionClick(cardId, option)}
            />
          ))}
          <IconButton
            key={`${cardId}-more`}
            icon={<Text fontSize={EMOJI_SIZE}>➕</Text>}
            cardId={cardId}
            iconId="more"
            onClick={() => onOptionClick(cardId)}
          />
        </Box>
      );
    },
    getMoreOptions: (cardId: string) => {
      return (
        <>
          <Box display="flex" gap="4" mt="4">
            {options.slice(3, 7).map((option, index) => (
              <IconButton
                key={`${cardId}-more-option-${index}`}
                icon={<Text fontSize={EMOJI_SIZE}>{option.option}</Text>}
                cardId={cardId}
                onClick={() => onOptionClick(cardId, option)}
              />
            ))}
          </Box>
          <Box display="flex" gap="4" mt="4">
            {options.slice(7, 11).map((option, index) => (
              <IconButton
                key={`${cardId}-more-option-${index + 7}`}
                icon={<Text fontSize={EMOJI_SIZE}>{option.option}</Text>}
                cardId={cardId}
                onClick={() => onOptionClick(cardId, option)}
              />
            ))}
          </Box>
        </>
      );
    }
  }
} 