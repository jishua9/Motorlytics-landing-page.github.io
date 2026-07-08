'use client'

import { useMemo, useState, useCallback } from 'react'
import { Clock, Upload, Pencil, MoreHorizontal } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { formatMsToTime } from './utils/natsoft-parser'
import type { LapTimeEntry } from '@/types/results'

interface LapTimesTableProps {
  lapTimes: LapTimeEntry[] | null
  userRaceNumber?: string | null
  onImportClick: () => void
  onManualClick: () => void
  onEditClick: () => void
}

// Color palette for chart lines
const CHART_COLORS = [
  '#3b82f6', // blue
  '#22c55e', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#06b6d4', // cyan
  '#ec4899', // pink
  '#14b8a6', // teal
  '#f97316', // orange
  '#eab308', // yellow
]

// User highlight color (matches primary color)
const USER_HIGHLIGHT_COLOR = '#e10600'

// Chart axis colors
const AXIS_COLOR = 'var(--theme-text-sub)'
const GRID_COLOR = 'var(--chart-grid)'

// Get consistent color for a driver (user gets special color)
function getDriverColor(index: number, isUser: boolean): string {
  if (isUser) return USER_HIGHLIGHT_COLOR
  return CHART_COLORS[index % CHART_COLORS.length]
}

// Helper to normalize race numbers for comparison
function normalizeRaceNumber(num: string | null | undefined): string {
  if (!num) return ''
  return num.trim().replace(/^0+/, '') || '0'
}

