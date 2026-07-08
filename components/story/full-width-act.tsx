'use client'

import type { ReactNode } from 'react'
import type { Act } from '@/lib/story'
import { Reveal } from './reveal'

const ACCENT: Record<NonNullable<Act['accent']>, string> = {
  primary: 'var(--color-primary)',
  cyan: 'var(--color-badge-cyan)',
  green: 'var(--color-improved)',
}

/**
 * A story beat whose visual is too wide for the half-width stage (e.g. the pit
 * wall dashboard): heading + copy centred, the component full-width below.
 */
export function FullWidthAct({ act, children }: { act: Act; children: ReactNode }) {
  const accent = ACCENT[act.accent ?? 'primary']
  return (
    <section
      id={act.id}
      data-act={act.id}
      className="relative flex min-h-screen items-center py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <div
              className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest"
              style={{ color: accent }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: accent }}
              />
              {act.kicker}
            </div>
            <h2 className="font-[Outfit] text-3xl font-semibold leading-tight text-text-select sm:text-4xl">
              {act.title}
            </h2>
            <p className="mt-4 text-text-sub">{act.copy}</p>
          </div>
        </Reveal>
        <Reveal delay={0.08} y={36}>
          {children}
        </Reveal>
      </div>
    </section>
  )
}
