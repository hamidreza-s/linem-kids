'use client'

import React from 'react'
import { Box, useToken, Image, Drawer, Portal, CloseButton, VStack, Icon, Text } from "@chakra-ui/react"
import { useState, useRef, useEffect } from "react"
import { createRootCardContent, CardContent } from "@/data/cards"
import { Menu, Settings, User, History, LogOut, VolumeOff, Volume2, Plus } from 'lucide-react'
import { getHeightForLevel } from "@/utils/card-helpers"
import { getShuffledOptions } from '@/utils/card-options'
import dynamic from 'next/dynamic'

const useGrayColor = () => {
  const [gray500] = useToken('colors', ['gray.500'])
  return gray500
}

const Home = () => {
  const gray500 = useGrayColor()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [expansionLevels, setExpansionLevels] = useState<{ [key: number]: number }>({})
  const [options, setOptions] = useState<{ index: number; emoji: string }[]>(getShuffledOptions(11))

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
      return [...prev, {
        id: newCount,
        ...rootCardContent
      }]
    })
  }

  const handleMoreOptions = (cardId: number, level: number) => {
    setExpansionLevels(prev => {
      const currentLevel = prev[cardId] || 0;
      // If we're already at the specified level, collapse back to 0
      if (currentLevel === level) {
        return {
          ...prev,
          [cardId]: 0
        };
      }
      // Otherwise, set to the specified level
      return {
        ...prev,
        [cardId]: level
      };
    });
  };

  const rootCardContent = createRootCardContent(handleMoreOptions, handleNextCard, options)

  const [cards, setCards] = useState<CardContent[]>([
    { id: 0, ...createRootCardContent(handleMoreOptions, handleNextCard, options) }
  ])

  useEffect(() => {
    scrollToBottom()
  }, [cards])

  return (
    <>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" height="10vh" borderBottomWidth="0.5px" borderColor={gray500} bg="white" px={4}>

        {/* Logo */}
        <Box display="flex" alignItems="center" gap={2}>
          <Image src="/linem-logo.png" alt="Linem Logo" height="32px" />
          <Image src="/linem-text.png" alt="Linem" height="24px" />
          <Text>For Kids</Text>
        </Box>

        {/* Controls */}
        <Box display="flex" gap={4} ml="auto" mr={4}>
          {/* Volume Off/On */}
          <Box
            as="button"
            onClick={() => setIsMuted(!isMuted)}

            opacity={isMuted ? 0.5 : 1}
            transition="opacity 0.2s"
          >
            {isMuted ? (
              <VolumeOff size={24} color={gray500} cursor="pointer" />
            ) : (
              <Volume2 size={24} color={gray500} cursor="pointer" />
            )}
          </Box>
          {/* New Card */}
          <Box as="button" onClick={() => console.log('New Card')}>
            <Plus size={24} color={gray500} cursor="pointer" />
          </Box>
        </Box>

        {/* Drawer */}
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
        {cards.map((card) => {
          const currentExpansionLevel = expansionLevels[card.id] || 0;
          const heights = getHeightForLevel(currentExpansionLevel);
          return (
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
                height={heights.cardHeight}
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
                height={heights.optionsHeight}
                width="90vw"
                transition="height 0.2s"
              >
                {card.getOptions(card.id)}
                {currentExpansionLevel > 0 && card.getMoreOptions(card.id)}
              </Box>
            </Box>
          )
        })}
      </Box>
    </>
  )
}

export default dynamic(() => Promise.resolve(Home), { ssr: false })