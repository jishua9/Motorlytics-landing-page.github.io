'use client'

import { motion, useReducedMotion } from 'motion/react'

const APP_URL = 'https://app.motorlytics.com.au/register'

/**
 * Opening frame of the story. Poster-style (no charts) so it paints instantly.
 * Sets up "The Race Weekend": everything in one place, and the app finds the
 * time for you. The scroll cue hands off to Act 1.
 */
export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* backdrop: faint grid + slow accent glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-secondary-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-secondary-dark) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)',
        }}
      />
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/3 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, color-mix(in srgb, var(--color-primary) 22%, transparent), transparent 60%)',
            filter: 'blur(30px)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <div className="relative z-10 max-w-3xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary-dark bg-grid/60 px-4 py-1.5 text-xs font-medium text-text-sub backdrop-blur"
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: 'var(--color-improved)' }}
          />
          Built for grassroots &amp; club motorsport
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-[Outfit] text-4xl font-semibold leading-[1.08] tracking-tight text-text-select sm:text-6xl"
        >
          Your whole race weekend,
          <br />
          <span style={{ color: 'var(--color-primary)' }}>
            finally in one place.
          </span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-sub"
        >
          The all in one companion that links your setup, telemetry, weather and
          results, then finds the time for you.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href={APP_URL}
            className="rounded-lg px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.03]"
            style={{
              background: 'var(--color-primary)',
              color: 'var(--color-primary-foreground)',
            }}
          >
            Start your 14 day free trial
          </a>
          <a
            href="#pitwall"
            className="rounded-lg border border-secondary-dark px-6 py-3 text-sm font-medium text-text-select transition-colors hover:border-primary"
          >
            See how it works
          </a>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.34 }}
          className="mt-4 text-xs text-text-sub"
        >
          $15/month after trial · no card tricks · cancel anytime
        </motion.p>
      </div>

      {/* scroll cue */}
      {!reduce && (
        <motion.a
          href="#pitwall"
          aria-label="Scroll to start"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-sub"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M6 13l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      )}
    </section>
  )
}
