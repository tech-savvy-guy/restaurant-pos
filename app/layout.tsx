import './globals.css'
import type { Metadata } from 'next'
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: 'Restaurant PoS',
  description: 'Created by Soham Datta',
  generator: 'tech-savvy-guy',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className} suppressHydrationWarning>{children}</body>
    </html>
  )
}
