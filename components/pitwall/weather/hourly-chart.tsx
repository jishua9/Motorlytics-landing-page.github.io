'use client'

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from 'recharts'
import { formatInTz, getSessionEndTime } from '@/lib/utils/date'
import type { WeatherData } from '@/lib/services/weather'

// Minimal mirror of the Prisma UserSession fields this chart reads.
type UserSession = {
  id: string
  startTime: Date | string
  sessionLength: number
  sessionType: string
  sessionNumber: number | null
}

interface HourlyChartProps {
  hourlyData: WeatherData[]
  sessions: UserSession[]
  timezone: string
}

interface ChartDataPoint {
  time: number
  timeLabel: string
  temp: number
  windSpeed: number
  windDeg: number
  windArrow: string
  precipitation: number
}

/**
 * Session type to color mapping
 */
const SESSION_COLORS: Record<string, string> = {
  Practice: '#22c55e',    // green
  Qualifying: '#eab308',  // yellow
  Race: '#ef4444',        // red
}

/**
 * Convert m/s to km/h
 */
function msToKmh(ms: number): number {
  return Math.round(ms * 3.6)
}

/**
 * Get arrow character for wind direction
 * Arrow points in the direction the wind is blowing TO (opposite of where it comes from)
 */
function getWindArrow(degrees: number): string {
  const arrows = ['↓', '↙', '←', '↖', '↑', '↗', '→', '↘']
  const index = Math.round(((degrees % 360) / 45)) % 8
  return arrows[index]
}

/**
 * Convert wind degrees to cardinal direction
 */
function degreesToCardinal(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const index = Math.round(((degrees % 360) / 45)) % 8
  return directions[index]
}

/**
 * Get sessions within the chart time range
 */
function getSessionsInRange(
  sessions: UserSession[],
  startTime: number,
  endTime: number
): UserSession[] {
  return sessions.filter((session) => {
    const sessionStart = new Date(session.startTime).getTime()
    const sessionEnd = getSessionEndTime(session.startTime, session.sessionLength).getTime()
    // Session is in range if it starts or ends within the range
    return (
      (sessionStart >= startTime && sessionStart <= endTime) ||
      (sessionEnd >= startTime && sessionEnd <= endTime) ||
      (sessionStart <= startTime && sessionEnd >= endTime)
    )
  })
}

/**
 * Format timestamp for x-axis display
 */
function formatTimeForAxis(timestamp: number, timezone: string): string {
  return formatInTz(new Date(timestamp), timezone, 'HH:mm')
}

/**
 * Custom dot component that shows wind direction arrows
 */
function WindDirectionDot(props: {
  cx?: number
  cy?: number
  payload?: ChartDataPoint
  index?: number
}) {
  const { cx, cy, payload, index } = props

  // Only show every 2nd or 3rd point to avoid clutter (depending on data density)
  if (cx === undefined || cy === undefined || !payload || (index !== undefined && index % 2 !== 0)) {
    return null
  }

  return (
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      dominantBaseline="central"
      fill="#FFFFFF"
      fontSize={20}
      fontWeight="bold"
    >
      {payload.windArrow}
    </text>
  )
}

/**
 * Custom tooltip component
 */
function CustomTooltip({ active, payload }: {
  active?: boolean
  payload?: Array<{ dataKey: string; value: number; color: string; payload?: ChartDataPoint }>
}) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const temp = payload.find((p) => p.dataKey === 'temp')
  const wind = payload.find((p) => p.dataKey === 'windSpeed')
  const precip = payload.find((p) => p.dataKey === 'precipitation')

  // Get data from payload including formatted time
  const dataPoint = payload[0]?.payload
  const timeLabel = dataPoint?.timeLabel ?? ''
  const windArrow = dataPoint?.windArrow ?? ''
  const windDirection = dataPoint?.windDeg !== undefined ? degreesToCardinal(dataPoint.windDeg) : ''

  return (
    <div className="bg-background border border-secondary-dark rounded-lg p-3 shadow-lg">
      <p className="font-medium text-base text-text mb-2">{timeLabel}</p>
      <div className="space-y-1 text-sm">
        {temp && (
          <p className="text-orange-500">
            Temperature: {temp.value}&deg;C
          </p>
        )}
        {wind && (
          <p className="text-blue-500">
            Wind: {wind.value} km/h <span className="text-lg">{windArrow}</span> {windDirection}
          </p>
        )}
        {precip !== undefined && (
          <p className="text-cyan-500">
            Rain: {precip.value} mm
          </p>
        )}
      </div>
    </div>
  )
}

