'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

const APP_URL = 'https://app.motorlytics.com.au/register'

/**
 * Sticky top bar. Goes from transparent over the hero to a solid, blurred
 * surface once you start scrolling. A thin scroll-progress line runs along the
 * bottom edge so the whole page reads as one continuous run.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-secondary-dark bg-background/80 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.svg"
            alt="Motorlytics"
            width={30}
            height={30}
            className="h-[30px] w-[30px]"
          />
          <span className="font-[Outfit] text-lg font-semibold text-text-select">
            Motorlytics
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-text-sub md:flex">
          <a href="/features" className="transition-colors hover:text-text-select">
            Features
          </a>
          <a href="/pricing" className="transition-colors hover:text-text-select">
            Pricing
          </a>
          <a href="/about" className="transition-colors hover:text-text-select">
            About
          </a>
          <a
            href="https://docs.motorlytics.com.au"
            className="transition-colors hover:text-text-select"
          >
            Docs
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://app.motorlytics.com.au/login"
            className="hidden text-sm text-text-sub transition-colors hover:text-text-select sm:block"
          >
            Sign in
          </a>
          <a
            href={APP_URL}
            className="rounded-lg px-4 py-2 text-sm font-medium transition-transform hover:scale-[1.03]"
            style={{
              background: 'var(--color-primary)',
              color: 'var(--color-primary-foreground)',
            }}
          >
            Start free trial
          </a>
        </div>
      </div>

      <motion.div
        className="h-px origin-left"
        style={{ scaleX: progress, background: 'var(--color-primary)' }}
      />
    </header>
  )
}
