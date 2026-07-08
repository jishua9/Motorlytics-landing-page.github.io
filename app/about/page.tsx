import type { Metadata } from 'next'
import { PageShell } from '@/components/site/page-shell'
import { Reveal } from '@/components/story/reveal'

export const metadata: Metadata = {
  title: 'About · Motorlytics',
  description:
    'Motorlytics is built in Australia for grassroots and club motorsport. The tools the pros take for granted, for the racers who do it for the love of it.',
}

const APP_URL = 'https://app.motorlytics.com.au/register'

const PRINCIPLES = [
  {
    title: 'One place, not ten',
    copy: 'Your weekend shouldn’t live across a spreadsheet, a notes app, a timing screenshot and a group chat. Everything belongs together.',
  },
  {
    title: 'Real data, not screenshots',
    copy: 'Results, laps and setups are stored as data you can actually query, so the platform can find patterns you can’t see by eye.',
  },
  {
    title: 'Made in Australia',
    copy: 'Built around Australian circuits, categories and calendars first, by someone who races them.',
  },
  {
    title: 'Fair, simple pricing',
    copy: 'One plan, everything included, no feature gates dressed up as tiers. Priced for privateers.',
  },
]

export default function AboutPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-secondary-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-secondary-dark) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(ellipse 60% 55% at 50% 40%, black 30%, transparent 75%)',
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <p
            className="text-sm font-medium"
            style={{ color: 'var(--color-primary)' }}
          >
            About
          </p>
          <h1 className="mt-2 font-[Outfit] text-4xl font-semibold tracking-tight text-text-select sm:text-5xl">
            Built in the paddock, not a boardroom
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-text-sub">
            Motorlytics is made for grassroots and club motorsport. The tools the
            professionals take for granted, for the racers who do it for the love
            of it.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="relative py-12">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <div className="space-y-5 text-text-sub">
              <p>
                Every club racer knows the drill. Setup notes on paper. Lap times
                in a phone photo of the timing screen. Telemetry in one program,
                weather in another, results in an email. By the time you get home,
                the weekend is scattered across half a dozen places, and the one
                thing you actually want to know is gone. What did we change, and
                did it work?
              </p>
              <p>
                Motorlytics started as an answer to that question. Bring the
                weekend into one place, store it as real data, and let the
                platform do what a spreadsheet never could. It lines up today
                against the last time the car ran in conditions like these, and
                shows which change found the time.
              </p>
              <p>
                It’s built in Australia, around Australian circuits and categories,
                by someone who spends their weekends at the track too. No venture
                money, no enterprise sales team, just a tool we wanted to exist.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="relative py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.06}>
                <div className="h-full rounded-xl border border-secondary-dark bg-grid p-6">
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

      {/* CTA */}
      <section className="relative py-24 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <h2 className="font-[Outfit] text-3xl font-semibold text-text-select">
              Come and race with us
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-text-sub">
              Start a 14 day free trial. No card charged, cancel anytime.
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
    </PageShell>
  )
}
