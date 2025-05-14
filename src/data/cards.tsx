import React from 'react'
import { Box, Text, VStack, Icon } from "@chakra-ui/react"
import { Camera, Mic, Paperclip, Terminal } from "lucide-react"
import { NumberButton, IconButton } from "@/components/ui/buttons"

export type CardContent = {
  id: number;
  content: React.ReactNode[];
  getOptions: (cardId: number) => React.ReactNode;
  getMoreOptions: (cardId: number) => React.ReactNode;
}

export const createCardContent = (gray500: string, handleMoreOptions: (cardId: number) => void, handleNextCard: () => void) => {
  const promptSuggestions = [
    "Describe the emotional impact of this scene",
    "Analyze the composition and visual elements",
    "Identify the key subjects and their relationships",
    "Explain the historical or cultural context"
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
          <Camera color={gray500} strokeWidth={1.5} size={42} />
          <Text color="fg">Analyze this image and provide key insights</Text>
        </Box>,
        <Box key="card0-item1" display="flex" alignItems="center" gap="4">
          <Terminal color={gray500} strokeWidth={1.5} size={42} />
          <Text color="fg">Generate a detailed description of this scene</Text>
        </Box>,
        <Box key="card0-item2" display="flex" alignItems="center" gap="4">
          <Paperclip color={gray500} strokeWidth={1.5} size={42} />
          <Text color="fg">Identify objects and their relationships in this image</Text>
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
            onClick={() => handleMoreOptions(cardId)}
          />
        </Box>
      ),
      getMoreOptions: createMoreOptions
    },
    {
      id: 1,
      content: [
        <Box key="card1-item0" display="flex" alignItems="center" gap="4">
          <Mic color={gray500} strokeWidth={1.5} size={42} />
          <Text color="fg">What&apos;s the mood of this photograph?</Text>
        </Box>,
        <Box key="card1-item1" display="flex" alignItems="center" gap="4">
          <Camera color={gray500} strokeWidth={1.5} size={42} />
          <Text color="fg">Describe the lighting and composition</Text>
        </Box>,
        <Box key="card1-item2" display="flex" alignItems="center" gap="4">
          <Terminal color={gray500} strokeWidth={1.5} size={42} />
          <Text color="fg">What story does this image tell?</Text>
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
            onClick={() => handleMoreOptions(cardId)}
          />
        </Box>
      ),
      getMoreOptions: createMoreOptions
    },
    {
      id: 2,
      content: [
        <Box key="card2-item0" display="flex" alignItems="center" gap="4">
          <Paperclip color={gray500} strokeWidth={1.5} size={42} />
          <Text color="fg">What&apos;s the historical context of this scene?</Text>
        </Box>,
        <Box key="card2-item1" display="flex" alignItems="center" gap="4">
          <Camera color={gray500} strokeWidth={1.5} size={42} />
          <Text color="fg">Describe the textures and materials</Text>
        </Box>,
        <Box key="card2-item2" display="flex" alignItems="center" gap="4">
          <Mic color={gray500} strokeWidth={1.5} size={42} />
          <Text color="fg">What cultural elements are present?</Text>
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
            onClick={() => handleMoreOptions(cardId)}
          />
        </Box>
      ),
      getMoreOptions: createMoreOptions
    },
    {
      id: 3,
      content: [
        <Box key="card3-item0" display="flex" alignItems="center" gap="4">
          <Terminal color={gray500} strokeWidth={1.5} size={42} />
          <Text color="fg">What&apos;s happening outside the frame?</Text>
        </Box>,
        <Box key="card3-item1" display="flex" alignItems="center" gap="4">
          <Paperclip color={gray500} strokeWidth={1.5} size={42} />
          <Text color="fg">Describe the textures and materials</Text>
        </Box>,
        <Box key="card3-item2" display="flex" alignItems="center" gap="4">
          <Camera color={gray500} strokeWidth={1.5} size={42} />
          <Text color="fg">What&apos;s the focal point of this image?</Text>
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
            onClick={() => handleMoreOptions(cardId)}
          />
        </Box>
      ),
      getMoreOptions: createMoreOptions
    }
  ]

  const rootCardContent: Omit<CardContent, 'id'> = {
    content: [
      <Box key="root-item0" display="flex" alignItems="center" gap="4">
        <Camera color={gray500} strokeWidth={1.5} size={42} />
        <Text color="fg">Take a photo to start with</Text>
      </Box>,
      <Box key="root-item1" display="flex" alignItems="center" gap="4">
        <Mic color={gray500} strokeWidth={1.5} size={42} />
        <Text color="fg">Record audio as a context</Text>
      </Box>,
      <Box key="root-item2" display="flex" alignItems="center" gap="4">
        <Paperclip color={gray500} strokeWidth={1.5} size={42} />
        <Text color="fg">Maybe a document or a file</Text>
      </Box>,
      <Box key="root-item3" display="flex" alignItems="center" gap="4">
        <Terminal color={gray500} strokeWidth={1.5} size={42} />
        <Text color="fg">Get more prompt suggestions</Text>
      </Box>
    ],
    getOptions: (cardId: number) => (
      <Box display="flex" gap="4" mt="4" mb="4">
        <IconButton
          icon={<Camera color={gray500} strokeWidth={1.5} size={38} />}
          cardId={cardId}
          iconId="camera"
          onClick={() => handleNextCard()}
        />
        <IconButton
          icon={<Mic color={gray500} strokeWidth={1.5} size={38} />}
          cardId={cardId}
          iconId="mic"
          onClick={() => handleNextCard()}
        />
        <IconButton
          icon={<Paperclip color={gray500} strokeWidth={1.5} size={38} />}
          cardId={cardId}
          iconId="paperclip"
          onClick={() => handleNextCard()}
        />
        <IconButton
          icon={<Terminal color={gray500} strokeWidth={1.5} size={38} />}
          cardId={cardId}
          iconId="terminal"
          onClick={() => handleMoreOptions(cardId)}
        />
      </Box>
    ),
    getMoreOptions: (cardId: number) => (
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
  }

  return { mockData, rootCardContent }
} 