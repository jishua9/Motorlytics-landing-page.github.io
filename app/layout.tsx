import type { Metadata } from 'next'
import { Outfit, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Same 3 Google fonts + CSS variables as the Motorlytics app.
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Motorlytics · Your whole race weekend in one place',
  description:
    'The all in one companion for grassroots and club motorsport. Links your setup, telemetry, weather and results, then finds the time for you.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Hardcode dark theme (data-theme="dark") for the PoC instead of next-themes.
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`scroll-smooth ${outfit.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  )
}
