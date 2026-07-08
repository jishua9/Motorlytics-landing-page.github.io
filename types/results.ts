// Mirrors the Prisma enum (marketing site has no Prisma client).
type ResultStatus = 'FINISHED' | 'DNF' | 'DNS' | 'DSQ'

/**
 * Lap time entry for a single driver
 */
export interface LapTimeEntry {
  number: string      // Race number e.g. "76"
  driver: string      // Driver name
  laps: number[]      // Times in milliseconds per lap
}

/**
 * Positions per lap for lap chart
 * positions[lapIndex][positionIndex] = driverNumber
 * Example: positions[0] = ["76", "42", "7"] means after lap 1:
 *   P1: #76, P2: #42, P3: #7
 */
export type Positions = string[][]

/**
 * Parsed result entry from Natsoft
 */
export interface ParsedResultEntry {
  position: number
  raceNumber: string
  driverName: string
  team?: string
  vehicle?: string
  laps?: number
  raceTime?: string
  fastestLap?: number
  fastestLapTime?: string
  gap?: string
  status: ResultStatus
}

/**
 * Editable result entry for preview/edit table (with unique ID for React keys)
 */
export interface EditableResultEntry extends ParsedResultEntry {
  id: string
}

/**
 * Import modal modes
 */
export type ImportMode = 'results' | 'lapChart' | 'lapTimes'

/**
 * Import modal steps for results
 */
export type ImportStep = 'paste' | 'edit'

/**
 * Parse result with error handling
 */
export interface ParseResult<T> {
  success: boolean
  data?: T
  error?: string
  skipped?: number
}
