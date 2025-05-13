"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ChakraProvider value={defaultSystem}>
        {props.children}
      </ChakraProvider>
    </ThemeProvider>
  )
}