'use client'

import { Box, Center, Text } from "@chakra-ui/react"
import { Camera, Mic, Paperclip, Terminal } from "lucide-react"

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

const terminalIcon = <Box
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
  <Terminal color="var(--chakra-colors-gray-500)" strokeWidth={1.5} size={38} />
</Box>

export default function Home() {
  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      p="4"
    >
      <Center>
        <Box
          p="4"
          m="4"
          borderWidth="2px"
          borderColor="gray.500"
          color="gray.500"
          rounded="2xl"
          width={["90%", "90%", "50%"]}
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

      <Center gap="4">
        {cameraIcon}
        {micIcon}
        {paperclipIcon}
        {terminalIcon}
      </Center>
    </Box>
  )
}