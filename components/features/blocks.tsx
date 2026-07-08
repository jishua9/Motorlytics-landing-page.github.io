import type { ReactNode } from 'react'
import { Reveal } from '@/components/story/reveal'

function Check({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="mt-0.5 shrink-0"
      style={{ color }}
    >
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FeatureList({
  items,
  color = 'var(--color-improved)',
  columns = 1,
}: {
  items: string[]
  color?: string
  columns?: 1 | 2
}) {
  return (
    <ul
      className={`grid gap-x-6 gap-y-2.5 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-text-main">
          <Check color={color} />
          {item}
        </li>
      ))}
    </ul>
  )
}

/**
 * A marquee feature area: a framed real-component "stage" beside copy + a
 * feature checklist. Layout alternates side to side via `flip`.
 */
export function Showcase({
  kicker,
  title,
  copy,
  items,
  visual,
  accent = 'var(--color-primary)',
  flip = false,
}: {
  kicker: string
  title: string
  copy: string
  items: string[]
  visual: ReactNode
  accent?: string
  flip?: boolean
}) {
  return (
    <section className="relative py-16">
      <div
        className={`mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-14 ${
          flip ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        <Reveal>
          <div className="max-w-lg">
            <div
              className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest"
              style={{ color: accent }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: accent }}
              />
              {kicker}
            </div>
            <h2 className="font-[Outfit] text-2xl font-semibold text-text-select sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-text-sub">{copy}</p>
            <div className="mt-6">
              <FeatureList items={items} color={accent} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} y={36}>
          <div
            className="relative rounded-xl border bg-grid p-4 shadow-2xl"
            style={{ borderColor: 'var(--color-secondary-dark)' }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 -top-px h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
              }}
            />
            {visual}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** App-style card frame with a header, for wrapping a bare component. */
export function StageCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
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

/** Compact grouped feature block (no component) for supporting areas. */
export function FeatureGroup({
  title,
  copy,
  items,
}: {
  title: string
  copy: string
  items: string[]
}) {
  return (
    <Reveal>
      <div className="h-full rounded-xl border border-secondary-dark bg-grid p-6">
        <h3 className="font-[Outfit] text-lg font-semibold text-text-select">
          {title}
        </h3>
        <p className="mt-2 text-sm text-text-sub">{copy}</p>
        <div className="mt-4">
          <FeatureList items={items} />
        </div>
      </div>
    </Reveal>
  )
}