export function HourlyChart({ hourlyData, sessions, timezone }: HourlyChartProps) {
  // Transform weather data for the chart
  const chartData: ChartDataPoint[] = hourlyData.map((hour) => ({
    time: hour.dt * 1000, // Convert to milliseconds
    timeLabel: formatInTz(new Date(hour.dt * 1000), timezone, 'HH:mm'),
    temp: Math.round(hour.temp),
    windSpeed: msToKmh(hour.wind_speed),
    windDeg: hour.wind_deg,
    windArrow: getWindArrow(hour.wind_deg),
    precipitation: hour.rain?.['1h'] ?? 0,
  }))

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-text-sub text-sm">
        No hourly forecast data available
      </div>
    )
  }

  // Get time range for session filtering
  const startTime = chartData[0].time
  const endTime = chartData[chartData.length - 1].time

  // Get sessions within the chart range
  const sessionsInRange = getSessionsInRange(sessions, startTime, endTime)

  // Calculate Y-axis domains
  const temps = chartData.map((d) => d.temp)
  const minTemp = Math.min(...temps) - 2
  const maxTemp = Math.max(...temps) + 2

  const windSpeeds = chartData.map((d) => d.windSpeed)
  const maxWind = Math.max(...windSpeeds, 20)

  const precipitations = chartData.map((d) => d.precipitation)
  const maxPrecip = Math.max(...precipitations, 2)

  return (
    <div className="h-full flex gap-4">
      <div className="flex-1 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" opacity={0.5} />

          {/* Use numeric time for x-axis to allow precise session positioning */}
          <XAxis
            dataKey="time"
            type="number"
            scale="time"
            domain={[startTime, endTime]}
            tick={{ fill: 'var(--chart-axis)', fontSize: 12 }}
            axisLine={{ stroke: 'var(--chart-grid-light)' }}
            tickLine={{ stroke: 'var(--chart-grid-light)' }}
            tickFormatter={(value) => formatTimeForAxis(value, timezone)}
            interval="preserveStartEnd"
          />

          {/* Temperature Y-axis (left) */}
          <YAxis
            yAxisId="temp"
            orientation="left"
            domain={[minTemp, maxTemp]}
            tick={{ fill: '#f97316', fontSize: 12 }}
            axisLine={{ stroke: 'var(--chart-grid-light)' }}
            tickLine={{ stroke: 'var(--chart-grid-light)' }}
            tickFormatter={(value) => `${value}°`}
          />

          {/* Wind Y-axis (right) - hidden but used for scaling */}
          <YAxis
            yAxisId="wind"
            orientation="right"
            domain={[0, maxWind]}
            hide
          />

          {/* Precipitation Y-axis - hidden but used for scaling */}
          <YAxis
            yAxisId="precip"
            orientation="right"
            domain={[0, maxPrecip]}
            hide
          />

          <Tooltip content={<CustomTooltip />} />

          {/* Session markers as shaded areas */}
          {sessionsInRange.map((session) => {
            const sessionStart = new Date(session.startTime).getTime()
            const sessionEnd = getSessionEndTime(session.startTime, session.sessionLength).getTime()
            const color = SESSION_COLORS[session.sessionType] ?? '#6b7280'
            const sessionLabel = `${session.sessionType[0]}${session.sessionNumber ?? ''}`

            // Clamp session times to chart range
            const clampedStart = Math.max(sessionStart, startTime)
            const clampedEnd = Math.min(sessionEnd, endTime)

            return (
              <ReferenceArea
                key={session.id}
                x1={clampedStart}
                x2={clampedEnd}
                yAxisId="temp"
                fill={color}
                fillOpacity={0.15}
                stroke={color}
                strokeWidth={1}
                strokeOpacity={0.5}
                label={{
                  value: sessionLabel,
                  position: 'insideTop',
                  fill: color,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}
              />
            )
          })}

          {/* Rain bars */}
          <Bar
            yAxisId="precip"
            dataKey="precipitation"
            fill="#22d3ee"
            opacity={0.6}
            barSize={8}
          />

          {/* Temperature line */}
          <Line
            yAxisId="temp"
            type="monotone"
            dataKey="temp"
            stroke="#f97316"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#f97316' }}
          />

          {/* Wind speed line with direction arrows */}
          <Line
            yAxisId="wind"
            type="monotone"
            dataKey="windSpeed"
            stroke="#3b82f6"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={<WindDirectionDot />}
            activeDot={{ r: 4, fill: '#3b82f6' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      </div>

      {/* Legend - vertical on right side */}
      <div className="flex flex-col justify-center gap-2 text-xs text-text-sub flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-orange-500" />
          <span>Temp</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-blue-500 border-dashed" style={{ borderTop: '2px dashed' }} />
          <span>Wind</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 bg-cyan-500/60 rounded-sm" />
          <span>Rain</span>
        </div>
        {sessionsInRange.length > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-2 bg-green-500/30 border border-green-500/50 rounded-sm" />
            <span>Sessions</span>
          </div>
        )}
      </div>
    </div>
  )
}
