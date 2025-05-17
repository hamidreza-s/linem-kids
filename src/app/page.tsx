'use client'

import React from 'react'
import { Box, useToken, Image, Drawer, Portal, CloseButton, VStack, Icon, Text } from "@chakra-ui/react"
import { useState, useRef, useEffect, useCallback } from "react"
import { createCard, CardContent } from "@/data/cards"
import { Menu, Settings, User, History, LogOut, VolumeOff, Volume2, Plus } from 'lucide-react'
import { getShuffledOptions, Option } from '@/utils/card-options'
import dynamic from 'next/dynamic'
import { Spinner } from '@/components/ui/spinner'


const initialImage = "https://ga4qgrohzaj2x9di.public.blob.vercel-storage.com/linem-for-kids/card-0-intro-1-F0xesiZnHkaDyuoSTfTr04AHEr62LK.jpg"
const initialContent = [
  <>
    <Image src={initialImage} alt="Initial Image" height="70vh" objectFit="contain" rounded="2xl" />
  </>
]
const initialOptions = getShuffledOptions(11)

const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

const useGrayColor = () => {
  const [gray500] = useToken('colors', ['gray.500'])
  return gray500
}

const Home = () => {
  const gray500 = useGrayColor()
  const containerRef = useRef<HTMLDivElement>(null)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [expansionLevels, setExpansionLevels] = useState<{ [key: string]: number }>({})
  const [clientId] = useState(() => Math.random().toString(36).substring(2, 15))
  const [cards, setCards] = useState<CardContent[]>([])
  const [pendingRequest, setPendingRequest] = useState<{
    id: string;
    option: Option;
    sourceImage: string;
  } | null>(null)

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  // Forward declare the types
  type CardClickHandler = (cardId: string, option?: Option) => void;
  type NextCardHandler = (selectedOption?: Option, sourceImage?: string) => Promise<void>;

  // Create refs to store the handlers
  const handleCardClickRef = useRef<CardClickHandler | null>(null);
  const handleNextCardRef = useRef<NextCardHandler | null>(null);

  const handleMoreOptions = useCallback((cardId: string, level: number) => {
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
  }, []);

  // Define handleNextCard first
  handleNextCardRef.current = async (selectedOption?: Option, sourceImage?: string) => {
    if (!selectedOption) return;

    const newId = generateUniqueId();
    const newOptions = getShuffledOptions(11);

    // Create a temporary card with loading state
    const tempContent = [
      <Spinner key="loading-spinner" />
    ];

    // Add the temporary card with spinner
    const tempCard = createCard(newId, tempContent, sourceImage || initialImage, newOptions, handleCardClickRef.current!);
    
    setCards(prev => {
      // Remove any existing temporary cards
      const filteredCards = prev.filter(card => !card.content.some(content => 
        React.isValidElement(content) && content.key?.toString().startsWith('loading-')
      ));
      return [...filteredCards, tempCard];
    });

    // Set the pending request instead of making the API call directly
    setPendingRequest({
      id: newId,
      option: selectedOption,
      sourceImage: sourceImage || initialImage
    });
  };

  // Then define handleCardClick
  handleCardClickRef.current = (cardId: string, option?: Option) => {
    if (!option) {
      handleMoreOptions(cardId, 1)
    } else {
      const clickedCard = cards.find(card => card.id === cardId);
      if (clickedCard) {
        handleNextCardRef.current!(option, clickedCard.image);
      }
    }
  };

  // Create stable callbacks for use in effects and event handlers
  const handleCardClick = useCallback<CardClickHandler>((cardId, option) => {
    handleCardClickRef.current?.(cardId, option);
  }, []);

  const handleNextCard = useCallback<NextCardHandler>(async (selectedOption, sourceImage) => {
    await handleNextCardRef.current?.(selectedOption, sourceImage);
  }, []);

  // Handle API calls in useEffect
  useEffect(() => {
    const fetchGeneratedImage = async () => {
      if (!pendingRequest) return;

      try {
        console.log('Calling API for option:', pendingRequest.option.verb, 'with image:', pendingRequest.sourceImage);
        const url = `/api/edit?session=${clientId}&prompt=${encodeURIComponent(pendingRequest.option.verb)}&image=${pendingRequest.sourceImage}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data?.[0]?.url) {
          const newContent = [
            <>
              <Image src={data[0].url} alt="Generated Image" objectFit="contain"  height="70vh" rounded="2xl"/>
            </>
          ];

          // Update the card with the new content
          setCards(prev => {
            const updatedCards = [...prev];
            const cardIndex = updatedCards.findIndex(card => card.id === pendingRequest.id);
            if (cardIndex !== -1) {
              updatedCards[cardIndex] = createCard(
                pendingRequest.id,
                newContent,
                data[0].url,
                getShuffledOptions(11),
                handleCardClick
              );
            }
            return updatedCards;
          });
        }
      } catch (error) {
        console.error('Error fetching generated image:', error);
      } finally {
        setPendingRequest(null);
      }
    };

    fetchGeneratedImage();
  }, [pendingRequest, clientId, handleCardClick]);

  // Initialize the first card
  useEffect(() => {
    setCards([createCard(generateUniqueId(), initialContent, initialImage, initialOptions, handleCardClick)]);
  }, [handleCardClick]);

  useEffect(() => {
    scrollToBottom()
  }, [cards])

  return (
    <>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" height="10vh" borderBottomWidth="0.5px" borderColor={gray500} bg="white" px={4}>

        {/* Logo */}
        <Box display="flex" alignItems="center" gap={2}>
          <Image src="/linem-logo.png" alt="Linem Logo" height="54px" />
          <Image src="/linem-text.png" alt="Linem" height="24px" />
          <Text>Kids</Text>
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
        width="90vw"
        marginX="auto"
        overflowY="auto"
      >
        {cards.map((card) => {
          return (
            <Box key={card.id} display="flex" flexDirection="column" alignItems="center">
              {/* Empty Space */}
              <Box display="flex" justifyContent="center" height="5vh">
              </Box>

              {/* Card */}
              <Box
                height="70vh"
                width="90vw"
                transition="height 0.2s"
                display="flex"
                flexDirection="column"
              >
                <Box display="flex" flexDirection="column" flex="1">
                  {card.content}
                </Box>
              </Box>

              {/* Options */}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                height="15vh"
                width="90vw"
                transition="height 0.2s"
                overflow="hidden"
              >
                {card.getOptions(card.id)}
              </Box>
            </Box>
          )
        })}
      </Box>
    </>
  )
}

export default dynamic(() => Promise.resolve(Home), { ssr: false })