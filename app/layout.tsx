import './globals.css'
import type { Metadata } from 'next'
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: {
    default: "Food Park POS | Modern Restaurant Management System",
    template: "%s | Food Park POS",
  },
  description:
    "A comprehensive point of sale and management system for restaurants, cafes, and food service businesses.",
  keywords: ["restaurant POS", "food service management", "table reservations", "restaurant accounting", "food park"],
  authors: [{ name: "Food Park Team" }],
  creator: "Food Park",
  publisher: "Food Park Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://restaurant.sohamdatta.com/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Food Park POS System",
    description: "Modern restaurant management with POS, reservations, and financial analytics",
    url: "https://restaurant.sohamdatta.com/",
    siteName: "Food Park POS",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Food Park POS System Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Food Park POS System",
    description: "Modern restaurant management with POS, reservations, and financial analytics",
    creator: "@foodparkpos",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  category: "Business Software",
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
