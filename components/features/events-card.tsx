import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDays, MapPin } from 'lucide-react'

// Representative upcoming-events list, styled to match the app's card system.
const EVENTS = [
  { day: '12', mon: 'Jul', name: 'Winter Series Rd 3', track: 'Winton', cat: 'Formula Ford', source: 'MA' },
  { day: '26', mon: 'Jul', name: 'Sprint Championship', track: 'Sandown', cat: 'Improved Production', source: 'MA' },
  { day: '09', mon: 'Aug', name: 'Club Track Day', track: 'Phillip Island', cat: 'Regularity', source: 'Manual' },
]

export function EventsCard() {
  return (
    <Card className="h-full border-secondary-dark bg-grid">
      <CardHeader className="bg-card-header rounded-t-lg border-b border-secondary-dark">
        <CardTitle className="flex items-center gap-2 font-[Outfit] text-text-select">
          <CalendarDays className="h-5 w-5 text-primary" />
          Upcoming events
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-6">
        {EVENTS.map((e) => (
          <div
            key={e.name}
            className="flex items-center gap-4 rounded-lg border border-secondary-dark bg-grid-sub p-3"
          >
            <div className="flex w-12 shrink-0 flex-col items-center rounded-md border border-secondary-dark bg-grid py-1.5">
              <span className="font-[Outfit] text-lg font-semibold leading-none text-text-select">
                {e.day}
              </span>
              <span className="text-[10px] uppercase text-text-sub">{e.mon}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-text-select">{e.name}</p>
              <p className="flex items-center gap-1 text-xs text-text-sub">
                <MapPin className="h-3 w-3" />
                {e.track} · {e.cat}
              </p>
            </div>
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{
                background: 'var(--color-secondary-dark)',
                color: e.source === 'MA' ? 'var(--color-badge-ma)' : 'var(--color-text-sub)',
              }}
            >
              {e.source}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
