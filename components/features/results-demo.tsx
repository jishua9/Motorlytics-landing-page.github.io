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
    <LapTimesTable
      lapTimes={mockLapTimes}
      userRaceNumber={mockUserLapNumber}
      onImportClick={noop}
      onManualClick={noop}
      onEditClick={noop}
    />
  )
}
