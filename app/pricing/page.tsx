import type { Metadata } from 'next'
import { PageShell } from '@/components/site/page-shell'
import { PricingCard } from '@/components/site/pricing-card'
import { Reveal } from '@/components/story/reveal'

export const metadata: Metadata = {
  alternates: { canonical: '/pricing/' },
  title: 'Pricing · Motorlytics',
  description:
    'One plan, everything included. $15/month AUD with a 14 day free trial. No feature gates, cancel anytime.',
}

const APP_URL = 'https://app.motorlytics.com.au/register'

const INCLUDES = [
  'Unlimited events, sessions and cars',
  'The weekend pit wall',
  'Setup sheets and templates',
  'MoTeC and AiM telemetry import',
  'Corner by corner analysis',
  'Weather matched setup insights',
  'Weather history and rain radar',
  'Results history and career stats',
  'Car parts, services and cost tracking',
  'Australian circuit maps and corners',
]

const FAQ = [
  {
    q: 'Is there really a free trial?',
    a: 'Yes, 14 days, and no card is charged during the trial. If it’s not for you, cancel before it ends and you won’t pay a cent.',
  },
  {
    q: 'What does the $15 get me?',
    a: 'Everything. There’s a single plan with no feature gates. Telemetry, weather insights, results, setup sheets and the pit wall are all included.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Any time, from your account. You keep access until the end of the period you’ve paid for.',
  },
  {
    q: 'Do you have a team plan?',
    a: 'A team based version is on the way for garages and multi car outfits. For now, every account is a full individual membership.',
  },
  {
    q: 'Is my data mine?',
    a: 'Always. Your setups, telemetry and results belong to you, and you can export or delete them whenever you like.',
  },
]

export default function PricingPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-24 pb-12 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-secondary-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-secondary-dark) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(ellipse 60% 55% at 50% 45%, black 30%, transparent 75%)',
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <p
            className="text-sm font-medium"
            style={{ color: 'var(--color-primary)' }}
          >
            Pricing
          </p>
          <h1 className="mt-2 font-[Outfit] text-4xl font-semibold tracking-tight text-text-select sm:text-5xl">
            One plan. Everything in it.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-text-sub">
            No tiers, no add ons, no feature gates. $15 a month, or start free for
            two weeks.
          </p>
        </div>
      </section>

      {/* Card + includes */}
      <section className="relative py-8">
        <div className="mx-auto grid max-w-4xl items-start gap-10 px-6 md:grid-cols-2">
          <Reveal>
            <PricingCard />
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <h2 className="font-[Outfit] text-xl font-semibold text-text-select">
                What’s included
              </h2>
              <ul className="mt-4 space-y-3">
                {INCLUDES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-text-main"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mt-0.5 shrink-0"
                      style={{ color: 'var(--color-improved)' }}
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <h2 className="text-center font-[Outfit] text-2xl font-semibold text-text-select">
              Questions
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={(i % 3) * 0.05}>
                <div className="rounded-xl border border-secondary-dark bg-grid p-5">
                  <h3 className="font-[Outfit] font-medium text-text-select">
                    {f.q}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-sub">
                    {f.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <a
              href={APP_URL}
              className="inline-block rounded-lg px-7 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.03]"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
              }}
            >
              Start your 14 day free trial
            </a>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
