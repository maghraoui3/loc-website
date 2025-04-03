import type React from "react"
import type { Metadata } from "next"
import { Orbitron } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { UserProvider } from "@/contexts/user-context"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

export const metadata: Metadata = {
  title: "League of Coders (LoC) - Compete, Code, Conquer!",
  description: "Join the League of Coders event on April 19-20, 2025, at ISIMS. Compete, network, and win prizes!",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${orbitron.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <UserProvider>{children}</UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'