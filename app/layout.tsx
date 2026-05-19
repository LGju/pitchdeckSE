import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "autofox — AI Vehicle Photography for Dealerships",
  description:
    "Stop losing money on vehicle photography. Studio-quality AI transformations in minutes. Trusted by 3,800+ dealers worldwide.",
  generator: "autofox.ai",
  icons: {
    icon: "/icon.svg",
  },
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} bg-background`}
      style={{ colorScheme: "light" }}
    >
      <body className="bg-background font-sans text-foreground antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
