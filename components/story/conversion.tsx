'use client'

import { Reveal } from './reveal'
import { SiteFooter } from '@/components/site/site-footer'
import { PricingCard } from '@/components/site/pricing-card'

const APP_URL = 'https://app.motorlytics.com.au/register'

const PILLARS = [
  {
    title: 'Collates everything',
    copy: 'Calendar, results, setup, telemetry, weather, car services and costs, one platform instead of ten.',
  },
  {
    title: 'Understands the conditions',
    copy: 'Every session is scored against the weather it ran in, so like is compared with like.',
  },
  {
    title: 'Finds the time',
    copy: 'Surfaces the setup change that actually made the car faster, automatically, per track and car.',
  },
]

const FEATURES = [
  'Event calendar',
  'Race results & history',
  'Setup sheets',
  'MoTeC & AiM telemetry',
  'Weather & rain radar',
  'Corner-by-corner analysis',
  'Car parts & services',
  'Running-cost tracking',
  'The weekend pit wall',
]

export function Conversion() {
  return (
    <>
      {/* Three pillars */}
      <section className="relative py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p
              className="text-sm font-medium"
              style={{ color: 'var(--color-primary)' }}
            >
              Why it exists
            </p>
            <h2 className="mt-2 max-w-2xl font-[Outfit] text-3xl font-semibold text-text-select sm:text-4xl">
              Three things, done properly
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="h-full rounded-xl border border-secondary-dark bg-grid p-6">
                  <div
                    className="mb-4 grid h-9 w-9 place-items-center rounded-lg font-[Outfit] text-sm font-bold"
                    style={{
                      background: 'var(--color-secondary-dark)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-[Outfit] text-lg font-semibold text-text-select">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-sub">
                    {p.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="relative py-12">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-3">
              {FEATURES.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-secondary-dark bg-grid px-4 py-2 text-sm text-text-main"
                >
                  {f}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative py-28">
        <div className="mx-auto max-w-md px-6">
          <Reveal>
            <PricingCard />
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="font-[Outfit] text-3xl font-semibold text-text-select sm:text-4xl">
              Setups off paper. Last time, found for you.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-sub">
              Bring your next race weekend into one place, and let Motorlytics
              tell you what made the car faster.
            </p>
            <a
              href={APP_URL}
              className="mt-8 inline-block rounded-lg px-7 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.03]"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
              }}
            >
              Start your free trial
            </a>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
