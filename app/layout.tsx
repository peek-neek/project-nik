import type { Metadata } from "next"
import {
  DM_Mono,
  Inter,
  Instrument_Serif,
  League_Gothic,
} from "next/font/google"

import "./globals.css"
import { MotionProvider } from "@/components/motion-provider"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ThemeProvider } from "@/components/theme-provider"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const display = League_Gothic({
  subsets: ["latin"],
  variable: "--font-display",
})

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
})

const fontMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: `${site.intro} ${site.location.city}. ${site.availability.label} ${site.availability.period}.`,
}

const accentScript = `try{var a=localStorage.getItem("accent");if(a&&a!=="blue")document.documentElement.dataset.accent=a}catch(e){}`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        display.variable,
        serif.variable,
        "font-sans",
        inter.variable
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: accentScript }} />
      </head>
      <body>
        <ThemeProvider defaultTheme="light">
          <MotionProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
