import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AnimatedGrid } from '@/components/AnimatedGrid'
import { HeroVisual } from '@/components/HeroVisual'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center">
        <AnimatedGrid />

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-5">
          {/* Left: Content (60%) */}
          <div className="flex flex-col justify-center lg:col-span-3">
            <Badge variant="outline" className="mb-6 w-fit border-primary text-primary">
              MoTeC Compatible
            </Badge>

            <h1 className="mb-6 text-6xl font-bold leading-tight text-text-select">
              Race Management
              <br />
              Simplified
            </h1>

            <p className="mb-8 max-w-[560px] text-xl text-text">
              Professional telemetry analysis, comprehensive car management, and
              real-time pit wall data—all in one platform built for racers.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="https://app.motorlytics.com.au/signup?tier=amateur">
                  Get Started Free →
                </Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link href="/features">
                  View Live Demo
                </Link>
              </Button>
            </div>

            <p className="mt-4 text-sm text-text-sub">
              Free forever for amateur racers • No credit card required
            </p>
          </div>

          {/* Right: Visual (40%) */}
          <div className="flex items-center lg:col-span-2">
            <HeroVisual />
          </div>
        </div>
      </section>
    </main>
  )
}