export function LapTimesTable({
  lapTimes,
  userRaceNumber,
  onImportClick,
  onManualClick,
  onEditClick,
}: LapTimesTableProps) {
  const [selectedDrivers, setSelectedDrivers] = useState<Set<string>>(new Set())

  // Normalize user race number once for comparison
  const normalizedUserNumber = normalizeRaceNumber(userRaceNumber)

  // Helper to check if a driver number matches the user
  const isUserDriver = useCallback((driverNumber: string): boolean => {
    return normalizedUserNumber !== '' && normalizeRaceNumber(driverNumber) === normalizedUserNumber
  }, [normalizedUserNumber])

  // Calculate stats for each driver
  const driverStats = useMemo(() => {
    if (!lapTimes) return []

    return lapTimes.map(entry => {
      const validLaps = entry.laps.filter(t => t > 0)
      const bestLap = validLaps.length > 0 ? Math.min(...validLaps) : 0
      const bestIndex = entry.laps.indexOf(bestLap)

      return {
        ...entry,
        bestLap,
        bestIndex: bestIndex >= 0 ? bestIndex : 0,
      }
    })
  }, [lapTimes])

  // Sort stats by best lap (user always first)
  const sortedStats = useMemo(() => {
    return [...driverStats].sort((a, b) => {
      const aIsUser = isUserDriver(a.number)
      const bIsUser = isUserDriver(b.number)
      if (aIsUser && !bIsUser) return -1
      if (!aIsUser && bIsUser) return 1
      return a.bestLap - b.bestLap
    })
  }, [driverStats, isUserDriver])

  // Initialize selected drivers (all by default)
  const initialSelectedDrivers = useMemo(() => {
    if (!lapTimes || lapTimes.length === 0) return new Set<string>()
    return new Set(lapTimes.map(d => d.number))
  }, [lapTimes])

  // Use initial selection if selectedDrivers is empty
  const activeDrivers = selectedDrivers.size > 0 ? selectedDrivers : initialSelectedDrivers

  // Toggle driver selection
  const toggleDriver = useCallback((number: string) => {
    setSelectedDrivers(prev => {
      const next = new Set(prev.size > 0 ? prev : initialSelectedDrivers)
      if (next.has(number)) {
        next.delete(number)
      } else {
        next.add(number)
      }
      return next
    })
  }, [initialSelectedDrivers])

  // Max laps across all drivers
  const maxLaps = useMemo(() => {
    if (!lapTimes || lapTimes.length === 0) return 0
    return Math.max(...lapTimes.map(d => d.laps.length))
  }, [lapTimes])

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!lapTimes || lapTimes.length === 0) return []

    const data: Record<string, number | string>[] = []
    for (let lap = 0; lap < maxLaps; lap++) {
      const point: Record<string, number | string> = { lap: `Lap ${lap + 1}` }

      lapTimes.forEach(driver => {
        if (lap < driver.laps.length && driver.laps[lap] > 0) {
          point[driver.number] = driver.laps[lap] / 1000
        }
      })

      data.push(point)
    }

    return data
  }, [lapTimes, maxLaps])

  // Find overall fastest lap for reference line
  const fastestLapTime = useMemo(() => {
    if (driverStats.length === 0) return 0
    return Math.min(...driverStats.map(d => d.bestLap).filter(t => t > 0)) / 1000
  }, [driverStats])

  // Empty state
  if (!lapTimes || lapTimes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Clock className="h-12 w-12 text-text-sub mb-4" />
        <h3 className="font-[Outfit] text-lg font-medium text-text-select mb-2">No Lap Times Yet</h3>
        <p className="text-text-sub text-sm mb-6 text-center max-w-md">
          Import lap times from Natsoft or add them manually.
        </p>
        <div className="flex flex-col gap-2">
          <Button onClick={onImportClick}>
            <Upload className="h-4 w-4 mr-2" />
            Import Lap Times
          </Button>
          <Button
            variant="outline"
            onClick={onManualClick}
            className="border-secondary-dark text-text hover:bg-grid-sub"
          >
            Input Manually
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Chart section */}
      <div className="border border-secondary-dark rounded-lg overflow-hidden">
        {/* Chart header */}
        <div className="px-4 py-3 bg-grid-sub/50 border-b border-secondary-dark flex items-center justify-between">
          <h3 className="font-[Outfit] font-medium text-text text-sm">Lap Times Comparison</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-secondary-dark text-text hover:bg-grid-sub">
                <MoreHorizontal className="h-4 w-4 mr-2" />
                Options
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-grid border-secondary-dark">
              <DropdownMenuItem onClick={onEditClick} className="text-text hover:bg-grid-sub cursor-pointer">
                <Pencil className="h-4 w-4 mr-2" />
                Edit Lap Times
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onImportClick} className="text-text hover:bg-grid-sub cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Re-import from Natsoft
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Chart + legend side by side */}
        <div className="flex">
          {/* Chart */}
          <div className="flex-1 min-w-0 p-4">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />
                <XAxis
                  dataKey="lap"
                  stroke={AXIS_COLOR}
                  fontSize={11}
                  tickLine={false}
                  tick={{ fill: AXIS_COLOR }}
                />
                <YAxis
                  stroke={AXIS_COLOR}
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(value) => formatMsToTime(value * 1000)}
                  domain={['auto', 'auto']}
                  tick={{ fill: AXIS_COLOR }}
                  width={70}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--chart-tooltip-bg)',
                    border: '1px solid var(--chart-grid-light)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'var(--chart-tooltip-text)' }}
                  itemStyle={{ color: 'var(--chart-tooltip-text)' }}
                  formatter={(value, name) => {
                    if (typeof value !== 'number') return ['-', name]
                    const driver = sortedStats.find(s => s.number === name)
                    return [formatMsToTime(value * 1000), driver ? `#${name} ${driver.driver}` : `#${name}`]
                  }}
                />
                {/* Fastest lap reference line */}
                {fastestLapTime > 0 && (
                  <ReferenceLine
                    y={fastestLapTime}
                    stroke="#22c55e"
                    strokeDasharray="5 5"
                    strokeOpacity={0.4}
                  />
                )}
                {/* Driver lines */}
                {sortedStats.map((stat, index) => {
                  if (!activeDrivers.has(stat.number)) return null
                  const isUser = isUserDriver(stat.number)
                  const color = getDriverColor(index, isUser)
                  return (
                    <Line
                      key={stat.number}
                      type="monotone"
                      dataKey={stat.number}
                      stroke={color}
                      strokeWidth={isUser ? 3 : 1.5}
                      dot={false}
                      activeDot={{ r: 4, fill: color }}
                      connectNulls
                    />
                  )
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend - right side, scrollable */}
          <div className="w-48 flex-shrink-0 border-l border-secondary-dark p-3 overflow-y-auto max-h-[400px]">
            <div className="space-y-1">
              {sortedStats.map((stat, index) => {
                const isUser = isUserDriver(stat.number)
                const isSelected = activeDrivers.has(stat.number)
                const color = getDriverColor(index, isUser)

                return (
                  <button
                    key={stat.number}
                    type="button"
                    onClick={() => toggleDriver(stat.number)}
                    className={cn(
                      'flex items-center gap-2 w-full px-2 py-1 rounded text-left transition-colors',
                      isSelected ? 'opacity-100' : 'opacity-40',
                      'hover:bg-grid-sub/50'
                    )}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className={cn(
                      'text-xs truncate',
                      isUser ? 'text-primary font-semibold' : 'text-text'
                    )}>
                      {stat.number} {stat.driver}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Lap times table */}
      <div className="border border-secondary-dark rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-grid-sub sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left font-[Outfit] font-medium text-text whitespace-nowrap sticky left-0 bg-grid-sub z-10">No.</th>
              <th className="px-4 py-3 text-left font-[Outfit] font-medium text-text whitespace-nowrap sticky left-[52px] bg-grid-sub z-10">Driver</th>
              {Array.from({ length: maxLaps }, (_, i) => (
                <th key={i} className="px-3 py-3 text-center font-[Outfit] font-medium text-text whitespace-nowrap">
                  Lap {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedStats.map((stat, rowIndex) => {
              const isUser = isUserDriver(stat.number)

              return (
                <tr
                  key={`${stat.number}-${rowIndex}`}
                  className={cn(
                    'border-t border-secondary-dark transition-colors hover:bg-grid-sub/50',
                    rowIndex % 2 === 1 && 'bg-grid-sub/30',
                    isUser && 'bg-primary/10',
                  )}
                >
                  <td className={cn(
                    'px-4 py-2 font-mono text-text whitespace-nowrap sticky left-0 z-10',
                    isUser ? 'bg-primary/10' : rowIndex % 2 === 1 ? 'bg-grid-sub/30' : 'bg-grid',
                  )}>
                    {stat.number}
                  </td>
                  <td className={cn(
                    'px-4 py-2 whitespace-nowrap sticky left-[52px] z-10',
                    isUser ? 'font-semibold text-primary bg-primary/10' : rowIndex % 2 === 1 ? 'text-text bg-grid-sub/30' : 'text-text bg-grid',
                  )}>
                    {stat.driver}
                  </td>
                  {Array.from({ length: maxLaps }, (_, lapIndex) => {
                    const time = lapIndex < stat.laps.length ? stat.laps[lapIndex] : 0
                    const isBest = time > 0 && lapIndex === stat.bestIndex

                    return (
                      <td
                        key={lapIndex}
                        className={cn(
                          'px-3 py-2 text-center font-mono whitespace-nowrap',
                          isBest ? 'text-green-500 font-semibold' : 'text-text',
                        )}
                      >
                        {time > 0 ? formatMsToTime(time) : ''}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
