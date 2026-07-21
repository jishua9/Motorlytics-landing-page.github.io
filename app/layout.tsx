import type { Metadata } from 'next'
import Script from 'next/script'
import { Outfit, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Umami analytics (self-hosted). Baked at build time from repo Variables;
// the script only renders once both are set, so analytics stays off until
// the backend is up. NEXT_PUBLIC_UMAMI_SRC should point at the renamed
// tracker on a neutral first-party subdomain (see analytics/README.md).
const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

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
      <body className="font-sans">
        {/*
          Scroll reveals are driven by motion, which server-renders its start
          state as an inline opacity:0. With JavaScript disabled that never
          animates in, so the page below the fold would read as blank. This
          only applies when JS is off, where we simply want everything shown.
        */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
        {umamiSrc && umamiWebsiteId && (
          <Script
            src={umamiSrc}
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
            defer
          />
        )}
      </body>
    </html>
  )
}
