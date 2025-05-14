'use client'

import React from 'react'
import { Box, useToken, Image, Drawer, Portal, CloseButton, VStack, Icon, Text } from "@chakra-ui/react"
import { useState, useRef, useEffect } from "react"
import { createCardContent, CardContent } from "@/data/cards"
import { Menu, Settings, User, History, LogOut } from 'lucide-react'

const useGrayColor = () => {
  const [gray500] = useToken('colors', ['gray.500'])
  return gray500
}

export default function Home() {
  const gray500 = useGrayColor()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [expandedSpaces, setExpandedSpaces] = useState<{ [key: number]: boolean }>({})

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  const handleNextCard = () => {
    setCards(prev => {
      const newCount = prev.length
      console.log('Current cards:', prev.length)
      console.log('Adding new card with ID:', newCount)
      const nextCard = mockData[newCount % mockData.length]
      return [...prev, {
        ...nextCard,
        id: newCount
      }]
    })
  }

  const handleMoreOptions = (cardId: number) => {
    setExpandedSpaces(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }

  const { mockData, rootCardContent } = createCardContent(gray500, handleMoreOptions, handleNextCard)

  const [cards, setCards] = useState<CardContent[]>([
    { id: 0, ...rootCardContent }
  ])

  useEffect(() => {
    scrollToBottom()
  }, [cards])

  return (
    <>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" height="10vh" borderBottomWidth="0.5px" borderColor={gray500} bg="white" px={4}>
        <Box display="flex" alignItems="center" gap={2}>
          <Image src="/linem-logo.png" alt="Linem Logo" height="32px" />
          <Image src="/linem-text.png" alt="Linem" height="24px" />
        </Box>
        <Drawer.Root open={isDrawerOpen} onOpenChange={(details) => setIsDrawerOpen(details.open)}>
          <Drawer.Trigger asChild>
            <Box as="button" onClick={() => setIsDrawerOpen(true)}>
              <Menu size={24} color={gray500} cursor="pointer" />
            </Box>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Body>
                  <VStack gap={4} align="stretch" mt={4}>
                    <Box display="flex" alignItems="center" gap={3} p={2} cursor="pointer" _hover={{ bg: 'gray.50' }}>
                      <Icon as={User} boxSize={5} color={gray500} />
                      <Text>Profile</Text>
                    </Box>
                    <Box display="flex" alignItems="center" gap={3} p={2} cursor="pointer" _hover={{ bg: 'gray.50' }}>
                      <Icon as={History} boxSize={5} color={gray500} />
                      <Text>History</Text>
                    </Box>
                    <Box display="flex" alignItems="center" gap={3} p={2} cursor="pointer" _hover={{ bg: 'gray.50' }}>
                      <Icon as={Settings} boxSize={5} color={gray500} />
                      <Text>Settings</Text>
                    </Box>
                    <Box display="flex" alignItems="center" gap={3} p={2} cursor="pointer" _hover={{ bg: 'gray.50' }}>
                      <Icon as={LogOut} boxSize={5} color={gray500} />
                      <Text>Logout</Text>
                    </Box>
                  </VStack>
                </Drawer.Body>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" position="absolute" top={2} right={2} />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Box>

      <Box
        ref={containerRef}
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="90vh"
        overflowY="auto"
      >
        {cards.map((card) => (
          <Box key={card.id} display="flex" flexDirection="column" alignItems="center">
            {/* Empty Space */}
            <Box display="flex" justifyContent="center" height="5vh">

            </Box>

            {/* Card */}
            <Box
              p="4"
              borderWidth="2px"
              borderColor={gray500}
              rounded="2xl"
              bg="bg"
              height={expandedSpaces[card.id] ? "40vh" : "70vh"}
              width="90vw"
              transition="height 0.2s"
            >
              <Box display="flex" flexDirection="column" gap="4">
                {card.content}
              </Box>
            </Box>

            {/* Options */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              height={expandedSpaces[card.id] ? "45vh" : "15vh"}
              width="90vw"
              transition="height 0.2s"
            >
              {card.getOptions(card.id)}
              {expandedSpaces[card.id] ?
                card.getMoreOptions(card.id)
                : null}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  )
}