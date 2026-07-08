// Representative setup sheet, styled to match the app's setup tab (corner-based
// FL/FR/RL/RR cards + single-value metrics). Static preview, no app coupling.

type Corner = { fl: string; fr: string; rl: string; rr: string }

function CornerMetric({
  label,
  unit,
  values,
}: {
  label: string
  unit: string
  values: Corner
}) {
  const cells: [string, string][] = [
    ['FL', values.fl],
    ['FR', values.fr],
    ['RL', values.rl],
    ['RR', values.rr],
  ]
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm text-text-main">{label}</span>
        <span className="text-xs text-text-sub">{unit}</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {cells.map(([corner, v]) => (
          <div
            key={corner}
            className="flex items-center justify-between rounded-md border border-secondary-dark bg-grid-sub px-2.5 py-1.5"
          >
            <span className="text-[10px] font-medium uppercase text-text-sub">
              {corner}
            </span>
            <span className="font-mono text-sm text-text-select">{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SingleMetric({
  label,
  unit,
  value,
}: {
  label: string
  unit: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-secondary-dark bg-grid-sub px-3 py-2">
      <span className="text-sm text-text-main">{label}</span>
      <span className="font-mono text-sm text-text-select">
        {value}
        <span className="ml-1 text-xs text-text-sub">{unit}</span>
      </span>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-primary">
        {title}
      </p>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

export function SetupSheetDemo() {
  return (
    <div className="overflow-hidden rounded-lg border border-secondary-dark bg-grid">
      <div className="bg-card-header flex items-center justify-between border-b border-secondary-dark px-4 py-3">
        <div>
          <p className="font-[Outfit] text-sm font-medium text-text-select">
            Setup Sheet · Formula Ford
          </p>
          <p className="text-xs text-text-sub">Qualifying · Phillip Island</p>
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-[11px] font-medium"
          style={{
            background: 'var(--color-secondary-dark)',
            color: 'var(--color-improved)',
          }}
        >
          94% weather match
        </span>
      </div>

      <div className="grid gap-6 p-4 sm:grid-cols-2">
        <Section title="Tyres">
          <CornerMetric
            label="Cold pressure"
            unit="psi"
            values={{ fl: '16.5', fr: '16.5', rl: '15.0', rr: '15.0' }}
          />
          <CornerMetric
            label="Camber"
            unit="deg"
            values={{ fl: '-2.8', fr: '-2.8', rl: '-1.6', rr: '-1.6' }}
          />
        </Section>

        <Section title="Suspension">
          <SingleMetric label="Ride height (F)" unit="mm" value="42" />
          <SingleMetric label="Ride height (R)" unit="mm" value="55" />
          <SingleMetric label="Front ARB" unit="pos" value="3 / 5" />
          <SingleMetric label="Rear ARB" unit="pos" value="2 / 5" />
          <SingleMetric label="Spring rate (F)" unit="N/mm" value="52" />
          <SingleMetric label="Spring rate (R)" unit="N/mm" value="48" />
        </Section>
      </div>
    </div>
  )
}
