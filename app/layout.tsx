import type React from "react"
import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import WhatsAppButton from "@/components/shared/whatsapp-button"
import ChatWidget from "@/components/shared/chat-widget"
import { AuthProvider } from "@/lib/hooks/use-auth"

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "PrimeCrest Realties | Modern Classy Real Estate",
  description: "Exquisite residential and commercial properties curated for the discerning investor.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${raleway.variable} font-sans antialiased selection:bg-accent selection:text-accent-foreground`}
      >
        <AuthProvider>
          {children}
          <WhatsAppButton />
          <ChatWidget />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
