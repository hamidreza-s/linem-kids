'use client'

import React from 'react'
import { Box, Center, Text, useToken } from "@chakra-ui/react"
import { Camera, Mic, Paperclip, Terminal } from "lucide-react"
import { useState, useRef, useEffect } from "react"

const useGrayColor = () => {
  const [gray500] = useToken('colors', ['gray.500'])
  return gray500
}

export default function Home() {
  const gray500 = useGrayColor()
  const containerRef = useRef<HTMLDivElement>(null)

  const numberButton = (number: number, cardId: number) => (
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
      borderColor={gray500}
      bg="bg"
      cursor="pointer"
      _hover={{ bg: 'bg.subtle' }}
      _active={{ bg: 'bg.muted' }}
    >
      <Text color={gray500} fontSize="xl" fontWeight="bold">{number}</Text>
    </Box>
  )

  const iconButton = (icon: React.ReactNode, cardId: number, iconId: string, onClick?: () => void) => (
    <Box
      key={`card${cardId}-icon-${iconId}`}
      as="button"
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="64px"
      height="64px"
      borderRadius="full"
      border="2px solid"
      borderColor={gray500}
      bg="bg"
      cursor="pointer"
      _hover={{ bg: 'bg.subtle' }}
      _active={{ bg: 'bg.muted' }}
      onClick={onClick}
    >
      {icon}
    </Box>
  )

  const rootCardContent = {
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
      <Center gap="4" mt="4" mb="4">
        {iconButton(<Camera color={gray500} strokeWidth={1.5} size={38} />, cardId, 'camera')}
        {iconButton(<Mic color={gray500} strokeWidth={1.5} size={38} />, cardId, 'mic')}
        {iconButton(<Paperclip color={gray500} strokeWidth={1.5} size={38} />, cardId, 'paperclip')}
        {iconButton(<Terminal color={gray500} strokeWidth={1.5} size={38} />, cardId, 'terminal', handlePromptClick)}
      </Center>
    )
  }

  const [cards, setCards] = useState<{ id: number; content: React.ReactNode[]; getOptions: (cardId: number) => React.ReactNode }[]>([
    { id: 0, ...rootCardContent }
  ])

  const handlePromptClick = () => {
    setCards(prev => {
      const newCount = prev.length
      console.log('Current cards:', prev.length)
      console.log('Adding new card with ID:', newCount)
      return [...prev, {
        id: newCount,
        ...mockData[newCount % mockData.length]
      }]
    })
  }

  useEffect(() => {
    scrollToBottom()
  }, [cards])

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  const mockData = [
    {
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
        <Center gap="4" mt="4" mb="4">
          {numberButton(1, cardId)}
          {numberButton(2, cardId)}
          {numberButton(3, cardId)}
          {iconButton(<Terminal color={gray500} strokeWidth={1.5} size={38} />, cardId, 'terminal', handlePromptClick)}
        </Center>
      )
    },
    {
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
        <Center gap="4" mt="4" mb="4">
          {numberButton(1, cardId)}
          {numberButton(2, cardId)}
          {numberButton(3, cardId)}
          {iconButton(<Terminal color={gray500} strokeWidth={1.5} size={38} />, cardId, 'terminal', handlePromptClick)}
        </Center>
      )
    },
    {
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
        <Center gap="4" mt="4" mb="4">
          {numberButton(1, cardId)}
          {numberButton(2, cardId)}
          {numberButton(3, cardId)}
          {iconButton(<Terminal color={gray500} strokeWidth={1.5} size={38} />, cardId, 'terminal', handlePromptClick)}
        </Center>
      )
    },
    {
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
        <Center gap="4" mt="4" mb="4">
          {numberButton(1, cardId)}
          {numberButton(2, cardId)}
          {numberButton(3, cardId)}
          {iconButton(<Terminal color={gray500} strokeWidth={1.5} size={38} />, cardId, 'terminal', handlePromptClick)}
        </Center>
      )
    },
    {
      content: [
        <Box key="card4-item0" display="flex" alignItems="center" gap="4">
          <Mic color={gray500} strokeWidth={1.5} size={42} />
          <Text color="fg">What&apos;s the mood of this photograph?</Text>
        </Box>,
        <Box key="card4-item1" display="flex" alignItems="center" gap="4">
          <Terminal color={gray500} strokeWidth={1.5} size={42} />
          <Text color="fg">Analyze the balance and symmetry</Text>
        </Box>,
        <Box key="card4-item2" display="flex" alignItems="center" gap="4">
          <Camera color={gray500} strokeWidth={1.5} size={42} />
          <Text color="fg">What&apos;s happening outside the frame?</Text>
        </Box>
      ],
      getOptions: (cardId: number) => (
        <Center gap="4" mt="4" mb="4">
          {numberButton(1, cardId)}
          {numberButton(2, cardId)}
          {numberButton(3, cardId)}
          {iconButton(<Terminal color={gray500} strokeWidth={1.5} size={38} />, cardId, 'terminal', handlePromptClick)}
        </Center>
      )
    }
  ]

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
      {/* Prompt Suggestions Cards */}
      {cards.map((card) => (
        <Box key={card.id} width="100%" display="flex" flexDirection="column" alignItems="center">
          <Center mt="4">
            <Box
              p="4"
              m="4"
              borderWidth="2px"
              borderColor={gray500}
              color="fg"
              rounded="2xl"
              width={["90%", "90%", "95%", "95%"]}
              height={["calc(70vh)"]}
              bg="bg"
            >
              {card.id === 0 ? (
                <Box display="flex" flexDirection="column" gap="4">
                  {card.content}
                </Box>
              ) : (
                <>
                  <Text fontSize="lg" fontWeight="medium" mb="4">{card.id}st Card - Prompt Suggestions</Text>
                  <Box display="flex" flexDirection="column" gap="4">
                    {card.content}
                  </Box>
                </>
              )}
            </Box>
          </Center>

          {card.getOptions(card.id)}
        </Box>
      ))}
    </Box>
  )
}