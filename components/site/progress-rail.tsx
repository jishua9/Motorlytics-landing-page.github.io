'use client'

import { useEffect, useState } from 'react'
import { ACTS } from '@/lib/story'

/**
 * Fixed vertical rail on the left edge that tracks which act is in view the
 * "lap counter" for the story. Uses IntersectionObserver to spotlight the
 * active section. Hidden on small screens (the story stacks there).
 */
export function ProgressRail() {
  const [active, setActive] = useState(ACTS[0]?.id ?? '')

  useEffect(() => {
    const sections = ACTS.map((a) => document.getElementById(a.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    )
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Story progress"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ol className="flex flex-col gap-4">
        {ACTS.map((act, i) => {
          const isActive = act.id === active
          return (
            <li key={act.id}>
              <a
                href={`#${act.id}`}
                className="group flex items-center gap-3"
                aria-current={isActive ? 'true' : undefined}
              >
                <span
                  className="grid h-6 w-6 place-items-center rounded-full border text-[10px] font-medium transition-all duration-300"
                  style={{
                    borderColor: isActive
                      ? 'var(--color-primary)'
                      : 'var(--color-secondary-dark)',
                    background: isActive
                      ? 'var(--color-primary)'
                      : 'transparent',
                    color: isActive
                      ? 'var(--color-primary-foreground)'
                      : 'var(--color-text-sub)',
                  }}
                >
                  {i + 1}
                </span>
                <span
                  className={`text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-text-select opacity-100'
                      : 'text-text-sub opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {act.label}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
