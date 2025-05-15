import React from 'react'
import { Box, Text, VStack, Icon } from "@chakra-ui/react"
import { Bird, Bug, Cat, Dices, Dog, Fish, Panda, RabbitIcon, Rat, Shrimp, Terminal, Turtle, Worm } from "lucide-react"
import { NumberButton, IconButton } from "@/components/ui/buttons"

export type CardContent = {
  id: number;
  content: React.ReactNode[];
  getOptions: (cardId: number) => React.ReactNode;
  getMoreOptions: (cardId: number) => React.ReactNode;
}

export const createCardContent = (gray500: string, handleMoreOptions: (cardId: number, level: number) => void, handleNextCard: () => void) => {
  const promptSuggestions = [
    "Describe the emotional impact of this scene",
    "Analyze the composition and visual elements"
  ]

  const createMoreOptions = (cardId: number) => (
    <VStack w="100%" alignItems="stretch">
      {promptSuggestions.map((suggestion, index) => (
        <Box
          key={`card${cardId}-suggestion-${index}`}
          borderWidth="2px"
          borderColor={gray500}
          rounded="2xl"
          bg="bg"
          color={gray500}
          justifyContent="flex-start"
          _hover={{ bg: 'gray.50' }}
          onClick={() => handleNextCard()}
          px={4}
          py={2}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Icon as={Terminal} boxSize={4} flexShrink={0} />
            <Box overflow="auto" flex={1}>
              <Text fontSize="sm" whiteSpace="nowrap">{suggestion}</Text>
            </Box>
          </Box>
        </Box>
      ))}
    </VStack>
  )

  const mockData: CardContent[] = [
    {
      id: 0,
      content: [
        <Box key="card0-item0" display="flex" alignItems="center" gap="4">
          <Text color="fg">There is gonna be a picture here</Text>
        </Box>
      ],
      getOptions: (cardId: number) => (
        <Box display="flex" gap="4" mt="4" mb="4">
          <NumberButton number={1} cardId={cardId} onClick={() => handleNextCard()} />
          <NumberButton number={2} cardId={cardId} onClick={() => handleNextCard()} />
          <NumberButton number={3} cardId={cardId} onClick={() => handleNextCard()} />
          <IconButton
            icon={<Terminal color={gray500} strokeWidth={1.5} size={38} />}
            cardId={cardId}
            iconId="terminal"
            onClick={() => handleMoreOptions(cardId, 1)}
          />
        </Box>
      ),
      getMoreOptions: createMoreOptions
    }
  ]

  const rootCardContent: Omit<CardContent, 'id'> = {
    content: [
      <Box key="root-item0" display="flex" alignItems="center" gap="4">
        <Text color="fg">Pick your favorite animal</Text>
      </Box>
    ],
    getOptions: (cardId: number) => (
      <Box display="flex" gap="4" mt="4">
        <IconButton
          icon={<Cat color={gray500} strokeWidth={1.5} size={38} />}
          cardId={cardId}
          iconId="camera"
          onClick={() => handleNextCard()}
        />
        <IconButton
          icon={<Bird color={gray500} strokeWidth={1.5} size={38} />}
          cardId={cardId}
          iconId="mic"
          onClick={() => handleNextCard()}
        />
        <IconButton
          icon={<Panda color={gray500} strokeWidth={1.5} size={38} />}
          cardId={cardId}
          iconId="paperclip"
          onClick={() => handleNextCard()}
        />
        <IconButton
          icon={<Dices color={gray500} strokeWidth={1.5} size={38} />}
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
            icon={<RabbitIcon color={gray500} strokeWidth={1.5} size={38} />}
            cardId={cardId}
            iconId="camera"
            onClick={() => handleNextCard()}
          />
          <IconButton
            icon={<Dog color={gray500} strokeWidth={1.5} size={38} />}
            cardId={cardId}
            iconId="mic"
            onClick={() => handleNextCard()}
          />
          <IconButton
            icon={<Turtle color={gray500} strokeWidth={1.5} size={38} />}
            cardId={cardId}
            iconId="paperclip"
            onClick={() => handleNextCard()}
          />
          <IconButton
            icon={<Bug color={gray500} strokeWidth={1.5} size={38} />}
            cardId={cardId}
            iconId="terminal"
            onClick={() => handleMoreOptions(cardId, 1)}
          />
        </Box>
        <Box display="flex" gap="4" mt="4">
          <IconButton
            icon={<Fish color={gray500} strokeWidth={1.5} size={38} />}
            cardId={cardId}
            iconId="camera"
            onClick={() => handleNextCard()}
          />
          <IconButton
            icon={<Rat color={gray500} strokeWidth={1.5} size={38} />}
            cardId={cardId}
            iconId="mic"
            onClick={() => handleNextCard()}
          />
          <IconButton
            icon={<Shrimp color={gray500} strokeWidth={1.5} size={38} />}
            cardId={cardId}
            iconId="paperclip"
            onClick={() => handleNextCard()}
          />
          <IconButton
            icon={<Worm color={gray500} strokeWidth={1.5} size={38} />}
            cardId={cardId}
            iconId="terminal"
            onClick={() => handleMoreOptions(cardId, 1)}
          />
        </Box>
      </>
    )
  }

  return { mockData, rootCardContent }
} 