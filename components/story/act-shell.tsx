'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import type { Act } from '@/lib/story'
import { Reveal } from './reveal'

const ACCENT: Record<NonNullable<Act['accent']>, string> = {
  primary: 'var(--color-primary)',
  cyan: 'var(--color-badge-cyan)',
  green: 'var(--color-improved)',
}

type ActShellProps = {
  act: Act
  index: number
  /** the real component slot; falls back to a labelled placeholder */
  children?: ReactNode
}

/**
 * One beat of the story. Text column + a framed "stage" that holds the real
 * app component (or a placeholder naming what belongs there). Layout alternates
 * side to side down the page; the stage drifts slightly with scroll for depth.
 */
export function ActShell({ act, index, children }: ActShellProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const driftY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const accent = ACCENT[act.accent ?? 'primary']
  const flipped = index % 2 === 1

  return (
    <section
      id={act.id}
      data-act={act.id}
      ref={ref}
      className="story-act relative flex min-h-screen items-center py-24"
    >
      <div
        className={`mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16 ${
          flipped ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* Text column */}
        <div className="max-w-xl">
          <Reveal>
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-wide"
              style={{ borderColor: accent, color: accent }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: accent }}
              />
              {act.kicker}
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-[Outfit] text-3xl font-semibold leading-tight text-text-select sm:text-4xl">
              {act.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-base leading-relaxed text-text-sub">
              {act.copy}
            </p>
          </Reveal>
        </div>

        {/* Stage: real component or placeholder */}
        <motion.div style={reduce ? undefined : { y: driftY }}>
          <Reveal y={40} delay={0.08}>
            <div
              className={`stage relative rounded-xl shadow-2xl ${
                children ? 'overflow-hidden' : 'border bg-grid p-3'
              }`}
              style={{ borderColor: 'var(--color-secondary-dark)' }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 -top-px z-10 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                }}
              />
              {children ?? <SlotPlaceholder label={act.slot} accent={accent} />}
            </div>
          </Reveal>
        </motion.div>
      </div>
    </section>
  )
}

function SlotPlaceholder({ label, accent }: { label: string; accent: string }) {
  return (
    <div
      className="flex aspect-[16/10] flex-col items-center justify-center gap-3 rounded-lg border border-dashed text-center"
      style={{ borderColor: 'var(--color-secondary-dark)' }}
    >
      <span
        className="rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-widest"
        style={{ background: 'var(--color-secondary-dark)', color: accent }}
      >
        component slot
      </span>
      <span className="px-6 font-[Outfit] text-lg text-text-main">{label}</span>
      <span className="text-xs text-text-sub">real app component drops in here</span>
    </div>
  )
}
