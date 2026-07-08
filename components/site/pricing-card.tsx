const APP_URL = 'https://app.motorlytics.com.au/register'

const PLAN_INCLUDES = [
  'Unlimited events, sessions & cars',
  'Telemetry import & corner analysis',
  'Weather-matched setup insights',
  'Results history & career stats',
  'Everything, no feature gates',
]

export function PricingCard({ includes = PLAN_INCLUDES }: { includes?: string[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-secondary-dark bg-grid">
      <div className="bg-card-header border-b border-secondary-dark p-6 text-center">
        <p className="text-sm font-medium text-text-sub">
          One plan. Everything in it.
        </p>
        <div className="mt-3 flex items-baseline justify-center gap-1">
          <span className="font-[Outfit] text-5xl font-bold text-text-select">
            $15
          </span>
          <span className="text-text-sub">/ month AUD</span>
        </div>
        <p className="mt-2 text-xs text-text-sub">
          Start with a 14 day free trial
        </p>
      </div>
      <div className="p-6">
        <ul className="space-y-3">
          {includes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm text-text-main"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-0.5 shrink-0"
                style={{ color: 'var(--color-improved)' }}
              >
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {item}
            </li>
          ))}
        </ul>
        <a
          href={APP_URL}
          className="mt-6 block rounded-lg py-3 text-center text-sm font-semibold transition-transform hover:scale-[1.02]"
          style={{
            background: 'var(--color-primary)',
            color: 'var(--color-primary-foreground)',
          }}
        >
          Start free trial
        </a>
        <p className="mt-3 text-center text-xs text-text-sub">
          Cancel anytime · no card charged during trial
        </p>
      </div>
    </div>
  )
}
