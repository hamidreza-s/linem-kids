import React from 'react'
import { Box, Text } from "@chakra-ui/react"
import { IconButton } from "@/components/ui/buttons"
import { getEmojisForCard, EMOJI_SIZE } from "@/utils/emojis"

export type CardContent = {
  id: number;
  content: React.ReactNode[];
  getOptions: (cardId: number) => React.ReactNode;
  getMoreOptions: (cardId: number) => React.ReactNode;
}

export const createRootCardContent = (
  handleMoreOptions: (cardId: number, level: number) => void,
  handleNextCard: () => void
): Omit<CardContent, 'id'> => {
  return {
    content: [
      <Box key="root-item0" display="flex" alignItems="center" gap="4">
        <Text color="fg">Pick your favorite animal</Text>
      </Box>
    ],
    getOptions: (cardId: number) => {

      const allEmojis = getEmojisForCard(cardId, 11);
      
      return (
        <Box display="flex" gap="4" mt="4">
          {allEmojis.slice(0, 3).map((emoji, index) => (
            <IconButton
              key={index}
              icon={<Text fontSize={EMOJI_SIZE}>{emoji.emoji}</Text>}
              cardId={cardId}
              iconId={`emoji-${index}`}
              onClick={handleNextCard}
            />
          ))}
          <IconButton
            icon={<Text fontSize={EMOJI_SIZE}>➕</Text>}
            cardId={cardId}
            iconId="more"
            onClick={() => handleMoreOptions(cardId, 1)}
          />
        </Box>
      );
    },
    getMoreOptions: (cardId: number) => {
      const allEmojis = getEmojisForCard(cardId, 11);
      return (
        <>
          <Box display="flex" gap="4" mt="4">
            {allEmojis.slice(3, 7).map((emoji, index) => (
              <IconButton
                key={index}
                icon={<Text fontSize={EMOJI_SIZE}>{emoji.emoji}</Text>}
                cardId={cardId}
                iconId={`emoji-${index + 4}`}
                onClick={handleNextCard}
              />
            ))}
          </Box>
          <Box display="flex" gap="4" mt="4">
            {allEmojis.slice(7, 11).map((emoji, index) => (
              <IconButton
                key={index}
                icon={<Text fontSize={EMOJI_SIZE}>{emoji.emoji}</Text>}
                cardId={cardId}
                iconId={`emoji-${index + 8}`}
                onClick={handleNextCard}
              />
            ))}
          </Box>
        </>
      );
    }
  }
} 