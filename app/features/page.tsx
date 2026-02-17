import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AnimatedGrid } from '@/components/AnimatedGrid'
import Link from 'next/link'

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="relative py-24">
        <AnimatedGrid />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h1 className="mb-6 text-5xl font-bold text-text-select">
            Everything you need to race smarter
          </h1>

          <p className="mb-12 text-xl text-text">
            Professional-grade tools for race management and vehicle tracking,
            all in one platform
          </p>

          {/* Category Pills */}
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => document.getElementById('race-day')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 rounded-xl border border-secondary-dark bg-grid px-8 py-4 transition-all hover:border-primary hover:shadow-[0_4px_16px_rgba(255,136,0,0.2)]"
            >
              <span className="text-2xl">🏁</span>
              <span className="font-semibold text-text-select">
                Race Day Excellence
              </span>
            </button>

            <button
              onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 rounded-xl border border-secondary-dark bg-grid px-8 py-4 transition-all hover:border-primary hover:shadow-[0_4px_16px_rgba(255,136,0,0.2)]"
            >
              <span className="text-2xl">🔧</span>
              <span className="font-semibold text-text-select">
                Fleet Management
              </span>
            </button>
          </div>

          <Button size="lg" asChild>
            <Link href="https://app.motorlytics.com.au/signup?tier=amateur">
              Start Free Trial →
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
