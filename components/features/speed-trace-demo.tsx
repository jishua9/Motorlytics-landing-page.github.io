'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

// A representative speed-over-distance trace for one lap: your best lap vs a
// reference lap. Built to read like the telemetry Charts tab (speed dips into
// corners, rises down straights), showing where the lap was quicker.
type Point = { d: number; best: number; ref: number }

const DATA: Point[] = [
  { d: 0, best: 218, ref: 216 },
  { d: 150, best: 236, ref: 233 },
  { d: 300, best: 244, ref: 242 },
  { d: 450, best: 152, ref: 150 },
  { d: 600, best: 138, ref: 134 },
  { d: 750, best: 126, ref: 121 },
  { d: 900, best: 148, ref: 143 },
  { d: 1050, best: 182, ref: 178 },
  { d: 1200, best: 205, ref: 203 },
  { d: 1350, best: 168, ref: 166 },
  { d: 1500, best: 132, ref: 130 },
  { d: 1650, best: 158, ref: 156 },
  { d: 1800, best: 196, ref: 193 },
  { d: 1950, best: 214, ref: 210 },
  { d: 2100, best: 176, ref: 170 },
  { d: 2250, best: 122, ref: 116 },
  { d: 2400, best: 140, ref: 136 },
  { d: 2550, best: 172, ref: 169 },
  { d: 2700, best: 158, ref: 157 },
  { d: 2850, best: 134, ref: 133 },
  { d: 3000, best: 150, ref: 148 },
  { d: 3150, best: 188, ref: 185 },
  { d: 3300, best: 210, ref: 207 },
  { d: 3450, best: 228, ref: 226 },
  { d: 3600, best: 162, ref: 158 },
  { d: 3750, best: 128, ref: 122 },
  { d: 3900, best: 146, ref: 141 },
  { d: 4050, best: 190, ref: 187 },
  { d: 4200, best: 212, ref: 210 },
  { d: 4350, best: 224, ref: 223 },
]

export function SpeedTraceDemo() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={DATA} margin={{ top: 8, right: 12, left: 4, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" opacity={0.35} />
        <XAxis
          dataKey="d"
          stroke="var(--chart-axis)"
          tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
          tickFormatter={(v) => `${v}m`}
        />
        <YAxis
          stroke="var(--chart-axis)"
          tick={{ fill: 'var(--chart-axis)', fontSize: 11 }}
          width={38}
          tickFormatter={(v) => `${v}`}
          label={{
            value: 'km/h',
            angle: -90,
            position: 'insideLeft',
            style: { fill: 'var(--chart-axis)', fontSize: 11 },
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--chart-tooltip-bg)',
            border: '1px solid var(--chart-grid-light)',
            borderRadius: '8px',
          }}
          labelStyle={{ color: 'var(--chart-tooltip-text)' }}
          itemStyle={{ color: 'var(--chart-tooltip-text)' }}
          labelFormatter={(v) => `${v} m`}
          formatter={(value, name) => [`${value} km/h`, name]}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line
          type="monotone"
          dataKey="ref"
          name="Reference lap"
          stroke="var(--color-badge-cyan)"
          strokeWidth={1.5}
          strokeDasharray="4 3"
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="best"
          name="Your best lap"
          stroke="var(--color-primary)"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
