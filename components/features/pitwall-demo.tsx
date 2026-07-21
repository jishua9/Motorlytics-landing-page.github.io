'use client'

import {
  LayoutDashboard,
  Cloud,
  BarChart3,
  Map as MapIcon,
  Calendar,
  Check,
  ArrowRight,
  ClipboardList,
  Flag,
  History,
  ChevronUp,
  ChevronDown,
  Star,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { CurrentConditions } from '@/components/pitwall/weather/current-conditions'
import { RaceResultsTable } from '@/components/features/race-results-table'
import { mockWeather } from '@/lib/mock'

// Faithful representative of the app's pit-wall Dashboard tab: title bar +
// countdown, tab bar, and the 3-column panel grid. Reuses the real
// CurrentConditions and WeekendPositionChart; the other panels are built to
// match the app's card system.

function PwCard({
  title,
  icon: Icon,
  children,
  className = '',
}: {
  title: string
  icon: typeof Cloud
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-secondary-dark bg-grid ${className}`}
    >
      <div className="bg-card-header flex items-center gap-2 border-b border-secondary-dark px-4 py-3">
        <Icon className="h-4 w-4 text-primary" />
        <span className="font-[Outfit] text-sm font-medium text-text-select">
          {title}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 132
  const h = 30
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(' ')
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} />
    </svg>
  )
}

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'weather', label: 'Weather', icon: Cloud },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'circuit', label: 'Circuit', icon: MapIcon },
]

const SESSIONS = [
  { label: 'P1', name: 'Practice 1', best: '1:36.42', done: true, delta: null },
  { label: 'P2', name: 'Practice 2', best: '1:35.87', done: true, delta: '−0.55' },
  { label: 'Q', name: 'Qualifying', best: '1:35.21', done: true, delta: '−0.66' },
  { label: 'R1', name: 'Race 1', best: 'live', done: false, delta: null },
]

const ACTIONS = ['Check front tyre pressures', 'Log fuel used in Q']

export function PitwallDemo() {
  return (
    <div className="overflow-hidden rounded-xl border border-secondary-dark bg-background shadow-2xl">
      {/* Title bar */}
      <div className="bg-card-header flex flex-col gap-3 border-b border-secondary-dark px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <p className="font-[Outfit] font-semibold text-text-select">
            Phillip Island Grand Prix Circuit
          </p>
          <p className="text-xs text-text-sub">
            Winter Series Round 4 · Formula Ford · #7
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-start sm:items-end">
          <span className="text-sm text-text-sub">Race 1 starts in</span>
          <p className="font-mono text-3xl font-bold tabular-nums leading-none text-text-select">
            24:10
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="hide-scrollbar flex gap-6 overflow-x-auto border-b border-secondary-dark px-5">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const active = tab.id === 'dashboard'
          return (
            <div
              key={tab.id}
              className={`-mb-px flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 py-3 text-sm font-medium ${
                active
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-sub'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </div>
          )
        })}
      </div>

      {/* Dashboard grid */}
      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-[1fr_1.9fr_1fr]">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          <PwCard title="Sessions" icon={Calendar}>
            <div className="space-y-2">
              {SESSIONS.map((s) => (
                <div
                  key={s.label}
                  className={cn(
                    'flex items-center gap-2.5 rounded-md border-l-4 py-2 pl-2.5 pr-3',
                    s.done
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-primary bg-primary/10',
                  )}
                >
                  {s.done ? (
                    <Check className="h-4 w-4 shrink-0 text-green-500" />
                  ) : (
                    <ArrowRight className="h-4 w-4 shrink-0 text-primary" />
                  )}
                  <span className="w-7 shrink-0 font-mono text-xs text-text-sub">
                    {s.label}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-text-main">
                    {s.name}
                  </span>
                  {s.done ? (
                    <span className="font-mono text-sm text-text-select">
                      {s.best}
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-primary">Now</span>
                  )}
                </div>
              ))}
            </div>
          </PwCard>

          <PwCard title="Action items" icon={ClipboardList}>
            <ul className="space-y-2">
              {ACTIONS.map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-2.5 text-sm text-text-main"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {a}
                </li>
              ))}
            </ul>
          </PwCard>
        </div>

        {/* Centre column */}
        <div className="flex flex-col gap-4">
          <PwCard title="Weather" icon={Cloud}>
            <div className="overflow-x-auto">
              <div className="min-w-[420px]">
                <CurrentConditions current={mockWeather} />
              </div>
            </div>
          </PwCard>
          <PwCard title="Results" icon={Flag}>
            <p className="mb-2 text-xs text-text-sub">Race 1 · final standings</p>
            <RaceResultsTable />
          </PwCard>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          <PwCard title="Quick Stats" icon={BarChart3}>
            <div className="flex items-center gap-3">
              <span className="font-[Outfit] text-2xl font-bold text-primary">
                P6
              </span>
              <div className="flex gap-4">
                <div>
                  <p className="text-xs text-text-sub">Best Lap</p>
                  <p className="font-mono text-sm text-text-select">1:35.04</p>
                </div>
                <div>
                  <p className="text-xs text-text-sub">Avg Lap</p>
                  <p className="font-mono text-sm text-text-select">1:35.82</p>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-1.5 text-sm">
              <div className="flex items-center gap-2">
                <ChevronUp className="h-3.5 w-3.5 text-green-500" />
                <span className="text-text-sub">P5</span>
                <span className="text-text-sub">Ferrari</span>
                <span className="ml-auto font-mono text-amber-400">+0.41</span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronDown className="h-3.5 w-3.5 text-red-400" />
                <span className="text-text-sub">P7</span>
                <span className="text-text-sub">Kowalski</span>
                <span className="ml-auto font-mono text-amber-400">−0.63</span>
              </div>
            </div>

            <div className="mt-3 rounded-md border border-secondary-dark bg-grid-sub p-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-wide text-text-sub">
                  Change → result
                </span>
                <span className="rounded border border-green-500 px-1.5 py-0.5 text-[10px] font-medium text-green-500">
                  Faster
                </span>
              </div>
              <div className="mt-2 flex gap-5">
                <div>
                  <p className="text-[8px] uppercase tracking-wide text-text-sub">
                    Best Δ
                  </p>
                  <p className="font-mono text-sm text-green-500">−0.30</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-wide text-text-sub">
                    Avg Δ
                  </p>
                  <p className="font-mono text-sm text-green-500">−0.18</p>
                </div>
                <div className="ml-auto self-end">
                  <Sparkline
                    data={[96.4, 95.9, 95.2, 95.5, 95.0, 94.99]}
                    color="var(--color-primary)"
                  />
                </div>
              </div>
            </div>
          </PwCard>

          <PwCard title="Best Match" icon={History}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-semibold text-green-500">
                  94% match
                </span>
                <span className="font-[Outfit] text-xs text-text-sub">
                  Qualifying
                </span>
              </div>
              <p className="truncate text-xs text-text-sub">
                14 May 2026 · Winter Series Round 3
              </p>
              <div className="flex items-center gap-2 text-xs text-text-sub">
                <Cloud className="h-3.5 w-3.5" />
                <span>21°C</span>
                <span className="text-secondary-dark">|</span>
                <span>78% humidity</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={`h-3 w-3 ${
                      n <= 4
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-secondary-dark'
                    }`}
                  />
                ))}
              </div>
              <p className="line-clamp-2 text-xs italic text-text-sub">
                “Softer front bar settled the entry, car came alive in the wet.”
              </p>
            </div>
          </PwCard>
        </div>
      </div>
    </div>
  )
}
