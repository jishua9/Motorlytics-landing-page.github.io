'use client'
// Copied verbatim from Motorlytics app:
// components/pitwall/analytics-tab/setup-correlation/weekend-pace-chart.tsx
// Only change: import path for formatLapMs points at the local copy.
import {
  ComposedChart,
  Line,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatLapMs } from '@/lib/utils/lap-stats'

interface PaceSession {
  id: string
  name: string
  bestLapMs: number | null
  avgLapMs: number | null
  isBaseline: boolean
  changed: boolean
}

function BestDot(props: {
  cx?: number
  cy?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
  baselineSec: number | null
}) {
  const { cx, cy, payload, baselineSec } = props
  if (cx == null || cy == null || payload?.best == null) return null
  const beat = baselineSec != null && payload.best < baselineSec
  return <circle cx={cx} cy={cy} r={4} fill={beat ? '#1afc52' : '#FF5252'} />
}

export function WeekendPaceChart({
  sessions,
  baselineSessionId,
}: {
  sessions: PaceSession[]
  baselineSessionId: string | undefined
}) {
  const data = sessions.map((s) => ({
    name: s.name,
    best: s.bestLapMs != null ? s.bestLapMs / 1000 : null,
    avg: s.avgLapMs != null ? s.avgLapMs / 1000 : null,
  }))

  // Baseline reference = pinned session's best lap, else first session with a best lap.
  const baseSession = baselineSessionId
    ? sessions.find((s) => s.id === baselineSessionId)
    : sessions.find((s) => s.bestLapMs != null)
  const baselineSec = baseSession?.bestLapMs != null ? baseSession.bestLapMs / 1000 : null

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 16, right: 16, bottom: 8, left: 4 }}>
          <CartesianGrid stroke="var(--color-secondary-dark)" strokeOpacity={0.3} vertical={false} />
          <XAxis dataKey="name" stroke="var(--color-text-sub)" fontSize={10} />
          <YAxis
            reversed
            domain={['auto', 'auto']}
            stroke="var(--color-text-sub)"
            fontSize={10}
            tickFormatter={(v: number) => formatLapMs(v * 1000)}
            width={58}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--color-grid-title)',
              border: '1px solid var(--color-secondary-dark)',
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(v: any, n: any) => [formatLapMs((v as number) * 1000), n === 'best' ? 'Best' : 'Avg'] as any}
          />
          {baselineSec != null && (
            <ReferenceLine
              y={baselineSec}
              stroke="#ff8800"
              strokeDasharray="5 3"
              label={{ value: 'baseline', fill: '#ff8800', fontSize: 9, position: 'insideTopRight' }}
            />
          )}
          <Line
            type="monotone"
            dataKey="avg"
            stroke="#00E5FF"
            strokeWidth={2}
            strokeDasharray="4 3"
            dot={false}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="best"
            stroke="#ff8800"
            strokeWidth={2.5}
            dot={<BestDot baselineSec={baselineSec} />}
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
