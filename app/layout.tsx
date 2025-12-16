import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IAM: The Awakening - Side-Scroller Platformer',
  description: 'Play as I Am, restore balance to the world in this Mario-style platformer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}

