'use client'

import { Box, Center, IconButton, Text } from "@chakra-ui/react"
import { Camera, Mic, Paperclip, Terminal } from "lucide-react"

const cameraIcon = <IconButton
  aria-label="Call support"
  rounded="full"
  size="2xl"
  variant="outline"
  colorScheme="gray"
  borderWidth="1.5px"
>
  <Camera color="oklch(43.9% 0 0)" strokeWidth={1.5} />
</IconButton>

const micIcon = <IconButton
  aria-label="Call support"
  rounded="full"
  size="2xl"
  variant="outline"
  colorScheme="gray"
  borderWidth="1.5px">
  <Mic color="oklch(43.9% 0 0)" strokeWidth={1.5} />
</IconButton>

const paperclipIcon = <IconButton
  aria-label="Call support"
  rounded="full"
  size="2xl"
  variant="outline"
  colorScheme="gray"
  borderWidth="1.5px">
  <Paperclip color="oklch(43.9% 0 0)" strokeWidth={1.5} />
</IconButton>

const terminalIcon = <IconButton
  aria-label="Call support"
  rounded="full"
  size="2xl"
  variant="outline"
  colorScheme="gray"
  borderWidth="1.5px"
>
  <Terminal color="oklch(43.9% 0 0)" strokeWidth={1.5} />
</IconButton>


export default function Home() {
  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      p="4"
      bg="white"
    >
      <Center>
        <Box
          p="4"
          m="4"
          borderWidth="1.5px"
          borderColor="border.disabled"
          color="fg.disabled"
          rounded="2xl"
          width={["90%", "90%", "50%"]}
        >
          <Box display="flex" flexDirection="column" gap="4">
            <Box display="flex" alignItems="center" gap="4">
              <Camera color="oklch(43.9% 0 0)" strokeWidth={1.5} size={42} />
              <Text>Take a photo to start with</Text>
            </Box>

            <Box display="flex" alignItems="center" gap="4">
              <Mic color="oklch(43.9% 0 0)" strokeWidth={1.5} size={42} />
              <Text>Record audio as a context</Text>
            </Box>

            <Box display="flex" alignItems="center" gap="4">
              <Paperclip color="oklch(43.9% 0 0)" strokeWidth={1.5} size={42} />
              <Text>Maybe a document or a file</Text>
            </Box>

            <Box display="flex" alignItems="center" gap="4">
              <Terminal color="oklch(43.9% 0 0)" strokeWidth={1.5} size={42} />
              <Text>Get more prompt suggestions</Text>
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