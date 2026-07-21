'use client'

import { LapTimesTable } from '@/components/sessions/results-tab/lap-times-table'
import { mockLapTimes, mockUserLapNumber } from '@/lib/mock'

const noop = () => {}

/**
 * The real LapTimesTable fed a mock Natsoft-style field of fake drivers.
 * Your car (#7) is highlighted against the pack, fastest lap marked.
 */
export function ResultsDemo() {
  return (
    // The real component lays a flex-1 chart beside a fixed 192px legend, so on
    // a phone the chart is squeezed to zero width and only the axis labels show.
    // Give it a floor and let the panel scroll sideways rather than render an
    // invisible chart.
    <div className="overflow-x-auto">
      <div className="min-w-[760px]">
        <LapTimesTable
          lapTimes={mockLapTimes}
          userRaceNumber={mockUserLapNumber}
          onImportClick={noop}
          onManualClick={noop}
          onEditClick={noop}
        />
      </div>
    </div>
  )
}
