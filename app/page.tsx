import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AnimatedGrid } from '@/components/AnimatedGrid'
import { HeroVisual } from '@/components/HeroVisual'
import { BarChart3, Car, Gauge } from 'lucide-react'
import { FeatureCard } from '@/components/FeatureCard'
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

      {/* Core Features Highlight */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-text-select">
              Everything you need to race smarter
            </h2>
            <p className="text-lg text-text">
              From telemetry analysis to maintenance tracking, Motorlytics
              handles it all
            </p>
          </div>

          {/* Three-column grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard
              icon={BarChart3}
              title="Professional Telemetry"
              description="Import MoTeC data and analyze every corner, brake point, and throttle input with professional-grade visualizations."
              linkText="Explore Analytics"
              linkHref="/features#analytics"
            />

            <FeatureCard
              icon={Car}
              title="Complete Car Management"
              description="Track parts lifecycle, maintenance schedules, and costs. Never miss a service interval or part replacement again."
              linkText="See Features"
              linkHref="/features#management"
            />

            <FeatureCard
              icon={Gauge}
              title="Real-Time Pit Wall"
              description="Live weather radar, session schedules, and setup tracking. Everything your team needs on race day, in one place."
              linkText="Learn More"
              linkHref="/features#pitwall"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
