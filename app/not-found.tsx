import type { Metadata } from 'next'
import { PageShell } from '@/components/site/page-shell'

export const metadata: Metadata = {
  title: 'Page not found · Motorlytics',
}

export default function NotFound() {
  return (
    <PageShell>
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-secondary-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-secondary-dark) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 75%)',
          }}
        />
        <div className="relative max-w-lg">
          <p
            className="font-mono text-6xl font-bold leading-none"
            style={{ color: 'var(--color-primary)' }}
          >
            404
          </p>
          <h1 className="mt-5 font-[Outfit] text-3xl font-semibold text-text-select">
            This page is not on the map
          </h1>
          <p className="mx-auto mt-4 max-w-md text-text-sub">
            The page you are after has either moved or never existed. Let us get
            you back on track.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/"
              className="rounded-lg px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.03]"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
              }}
            >
              Back to home
            </a>
            <a
              href="/features/"
              className="rounded-lg border border-secondary-dark px-6 py-3 text-sm font-medium text-text-select transition-colors hover:border-primary"
            >
              See the features
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
