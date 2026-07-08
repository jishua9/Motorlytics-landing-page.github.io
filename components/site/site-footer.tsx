const FOOTER_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Sign in', href: 'https://app.motorlytics.com.au/login' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-secondary-dark py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
        <a href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.svg"
            alt="Motorlytics"
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <div className="leading-tight">
            <span className="block font-[Outfit] font-semibold text-text-select">
              Motorlytics
            </span>
            <span className="block text-xs text-text-sub">Race Analytics</span>
          </div>
        </a>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-sub">
          {FOOTER_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="transition-colors hover:text-text-select"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-8 max-w-6xl px-6 text-xs text-text-sub">
        © 2026 Munro Motorsports · Built in Australia for grassroots &amp; club
        motorsport
      </div>
    </footer>
  )
}
