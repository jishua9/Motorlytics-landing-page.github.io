import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AnimatedGrid } from '@/components/AnimatedGrid'
import { PricingCard } from '@/components/PricingCard'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Check, X } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="relative py-24">
        <AnimatedGrid />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h1 className="mb-6 text-5xl font-bold text-text-select">
            Choose the right plan for your racing program
          </h1>

          <p className="mb-12 text-xl text-text">
            Start free and upgrade as you grow. All plans include core features
            with transparent pricing.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <PricingCard
              name="Amateur"
              price="$0"
              billing="Forever"
              description="Perfect for club racers getting started"
              features={[
                '2 cars',
                'Event tracking',
                'Setup sheets',
                'Parts management',
                'Results import',
                'Basic analytics',
                'Mobile access',
              ]}
              ctaText="Get Started Free →"
              ctaHref="https://app.motorlytics.com.au/signup?tier=amateur"
              footerNote="No credit card required"
            />

            <PricingCard
              name="Pro"
              price="$15"
              billing="per month"
              description="For serious racers who demand the best"
              features={[
                'Everything in Amateur',
                'Unlimited cars',
                'MoTeC telemetry import',
                'Advanced analytics',
                'Corner analysis',
                'G-force visualization',
                'Cost tracking',
                'Priority support',
              ]}
              ctaText="Start Free Trial →"
              ctaHref="https://app.motorlytics.com.au/signup?tier=pro"
              badge="MOST POPULAR"
              featured={true}
              footerNote="14-day free trial"
            />

            <PricingCard
              name="Team"
              price="TBA"
              billing="per month"
              description="Built for racing teams and multi-driver operations"
              features={[
                'Everything in Pro',
                'Multiple drivers',
                'Shared cars',
                'Team dashboard',
                'Collaborative tools',
                'Advanced permissions',
                'Dedicated support',
              ]}
              ctaText="Join Waitlist →"
              ctaHref="https://app.motorlytics.com.au/signup?tier=team"
              badge="COMING SOON"
              comingSoon={true}
              footerNote="Be the first to know"
            />
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-4xl font-bold text-text-select">
            Compare all features
          </h2>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Feature</TableHead>
                  <TableHead className="text-center">Amateur</TableHead>
                  <TableHead className="text-center">Pro</TableHead>
                  <TableHead className="text-center">Team</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Cars</TableCell>
                  <TableCell className="text-center">2</TableCell>
                  <TableCell className="text-center">Unlimited</TableCell>
                  <TableCell className="text-center">Unlimited</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Custom Metrics</TableCell>
                  <TableCell className="text-center">5</TableCell>
                  <TableCell className="text-center">25</TableCell>
                  <TableCell className="text-center">50</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Custom Templates</TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center">5</TableCell>
                  <TableCell className="text-center">10</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Data Logger Import</TableCell>
                  <TableCell className="text-center"><X className="h-5 w-5 mx-auto text-text-sub" /></TableCell>
                  <TableCell className="text-center"><Check className="h-5 w-5 mx-auto text-primary" /></TableCell>
                  <TableCell className="text-center"><Check className="h-5 w-5 mx-auto text-primary" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Telemetry Storage</TableCell>
                  <TableCell className="text-center"><X className="h-5 w-5 mx-auto text-text-sub" /></TableCell>
                  <TableCell className="text-center"><Check className="h-5 w-5 mx-auto text-primary" /></TableCell>
                  <TableCell className="text-center"><Check className="h-5 w-5 mx-auto text-primary" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Advanced Analytics</TableCell>
                  <TableCell className="text-center"><X className="h-5 w-5 mx-auto text-text-sub" /></TableCell>
                  <TableCell className="text-center"><Check className="h-5 w-5 mx-auto text-primary" /></TableCell>
                  <TableCell className="text-center"><Check className="h-5 w-5 mx-auto text-primary" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cost Tracking</TableCell>
                  <TableCell className="text-center"><X className="h-5 w-5 mx-auto text-text-sub" /></TableCell>
                  <TableCell className="text-center"><Check className="h-5 w-5 mx-auto text-primary" /></TableCell>
                  <TableCell className="text-center"><Check className="h-5 w-5 mx-auto text-primary" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Team Features</TableCell>
                  <TableCell className="text-center"><X className="h-5 w-5 mx-auto text-text-sub" /></TableCell>
                  <TableCell className="text-center"><X className="h-5 w-5 mx-auto text-text-sub" /></TableCell>
                  <TableCell className="text-center"><Check className="h-5 w-5 mx-auto text-primary" /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-grid-title py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-12 text-center text-4xl font-bold text-text-select">
            Frequently asked questions
          </h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                We accept all major credit cards (Visa, Mastercard, American Express) through
                our secure payment processor Stripe. No payment information is required for
                the Amateur tier, which is free forever.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Can I upgrade or downgrade my plan?</AccordionTrigger>
              <AccordionContent>
                Yes! You can upgrade or downgrade your plan at any time from your account
                settings. Changes take effect immediately, and we'll prorate your billing
                automatically.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What happens if I exceed my plan limits?</AccordionTrigger>
              <AccordionContent>
                If you reach your plan's car limit or custom metric limit, you'll be prompted
                to upgrade. We'll never block access to your data - you can always view
                everything, but creating new resources may require an upgrade.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Is there a free trial for Pro tier?</AccordionTrigger>
              <AccordionContent>
                Yes! New Pro subscriptions include a 14-day free trial. No credit card
                required to start the trial. You can cancel anytime before the trial ends
                without being charged.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>When will Team tier be available?</AccordionTrigger>
              <AccordionContent>
                Team tier is currently in development. Join the waitlist to be notified when
                it launches. Early adopters will receive special pricing for the first year.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-gradient-to-b from-transparent via-primary/5 to-transparent py-24">
        <AnimatedGrid />

        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-6 text-5xl font-bold text-text-select">
            Ready to get started?
          </h2>

          <p className="mb-8 text-xl text-text">
            Join racers using Motorlytics to manage their racing data and
            improve their performance.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="https://app.motorlytics.com.au/signup?tier=amateur">
                Start Free →
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href="/features">
                See All Features
              </Link>
            </Button>
          </div>

          <p className="mt-4 text-sm text-text-sub">
            No credit card required • Free forever for amateur racers
          </p>
        </div>
      </section>
    </main>
  )
}
