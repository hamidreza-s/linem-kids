'use client'

import React from 'react'
import { Box, Text } from "@chakra-ui/react"
import { IconButton } from "@/components/ui/buttons"
import { EMOJI_SIZE, Option } from "@/utils/card-options"

export type CardContent = {
  id: number;
  content: React.ReactNode[];
  getOptions: (cardId: number) => React.ReactNode;
  getMoreOptions: (cardId: number) => React.ReactNode;
}

export const createCard = (
  cardId: number,
  content: React.ReactNode[],
  options: Option[],
  onOptionClick: (cardId: number, option?: Option) => void,
): CardContent => {
  return {
    id: cardId,
    content: content,
    getOptions: (cardId: number) => {
      return (
        <Box display="flex" gap="4" mt="4">
          {options.slice(0, 3).map((option, index) => (
            <IconButton
              key={index}
              icon={<Text fontSize={EMOJI_SIZE}>{option.option}</Text>}
              cardId={cardId}
              onClick={() => onOptionClick(cardId, option)}
            />
          ))}
          <IconButton
            icon={<Text fontSize={EMOJI_SIZE}>➕</Text>}
            cardId={cardId}
            iconId="more"
            onClick={() => onOptionClick(cardId)}
          />
        </Box>
      );
    },
    getMoreOptions: (cardId: number) => {
      return (
        <>
          <Box display="flex" gap="4" mt="4">
            {options.slice(3, 7).map((option, index) => (
              <IconButton
                key={index}
                icon={<Text fontSize={EMOJI_SIZE}>{option.option}</Text>}
                cardId={cardId}
                onClick={() => onOptionClick(cardId, option)}
              />
            ))}
          </Box>
          <Box display="flex" gap="4" mt="4">
            {options.slice(7, 11).map((option, index) => (
              <IconButton
                key={index}
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