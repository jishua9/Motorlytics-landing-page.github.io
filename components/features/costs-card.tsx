import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'

// Representative season-costs summary, styled to match the app's card system.
const CATEGORIES = [
  { label: 'Tyres', amount: 3240, pct: 34 },
  { label: 'Entry fees', amount: 2100, pct: 22 },
  { label: 'Fuel', amount: 1580, pct: 17 },
  { label: 'Parts', amount: 1490, pct: 16 },
  { label: 'Servicing', amount: 1040, pct: 11 },
]

const TOTAL = CATEGORIES.reduce((sum, c) => sum + c.amount, 0)

const money = (n: number) => `$${n.toLocaleString('en-AU')}`

export function CostsCard() {
  return (
    <Card className="h-full border-secondary-dark bg-grid">
      <CardHeader className="bg-card-header rounded-t-lg border-b border-secondary-dark">
        <CardTitle className="flex items-center gap-2 font-[Outfit] text-text-select">
          <DollarSign className="h-5 w-5 text-primary" />
          Season costs
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-5">
          <p className="text-xs text-text-sub">Total this season</p>
          <p className="font-[Outfit] text-3xl font-semibold text-text-select">
            {money(TOTAL)}
          </p>
        </div>
        <div className="space-y-3">
          {CATEGORIES.map((c) => (
            <div key={c.label}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-text-main">{c.label}</span>
                <span className="font-mono text-text-select">{money(c.amount)}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-grid-sub">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${c.pct}%`, background: 'var(--color-primary)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
