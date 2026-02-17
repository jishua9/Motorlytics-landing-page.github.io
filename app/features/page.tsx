import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AnimatedGrid } from '@/components/AnimatedGrid'
import { FeatureRow } from '@/components/FeatureRow'
import Link from 'next/link'
import {
  BarChart3,
  Calendar,
  Gauge,
  Cloud,
  Trophy,
  Settings,
  Car,
  Cog,
  Circle,
  Wrench,
  Bell,
  DollarSign,
} from 'lucide-react'

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
            <Link
              href="#race-day"
              className="flex items-center gap-2 rounded-xl border border-secondary-dark bg-grid px-8 py-4 transition-all hover:border-primary hover:shadow-[0_4px_16px_rgba(255,136,0,0.2)]"
            >
              <span className="text-2xl">🏁</span>
              <span className="font-semibold text-text-select">
                Race Day Excellence
              </span>
            </Link>

            <Link
              href="#fleet"
              className="flex items-center gap-2 rounded-xl border border-secondary-dark bg-grid px-8 py-4 transition-all hover:border-primary hover:shadow-[0_4px_16px_rgba(255,136,0,0.2)]"
            >
              <span className="text-2xl">🔧</span>
              <span className="font-semibold text-text-select">
                Fleet Management
              </span>
            </Link>
          </div>

          <Button size="lg" asChild>
            <Link href="https://app.motorlytics.com.au/signup?tier=amateur">
              Start Free Trial →
            </Link>
          </Button>
        </div>
      </section>

      {/* Race Day Excellence */}
      <section id="race-day" className="relative bg-grid-title py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4 border-primary text-primary">
              PRO FEATURES
            </Badge>
            <h2 className="mb-4 text-4xl font-bold text-text-select">
              Race Day Excellence
            </h2>
            <p className="text-lg text-text">
              From pit wall strategy to post-race analysis, manage every aspect
              of your race weekend
            </p>
          </div>

          {/* Feature 1: Professional Telemetry */}
          <div className="mb-32">
            <FeatureRow
              icon={BarChart3}
              title="Professional Telemetry Analysis"
              description="Import MoTeC data logger files and unlock insights that shave tenths off your lap times. Multi-channel analysis, lap-by-lap breakdown, and corner performance tracking—all visualized with professional-grade charts."
              pills={[
                'Multi-Channel Comparison',
                'Lap-by-Lap Breakdown',
                'Corner Analysis',
                'G-Force Tracking',
                'Driver Input Visualization',
                'Session Health Monitoring',
              ]}
              visualPlacement="left"
              visualContent={
                <div className="flex h-[400px] items-center justify-center text-text-sub">
                  Telemetry Dashboard GIF
                  <br />
                  (Speed, Throttle, Brake charts)
                  <br />
                  (Animated lap selection + track map)
                </div>
              }
              ctaText="See Analytics Demo"
              ctaHref="https://app.motorlytics.com.au/signup?tier=pro"
            />
          </div>

          {/* Feature 2: Event & Session Management */}
          <div className="mb-32">
            <FeatureRow
              icon={Calendar}
              title="Event & Session Management"
              description="Never miss a race weekend. Sync your calendar with Motorsport Australia events, manage practice sessions, qualifying, and races—all with automated weather tracking and setup templates ready to go."
              pills={[
                'Motorsport Australia Sync',
                'Session Planning',
                'Automated Weather Tracking',
                'Setup Template Assignment',
                'Multi-Driver Support',
                'Team Calendar Sharing',
              ]}
              visualPlacement="right"
              visualContent={
                <div className="flex h-[400px] items-center justify-center text-text-sub">
                  Event Calendar GIF
                  <br />
                  (Monthly view with events)
                  <br />
                  (Session detail panel)
                </div>
              }
              ctaText="View Event Features"
              ctaHref="https://app.motorlytics.com.au/signup?tier=pro"
            />
          </div>

          {/* Feature 3: Pit Wall Dashboard */}
          <div className="mb-32">
            <FeatureRow
              icon={Gauge}
              title="Pit Wall Dashboard"
              description="Real-time race day command center. Monitor live timing, track weather changes, manage fuel strategy, and make split-second decisions with all critical data at your fingertips on any device."
              pills={[
                'Live Timing Integration',
                'Fuel Strategy Calculator',
                'Weather Change Alerts',
                'Pit Stop Timer',
                'Driver Communication Logs',
                'Mobile-Optimized Interface',
              ]}
              visualPlacement="left"
              visualContent={
                <div className="flex h-[400px] items-center justify-center text-text-sub">
                  Pit Wall Dashboard GIF
                  <br />
                  (Live timing, weather, fuel gauge)
                  <br />
                  (Mobile responsive design)
                </div>
              }
              ctaText="See Dashboard Demo"
              ctaHref="https://app.motorlytics.com.au/signup?tier=pro"
            />
          </div>

          {/* Feature 4: Weather Intelligence */}
          <div className="mb-32">
            <FeatureRow
              icon={Cloud}
              title="Weather Intelligence"
              description="Automatically recorded weather data for every session. Match current conditions with historical data to find the perfect setup. Track temperature, humidity, pressure, wind, and rain with hourly forecasts for your entire race weekend."
              pills={[
                'Real-Time Weather Data',
                'Historical Condition Matching',
                'Track Temperature Tracking',
                'Hourly Forecasts',
                'Radar Overlay',
                'Tire Performance Correlation',
              ]}
              visualPlacement="right"
              visualContent={
                <div className="flex h-[400px] items-center justify-center text-text-sub">
                  Weather Dashboard GIF
                  <br />
                  (Current conditions + forecast)
                  <br />
                  (Radar map with track overlay)
                </div>
              }
              ctaText="Explore Weather Tools"
              ctaHref="https://app.motorlytics.com.au/signup?tier=pro"
            />
          </div>

          {/* Feature 5: Results & Timing */}
          <div className="mb-32">
            <FeatureRow
              icon={Trophy}
              title="Results & Timing Analysis"
              description="Import race results and visualize your performance. Lap time charts, position tracking, driver comparisons, and setup-to-results correlation—all connected to help you understand what truly makes you faster."
              pills={[
                'Lap Time Visualization',
                'Position Tracking',
                'Driver Comparison',
                'Setup-to-Results Correlation',
                'Performance Trends',
                'Results Import',
              ]}
              visualPlacement="left"
              visualContent={
                <div className="flex h-[400px] items-center justify-center text-text-sub">
                  Results Dashboard GIF
                  <br />
                  (Lap time charts, position graph)
                  <br />
                  (Driver comparison overlay)
                </div>
              }
              ctaText="View Analytics"
              ctaHref="https://app.motorlytics.com.au/signup?tier=pro"
            />
          </div>

          {/* Feature 6: Setup Sheet System */}
          <div>
            <FeatureRow
              icon={Settings}
              title="Setup Sheet System"
              description="Never start from scratch. Record every detail of your car setup with custom templates for different categories. Track changes session-by-session and instantly access what worked at each track during previous visits."
              pills={[
                'Custom Setup Templates',
                'Track-Specific History',
                'Session-by-Session Changes',
                'Visual Setup Comparison',
                'Corner-Based Settings',
                'Multi-Car Support',
              ]}
              visualPlacement="right"
              visualContent={
                <div className="flex h-[400px] items-center justify-center text-text-sub">
                  Setup Sheet GIF
                  <br />
                  (Template editor with sections)
                  <br />
                  (Setup comparison view)
                </div>
              }
              ctaText="See Setup Features"
              ctaHref="https://app.motorlytics.com.au/signup?tier=pro"
            />
          </div>
        </div>
      </section>

      {/* Fleet Management */}
      <section id="fleet" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4 border-primary text-primary">
              ALL TIERS
            </Badge>
            <h2 className="mb-4 text-4xl font-bold text-text-select">
              Fleet Management
            </h2>
            <p className="text-lg text-text">
              Complete vehicle tracking from parts lifecycle to service
              history—know the status of every car in your stable
            </p>
          </div>

          {/* Feature 7: Complete Car Tracking */}
          <div className="mb-32">
            <FeatureRow
              icon={Car}
              title="Complete Car Tracking"
              description="Manage unlimited cars across your personal garage or team fleet. Track make, model, engine, chassis, race number, and racing kilometers. Each car maintains its own complete history of events, sessions, and performance data."
              pills={[
                'Unlimited Vehicles',
                'Team Fleet Support',
                'Racing KM Tracking',
                'Category Assignment',
                'Default Setup Templates',
                'Multi-Driver Assignment',
              ]}
              visualPlacement="left"
              visualContent={
                <div className="flex h-[400px] items-center justify-center text-text-sub">
                  Car Fleet Dashboard GIF
                  <br />
                  (Grid of cars with status)
                  <br />
                  (Car detail panel)
                </div>
              }
              ctaText="Start Tracking"
              ctaHref="https://app.motorlytics.com.au/signup?tier=amateur"
            />
          </div>

          {/* Feature 8: Parts Lifecycle */}
          <div className="mb-32">
            <FeatureRow
              icon={Cog}
              title="Parts Lifecycle Management"
              description="Track every component on your race car with automatic lifecycle calculations. Monitor wear based on kilometers or time, schedule replacements before performance degrades, and know exactly what parts were on the car for your best sessions."
              pills={[
                'Component Age Tracking',
                'Automatic Wear Calculation',
                'Lifespan Alerts',
                'Replacement Chain History',
                'Active vs. Replaced Status',
                'Setup-to-Parts Correlation',
              ]}
              visualPlacement="right"
              visualContent={
                <div className="flex h-[400px] items-center justify-center text-text-sub">
                  Parts Lifecycle GIF
                  <br />
                  (Parts list with wear indicators)
                  <br />
                  (Lifecycle detail chart)
                </div>
              }
              ctaText="Manage Parts"
              ctaHref="https://app.motorlytics.com.au/signup?tier=amateur"
            />
          </div>

          {/* Feature 9: Service History */}
          <div className="mb-32">
            <FeatureRow
              icon={Wrench}
              title="Service History & Records"
              description="Comprehensive maintenance tracking with full service records. Link services to specific parts, track costs, upload photos and invoices, and maintain a complete workshop history for each vehicle in your fleet."
              pills={[
                'Service Categories',
                'Cost Tracking',
                'Part Linking',
                'Document Upload',
                'Service Intervals',
                'Workshop Notes',
              ]}
              visualPlacement="left"
              visualContent={
                <div className="flex h-[400px] items-center justify-center text-text-sub">
                  Service History GIF
                  <br />
                  (Timeline of services)
                  <br />
                  (Service detail with photos)
                </div>
              }
              ctaText="View Service Features"
              ctaHref="https://app.motorlytics.com.au/signup?tier=amateur"
            />
          </div>

          {/* Feature 10: Tyre Management */}
          <div className="mb-32">
            <FeatureRow
              icon={Circle}
              title="Tyre Management"
              description="Specialized tracking for your most critical component. Monitor compound, age, heat cycles, pressure history, and performance across sessions. Know which tyres worked best in specific conditions and plan your race day strategy accordingly."
              pills={[
                'Compound Tracking',
                'Heat Cycle Monitoring',
                'Pressure History',
                'Performance Correlation',
                'Set Management',
                'Rotation Tracking',
              ]}
              visualPlacement="right"
              visualContent={
                <div className="flex h-[400px] items-center justify-center text-text-sub">
                  Tyre Dashboard GIF
                  <br />
                  (Tyre sets with heat cycles)
                  <br />
                  (Pressure/performance charts)
                </div>
              }
              ctaText="Track Tyres"
              ctaHref="https://app.motorlytics.com.au/signup?tier=amateur"
            />
          </div>

          {/* Feature 11: Task Tracking */}
          <div className="mb-32">
            <FeatureRow
              icon={Bell}
              title="Task & Reminder System"
              description="Never forget critical maintenance. Set up automated reminders based on kilometers or dates, create pre-event checklists, and assign tasks to team members. Stay organized and ensure your car is always race-ready."
              pills={[
                'KM-Based Reminders',
                'Date-Based Alerts',
                'Pre-Event Checklists',
                'Team Task Assignment',
                'Priority Levels',
                'Completion Tracking',
              ]}
              visualPlacement="left"
              visualContent={
                <div className="flex h-[400px] items-center justify-center text-text-sub">
                  Task Dashboard GIF
                  <br />
                  (Task list with priorities)
                  <br />
                  (Reminder notification)
                </div>
              }
              ctaText="Set Up Tasks"
              ctaHref="https://app.motorlytics.com.au/signup?tier=amateur"
            />
          </div>

          {/* Feature 12: Finance Tracking */}
          <div>
            <FeatureRow
              icon={DollarSign}
              title="Finance & Budget Tracking"
              description="Complete financial management for your racing program. Track parts costs, service expenses, event fees, and travel. Generate detailed reports, set budgets, and understand the true cost of your racing—all in one place."
              pills={[
                'Expense Categories',
                'Budget Management',
                'Cost Per Event',
                'Season Totals',
                'Receipt Upload',
                'Financial Reports',
              ]}
              visualPlacement="right"
              visualContent={
                <div className="flex h-[400px] items-center justify-center text-text-sub">
                  Finance Dashboard GIF
                  <br />
                  (Expense breakdown charts)
                  <br />
                  (Budget vs. actual comparison)
                </div>
              }
              ctaText="Track Finances"
              ctaHref="https://app.motorlytics.com.au/signup?tier=amateur"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-gradient-to-b from-transparent via-primary/5 to-transparent py-24">
        <AnimatedGrid />

        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-6 text-5xl font-bold text-text-select">
            Ready to transform your racing program?
          </h2>

          <p className="mb-8 text-xl text-text">
            Join racers using Motorlytics to manage their cars, analyze their
            data, and race smarter
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="https://app.motorlytics.com.au/signup?tier=pro">
                Start Free Trial →
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href="#race-day">View All Features</Link>
            </Button>
          </div>

          <p className="mt-4 text-sm text-text-sub">
            14-day free trial • No credit card required • Upgrade anytime
          </p>
        </div>
      </section>
    </main>
  )
}
