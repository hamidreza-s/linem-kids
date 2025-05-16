import React from 'react'
import { Box, Text } from "@chakra-ui/react"
import { Bird, Bug, Cat, Dices, Dog, Fish, Panda, RabbitIcon, Rat, Shrimp, Turtle, Worm } from "lucide-react"
import { IconButton } from "@/components/ui/buttons"

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
    getOptions: (cardId: number) => (
      <Box display="flex" gap="4" mt="4">
        <IconButton
          icon={<Cat color="#718096" strokeWidth={1.5} size={38} />}
          cardId={cardId}
          iconId="camera"
          onClick={handleNextCard}
        />
        <IconButton
          icon={<Bird color="#718096" strokeWidth={1.5} size={38} />}
          cardId={cardId}
          iconId="mic"
          onClick={handleNextCard}
        />
        <IconButton
          icon={<Panda color="#718096" strokeWidth={1.5} size={38} />}
          cardId={cardId}
          iconId="paperclip"
          onClick={handleNextCard}
        />
        <IconButton
          icon={<Dices color="#718096" strokeWidth={1.5} size={38} />}
          cardId={cardId}
          iconId="terminal"
          onClick={() => handleMoreOptions(cardId, 1)}
        />
      </Box>
    ),
    getMoreOptions: (cardId: number) => (
      <>
        <Box display="flex" gap="4" mt="4">
          <IconButton
            icon={<RabbitIcon color="#718096" strokeWidth={1.5} size={38} />}
            cardId={cardId}
            iconId="camera"
            onClick={handleNextCard}
          />
          <IconButton
            icon={<Dog color="#718096" strokeWidth={1.5} size={38} />}
            cardId={cardId}
            iconId="mic"
            onClick={handleNextCard}
          />
          <IconButton
            icon={<Turtle color="#718096" strokeWidth={1.5} size={38} />}
            cardId={cardId}
            iconId="paperclip"
            onClick={handleNextCard}
          />
          <IconButton
            icon={<Bug color="#718096" strokeWidth={1.5} size={38} />}
            cardId={cardId}
            iconId="terminal"
            onClick={handleNextCard}
          />
        </Box>
        <Box display="flex" gap="4" mt="4">
          <IconButton
            icon={<Fish color="#718096" strokeWidth={1.5} size={38} />}
            cardId={cardId}
            iconId="camera"
            onClick={handleNextCard}
          />
          <IconButton
            icon={<Rat color="#718096" strokeWidth={1.5} size={38} />}
            cardId={cardId}
            iconId="mic"
            onClick={handleNextCard}
          />
          <IconButton
            icon={<Shrimp color="#718096" strokeWidth={1.5} size={38} />}
            cardId={cardId}
            iconId="paperclip"
            onClick={handleNextCard}
          />
          <IconButton
            icon={<Worm color="#718096" strokeWidth={1.5} size={38} />}
            cardId={cardId}
            iconId="terminal"
            onClick={handleNextCard}
          />
        </Box>
      </>
    )
  }
} 