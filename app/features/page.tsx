import type { Metadata } from 'next'
import { PageShell } from '@/components/site/page-shell'
import { Reveal } from '@/components/story/reveal'
import { Showcase, FeatureGroup, FeatureList } from '@/components/features/blocks'
import { SetupSheetDemo } from '@/components/features/setup-sheet-demo'
import { SpeedTraceDemo } from '@/components/features/speed-trace-demo'
import { ResultsDemo } from '@/components/features/results-demo'
import { PartsDemo } from '@/components/features/parts-demo'
import { CostsCard } from '@/components/features/costs-card'
import { EventsCard } from '@/components/features/events-card'
import { WeatherPanelDemo } from '@/components/features/weather-panel-demo'

export const metadata: Metadata = {
  alternates: { canonical: '/features/' },
  title: 'Features · Motorlytics',
  description:
    'Pit wall, setup sheets, MoTeC and AiM telemetry, weather matched insights, results and running costs. Everything your race weekend needs in one place.',
}

const APP_URL = 'https://app.motorlytics.com.au/register'

const TRACKS = [
  'Mount Panorama',
  'Phillip Island',
  'Sandown',
  'Winton',
  'Sydney Motorsport Park',
  'The Bend',
  'Queensland Raceway',
  'Wakefield Park',
  'Hidden Valley',
  'Barbagallo',
  'Symmons Plains',
  'Morgan Park',
  'Calder Park',
  'Baskerville',
  'Lakeside',
  'Mallala',
]

/** A small app-style card frame with a header, for wrapping a component. */
function StageCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-secondary-dark bg-grid">
      <div className="bg-card-header border-b border-secondary-dark px-4 py-3">
        <p className="font-[Outfit] text-sm font-medium text-text-select">{title}</p>
        <p className="text-xs text-text-sub">{subtitle}</p>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

