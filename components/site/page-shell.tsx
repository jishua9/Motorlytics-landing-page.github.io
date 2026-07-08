import type { ReactNode } from 'react'
import { SiteNav } from './site-nav'
import { SiteFooter } from './site-footer'

/** Standard chrome for non-story pages (Features / About / Pricing). */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className="pt-16">{children}</main>
      <SiteFooter />
    </>
  )
}
