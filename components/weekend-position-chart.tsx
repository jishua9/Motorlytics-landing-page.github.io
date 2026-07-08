'use client'

import { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface WeekendPositionChartProps {
  positions: string[][] | null // positions[lap][positionIndex] = raceNumber
  userRaceNumber: string
  totalEntries: number
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function WeekendPositionChart({
  positions,
  userRaceNumber,
  totalEntries,
}: WeekendPositionChartProps) {
  // ---- Transform position data into chart-ready format --------------------
  const { chartData, raceNumbers } = useMemo(() => {
    if (!positions || positions.length === 0) {
      return { chartData: [], raceNumbers: [] }
    }

    const numbersSet = new Set<string>()

    const data = positions.map((lapPositions, lapIndex) => {
      const point: Record<string, number | string> = { lap: lapIndex + 1 }
      lapPositions.forEach((raceNumber, posIndex) => {
        point[`driver_${raceNumber}`] = posIndex + 1
        numbersSet.add(raceNumber)
      })
      return point
    })

    return { chartData: data, raceNumbers: Array.from(numbersSet) }
  }, [positions])

  // ---- Custom tooltip -----------------------------------------------------
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const TooltipContent = ({ active, payload, label }: any) => {
      if (!active || !payload || !payload.length || !positions) return null

      const lapIndex = (label as number) - 1
      if (lapIndex < 0 || lapIndex >= positions.length) return null

      const lapPositions = positions[lapIndex]

      // Find the user's position this lap
      const userPosition = lapPositions.indexOf(userRaceNumber)

      // Show positions around the user (3 above and 3 below)
      const contextRange = 3
      const startPos = Math.max(0, userPosition - contextRange)
      const endPos = Math.min(lapPositions.length - 1, userPosition + contextRange)

      return (
        <div
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--secondary-dark)',
            borderRadius: '6px',
            padding: '8px 12px',
          }}
        >
          <p style={{ color: 'var(--text)', marginBottom: '4px', fontSize: '12px' }}>
            Lap {label}
          </p>
          {startPos > 0 && (
            <p style={{ color: 'var(--text-sub)', fontSize: '11px', margin: '2px 0' }}>
              ...
            </p>
          )}
          {lapPositions.slice(startPos, endPos + 1).map((raceNumber, i) => {
            const position = startPos + i + 1
            const isUser = raceNumber === userRaceNumber

            return (
              <p
                key={position}
                style={{
                  color: isUser ? 'var(--primary)' : 'var(--text-sub)',
                  fontSize: '12px',
                  margin: '2px 0',
                  fontWeight: isUser ? 600 : 400,
                }}
              >
                P{position}: #{raceNumber}
              </p>
            )
          })}
          {endPos < lapPositions.length - 1 && (
            <p style={{ color: 'var(--text-sub)', fontSize: '11px', margin: '2px 0' }}>
              ...
            </p>
          )}
        </div>
      )
    }

    TooltipContent.displayName = 'PositionTooltip'
    return TooltipContent
  }, [positions, userRaceNumber])

  // ---- Empty state --------------------------------------------------------
  if (!positions || positions.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-text-sub text-sm">
        No position data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--chart-grid)"
          opacity={0.3}
        />
        <XAxis
          dataKey="lap"
          stroke="var(--chart-axis)"
          tick={{ fill: 'var(--chart-axis)', fontSize: 12 }}
          label={{
            value: 'Lap',
            position: 'insideBottomRight',
            offset: -5,
            style: { fill: 'var(--chart-axis)', fontSize: 11 },
          }}
        />
        <YAxis
          domain={[1, totalEntries]}
          reversed={true}
          stroke="var(--chart-axis)"
          tick={{ fill: 'var(--chart-axis)', fontSize: 12 }}
          width={40}
          label={{
            value: 'Position',
            angle: -90,
            position: 'insideLeft',
            style: { fill: 'var(--chart-axis)', fontSize: 11 },
          }}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />

        {/* Other drivers' lines - rendered first so user line is on top */}
        {raceNumbers
          .filter((num) => num !== userRaceNumber)
          .map((raceNumber) => (
            <Line
              key={raceNumber}
              type="monotone"
              dataKey={`driver_${raceNumber}`}
              stroke="var(--text-sub)"
              strokeWidth={1}
              strokeOpacity={0.2}
              dot={false}
              isAnimationActive={false}
              connectNulls={true}
            />
          ))}

        {/* User's line - rendered last so it's on top */}
        <Line
          type="monotone"
          dataKey={`driver_${userRaceNumber}`}
          stroke="var(--primary)"
          strokeWidth={2}
          dot={{ r: 3, fill: 'var(--primary)', stroke: 'var(--primary)' }}
          isAnimationActive={false}
          connectNulls={true}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