export default function FeaturesPage() {
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
          <p className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
            Features
          </p>
          <h1 className="mt-2 font-[Outfit] text-4xl font-semibold tracking-tight text-text-select sm:text-5xl">
            Everything your race weekend needs
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-text-sub">
            One platform that collates your data, understands the conditions it
            ran in, and finds the setup change that made the car faster.
          </p>
        </div>
      </section>

      {/* Differentiator */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="rounded-2xl border border-secondary-dark bg-grid p-8 sm:p-10">
              <p className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
                Why Motorlytics exists
              </p>
              <h2 className="mt-2 font-[Outfit] text-2xl font-semibold text-text-select sm:text-3xl">
                “Last time it was like this, here’s what you ran”
              </h2>
              <p className="mt-4 text-text-sub">
                Motorlytics links your setup sheet, telemetry, weather and result
                for every session. Then it finds your past sessions at the same
                track, in the same car, in the most similar conditions, and shows
                which change actually found the time. A weather match score puts
                like next to like, so the comparison is real.
              </p>
              <p className="mt-4 font-[Outfit] font-medium text-text-select">
                Setups off paper. Last time, found for you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Showcase 1 Setup + everything in one place */}
      <Showcase
        kicker="One place"
        title="Your setup, car data, weather, results, and notes all in one place"
        copy="Everything you need across the weekend stored in one place. With smart session matching to show you past events and data that match your current conditions. No more searching for a setup sheet for the last time it rained at this track in this car, Motorlytics will bring it up for you."
        items={[
          'Custom build your setup sheet, or choose from our templates',
          'A full library of setup metrics, including custom metrics, with corner based values too',
          'Drag and drop template editor and custom metrics',
          'Setup history compared across sessions',
          'Weather matched setup correlation',
        ]}
        visual={<SetupSheetDemo />}
      />

      {/* Showcase 2 Telemetry */}
      <Showcase
        kicker="Telemetry and data analysis"
        title="See where the lap was won and lost"
        copy="Import MoTeC or AiM data and Motorlytics lines it up on the circuit for you. Overlay your best lap against a reference and read speed, throttle and brake through every corner to find where the time is."
        accent="var(--color-badge-cyan)"
        flip
        items={[
          'Import from MoTeC and AiM',
          'Speed, throttle and brake traces',
          'Lap delta comparison, gain or loss per corner',
          'GPS track map with speed coloured trace',
          'Corner by corner entry, apex and exit analysis',
        ]}
        visual={
          <StageCard
            title="Lap comparison · speed trace"
            subtitle="Your best lap against a reference"
          >
            <SpeedTraceDemo />
          </StageCard>
        }
      />

      {/* Pit wall & weather — full width (the conditions bar is wide) */}
      <section className="relative py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <div
                className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest"
                style={{ color: 'var(--color-badge-blue)' }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: 'var(--color-badge-blue)' }}
                />
                Pit wall and weather
              </div>
              <h2 className="font-[Outfit] text-2xl font-semibold text-text-select sm:text-3xl">
                An eye on the sky, all weekend
              </h2>
              <p className="mt-3 text-text-sub">
                Your event command centre. Live conditions, forecast, rain radar
                and wind over the circuit, captured against every session so the
                conditions are never guesswork.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08} y={36}>
            <StageCard
              title="Weather · Winton"
              subtitle="Live conditions and 12 hour forecast"
            >
              <WeatherPanelDemo />
            </StageCard>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mx-auto mt-6 max-w-2xl">
              <FeatureList
                columns={2}
                color="var(--color-badge-blue)"
                items={[
                  'Event dashboard with countdown and schedule',
                  'Current conditions with track temp and surface state',
                  'Hourly and daily forecast',
                  'Rain radar over the track map',
                  'Weather stored per session for later comparison',
                ]}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Results full width (the component is wide) */}
      <section className="relative py-16">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <div
                className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest"
                style={{ color: 'var(--color-improved)' }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: 'var(--color-improved)' }}
                />
                Results and timing
              </div>
              <h2 className="font-[Outfit] text-2xl font-semibold text-text-select sm:text-3xl">
                Results that mean something
              </h2>
              <p className="mt-3 text-text-sub">
                Pull results in from Natsoft or enter them by hand, then see
                yourself against the whole field lap by lap. Positions, gaps and
                best laps are stored as real data you can chart, not a screenshot
                of a timing screen.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08} y={36}>
            <div className="rounded-xl border border-secondary-dark bg-grid p-4">
              <ResultsDemo />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Show off car, maintenance, costs, events */}
      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="font-[Outfit] text-2xl font-semibold text-text-select sm:text-3xl">
                The whole car, and the whole season
              </h2>
              <p className="mt-3 text-text-sub">
                Track part life against your racing kilometres, keep a running
                tally of what the season costs, and see every event on your
                calendar at a glance.
              </p>
            </div>
          </Reveal>
          <div className="grid items-start gap-6 lg:grid-cols-3">
            <Reveal>
              <PartsDemo />
            </Reveal>
            <Reveal delay={0.06}>
              <CostsCard />
            </Reveal>
            <Reveal delay={0.12}>
              <EventsCard />
            </Reveal>
          </div>
        </div>
      </section>

      {/* And everything around the racing */}
      <section className="relative py-12">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="mb-10 text-center font-[Outfit] text-2xl font-semibold text-text-select sm:text-3xl">
              And everything around the racing
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureGroup
              title="Your season at a glance"
              copy="A dashboard built around your calendar."
              items={[
                'Driver dashboard and upcoming events',
                'Multi car garage carousel',
                'Career stats preview',
                'Action items and car notes',
              ]}
            />
            <FeatureGroup
              title="Events and calendar"
              copy="Find, filter and join every event."
              items={[
                'Motorsport Australia calendar sync',
                'Filter by state, date and track',
                'Manual events and track days',
                'Race number and category per event',
              ]}
            />
            <FeatureGroup
              title="Sessions"
              copy="Every practice, quali and race, logged."
              items={[
                'Session types with live status',
                'Setup and notes per session',
                'Session ratings out of five',
                'Post session laps and best time',
              ]}
            />
            <FeatureGroup
              title="Maintenance"
              copy="Know what is worn before it lets go."
              items={[
                'Parts lifecycle by racing kilometres',
                'Service records with linked parts',
                'Tyre set and odometer tracking',
                'Replacement history per part',
              ]}
            />
            <FeatureGroup
              title="Car management"
              copy="The whole car, tracked properly."
              items={[
                'Car profiles and multi car support',
                'Categories: Formula Ford, Excel, GT and more',
                'Full race history per car',
                'Team shared cars',
              ]}
            />
            <FeatureGroup
              title="Tracks, corners and stats"
              copy="Australian circuits, modelled accurately."
              items={[
                'Venue and layout split for multi config circuits',
                'Per layout telemetry and best laps',
                'Interactive corner definitions',
                'Public shareable driver profile',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Works with your gear */}
      <section className="relative py-12">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-secondary-dark bg-grid p-8 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-[Outfit] text-xl font-semibold text-text-select">
                  Works with your gear
                </h2>
                <p className="mt-2 text-sm text-text-sub">
                  Bring the data you already log. Motorlytics reads MoTeC i2 and
                  AiM Race Studio exports, with more loggers on the way through
                  the beta.
                </p>
              </div>
              <div className="flex shrink-0 gap-3">
                {['MoTeC i2', 'AiM Race Studio'].map((g) => (
                  <span
                    key={g}
                    className="rounded-lg border border-secondary-dark px-4 py-2 text-sm font-medium text-text-main"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Track list */}
      <section className="relative py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="font-[Outfit] text-2xl font-semibold text-text-select">
              Australian circuits, mapped and ready
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-text-sub">
              Corner definitions and track maps for the circuits you race, across
              every state, with multi config venues modelled so lap time
              comparisons stay honest.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {TRACKS.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-secondary-dark bg-grid px-4 py-1.5 text-sm text-text-main"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Teams coming */}
      <section className="relative py-8">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="flex items-center gap-4 rounded-xl border border-dashed border-secondary-dark bg-grid px-6 py-5">
              <span
                className="rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-widest"
                style={{
                  background: 'var(--color-secondary-dark)',
                  color: 'var(--color-primary)',
                }}
              >
                Coming soon
              </span>
              <p className="text-sm text-text-sub">
                A <span className="text-text-select">team based version</span> for
                garages and multi car outfits, with shared cars, templates and
                metrics across your crew.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <h2 className="font-[Outfit] text-3xl font-semibold text-text-select">
              See it on your own data
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-text-sub">
              Start a 14 day free trial and bring your next race weekend into one
              place.
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
