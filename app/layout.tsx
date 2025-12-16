import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IAM QUEST - Divine Hero Adventure',
  description: 'Explore zones, complete quests, and collect IAM tokens',
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

