'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-primary/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <span className="text-text-select">Motor</span>
          <span className="text-primary">lytics</span>
        </Link>

        {/* Center Navigation */}
        <div className="flex items-center gap-8">
          <Link
            href="/features"
            className="text-sm text-text transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-text transition-colors hover:text-primary"
          >
            Pricing
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="https://app.motorlytics.com.au/login">
              Login
            </Link>
          </Button>
          <Button asChild>
            <Link href="https://app.motorlytics.com.au/signup">
              Sign Up →
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
