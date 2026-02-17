import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="border-t border-secondary-dark bg-grid-title">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Column 1: Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text-select">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/features"
                  className="text-sm text-text transition-colors hover:text-primary"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-text transition-colors hover:text-primary"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="https://app.motorlytics.com.au"
                  className="text-sm text-text transition-colors hover:text-primary"
                >
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="https://app.motorlytics.com.au"
                  className="text-sm text-text transition-colors hover:text-primary"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text-select">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://app.motorlytics.com.au"
                  className="text-sm text-text transition-colors hover:text-primary"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://app.motorlytics.com.au"
                  className="text-sm text-text transition-colors hover:text-primary"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:support@motorlytics.com.au"
                  className="text-sm text-text transition-colors hover:text-primary"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text-select">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://app.motorlytics.com.au"
                  className="text-sm text-text transition-colors hover:text-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="https://app.motorlytics.com.au"
                  className="text-sm text-text transition-colors hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="https://app.motorlytics.com.au"
                  className="text-sm text-text transition-colors hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-secondary-dark" />

        {/* Bottom Row */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-xl font-bold">
            <span className="text-text-select">Motor</span>
            <span className="text-primary">lytics</span>
          </div>
          <p className="text-sm text-text-sub">
            © 2026 • Made in Australia
          </p>
        </div>
      </div>
    </footer>
  )
}
