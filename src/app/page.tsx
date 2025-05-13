'use client'

import { Box, Center, Text } from "@chakra-ui/react"
import { Camera, Mic, Paperclip, Terminal } from "lucide-react"
import { useState, useRef, useEffect } from "react"

const cameraIcon = <Box
  as="button"
  display="flex"
  alignItems="center"
  justifyContent="center"
  width="64px"
  height="64px"
  borderRadius="full"
  border="2px solid"
  borderColor="gray.500"
  bg="white"
  cursor="pointer"
  _hover={{ bg: 'gray.200' }}
  _active={{ bg: 'gray.100' }}
>
  <Camera color="var(--chakra-colors-gray-500)" strokeWidth={1.5} size={38} />
</Box>

const micIcon = <Box
  as="button"
  display="flex"
  alignItems="center"
  justifyContent="center"
  width="64px"
  height="64px"
  borderRadius="full"
  border="2px solid"
  borderColor="gray.500"
  bg="white"
  cursor="pointer"
  _hover={{ bg: 'gray.200' }}
  _active={{ bg: 'gray.100' }}
>
  <Mic color="var(--chakra-colors-gray-500)" strokeWidth={1.5} size={38} />
</Box>

const paperclipIcon = <Box
  as="button"
  display="flex"
  alignItems="center"
  justifyContent="center"
  width="64px"
  height="64px"
  borderRadius="full"
  border="2px solid"
  borderColor="gray.500"
  bg="white"
  cursor="pointer"
  _hover={{ bg: 'gray.200' }}
  _active={{ bg: 'gray.100' }}
>
  <Paperclip color="var(--chakra-colors-gray-500)" strokeWidth={1.5} size={38} />
</Box>

const promptIcon = (onClick: () => void) => (
  <Box
    as="button"
    display="flex"
    alignItems="center"
    justifyContent="center"
    width="64px"
    height="64px"
    borderRadius="full"
    border="2px solid"
    borderColor="gray.500"
    bg="white"
    cursor="pointer"
    _hover={{ bg: 'gray.200' }}
    _active={{ bg: 'gray.100' }}
    onClick={onClick}
  >
    <Terminal color="var(--chakra-colors-gray-500)" strokeWidth={1.5} size={38} />
  </Box>
)

const numberButton = (number: number) => (
  <Box
    as="button"
    display="flex"
    alignItems="center"
    justifyContent="center"
    width="64px"
    height="64px"
    borderRadius="full"
    border="2px solid"
    borderColor="gray.500"
    bg="white"
    cursor="pointer"
    _hover={{ bg: 'gray.200' }}
    _active={{ bg: 'gray.100' }}
  >
    <Text color="gray.500" fontSize="xl" fontWeight="bold">{number}</Text>
  </Box>
)

const suggestions = [
  [
    "Analyze this image and provide key insights",
    "Generate a detailed description of this scene",
    "Identify objects and their relationships in this image"
  ],
  [
    "What emotions does this image convey?",
    "Describe the lighting and composition",
    "What story does this image tell?"
  ],
  [
    "What are the main colors and their impact?",
    "Analyze the perspective and depth",
    "What cultural elements are present?"
  ],
  [
    "What's the historical context of this scene?",
    "Describe the textures and materials",
    "What's the focal point of this image?"
  ],
  [
    "What's the mood of this photograph?",
    "Analyze the balance and symmetry",
    "What's happening outside the frame?"
  ]
]

export default function Home() {
  const [cardCount, setCardCount] = useState(0)
  const [cards, setCards] = useState<{ id: number; suggestions: string[] }[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [cards])

  const handlePromptClick = () => {
    const newCount = cardCount + 1
    setCardCount(newCount)
    setCards(prev => [...prev, {
      id: newCount,
      suggestions: suggestions[newCount % suggestions.length]
    }])
  }

  return (
    <Box
      ref={containerRef}
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      p="4"
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxH="100vh"
      overflowY="auto"
    >
      {/* Root Card */}
      <Center>
        <Box
          p="4"
          m="4"
          borderWidth="2px"
          borderColor="gray.500"
          color="gray.500"
          rounded="2xl"
          width={["90%", "90%", "95%", "95%"]}
          bg="white"
        >
          <Box display="flex" flexDirection="column" gap="4">
            <Box display="flex" alignItems="center" gap="4">
              <Camera color="var(--chakra-colors-gray-500)" strokeWidth={1.5} size={42} />
              <Text color="gray.500">Take a photo to start with</Text>
            </Box>

            <Box display="flex" alignItems="center" gap="4">
              <Mic color="var(--chakra-colors-gray-500)" strokeWidth={1.5} size={42} />
              <Text color="gray.500">Record audio as a context</Text>
            </Box>

            <Box display="flex" alignItems="center" gap="4">
              <Paperclip color="var(--chakra-colors-gray-500)" strokeWidth={1.5} size={42} />
              <Text color="gray.500">Maybe a document or a file</Text>
            </Box>

            <Box display="flex" alignItems="center" gap="4">
              <Terminal color="var(--chakra-colors-gray-500)" strokeWidth={1.5} size={42} />
              <Text color="gray.500">Get more prompt suggestions</Text>
            </Box>
          </Box>
        </Box>
      </Center>

      {/* Root Options */}
      <Center gap="4">
        {cameraIcon}
        {micIcon}
        {paperclipIcon}
        {promptIcon(handlePromptClick)}
      </Center>

      {/* Prompt Suggestions Cards */}
      {cards.map((card) => (
        <Box key={card.id} width="100%" display="flex" flexDirection="column" alignItems="center">
          <Center mt="4">
            <Box
              p="4"
              m="4"
              borderWidth="2px"
              borderColor="gray.500"
              color="gray.500"
              rounded="2xl"
              width={["90%", "90%", "95%", "95%"]}
              bg="white"
            >
              <Text fontSize="lg" fontWeight="medium" mb="4">{card.id}st Card - Prompt Suggestions</Text>
              <Box display="flex" flexDirection="column" gap="4">
                {card.suggestions.map((suggestion, i) => (
                  <Box key={i} display="flex" alignItems="center" gap="4">
                    <Text color="gray.500" fontWeight="bold">{i + 1}.</Text>
                    <Text color="gray.500">{suggestion}</Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Center>

          {/* Options Row */}
          <Center gap="4" mt="4" mb="4">
            {numberButton(1)}
            {numberButton(2)}
            {numberButton(3)}
            {promptIcon(handlePromptClick)}
          </Center>
        </Box>
      ))}
    </Box>
  )
}