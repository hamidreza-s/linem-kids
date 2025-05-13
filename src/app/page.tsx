'use client'

import React from 'react'
import { Box, useToken } from "@chakra-ui/react"
import { useState, useRef, useEffect } from "react"
import { createCardContent } from "@/data/cards"

const useGrayColor = () => {
  const [gray500] = useToken('colors', ['gray.500'])
  return gray500
}

export default function Home() {
  const gray500 = useGrayColor()
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

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

  const { mockData, rootCardContent } = createCardContent(gray500, handlePromptClick)

  const [cards, setCards] = useState<{ id: number; content: React.ReactNode[]; getOptions: (cardId: number) => React.ReactNode }[]>([
    { id: 0, ...rootCardContent }
  ])

  useEffect(() => {
    scrollToBottom()
  }, [cards])

  return (
    <Box
      ref={containerRef}
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      overflowY="auto"
    >
      {cards.map((card) => (
        <Box key={card.id} display="flex" flexDirection="column" alignItems="center">

          {/* Empty Space */}
          <Box display="flex" justifyContent="center" height="5vh"></Box>

          {/* Card */}
          <Box
            p="4"
            borderWidth="2px"
            borderColor={gray500}
            rounded="2xl"
            bg="bg"
            height="80vh"
            width="90vw"
          >
            <Box display="flex" flexDirection="column" gap="4">
              {card.content}
            </Box>
          </Box>

          {/* Options */}
          <Box display="flex" justifyContent="center" height="15vh">
            {card.getOptions(card.id)}
          </Box>
        </Box>
      ))}
    </Box>
  )
}