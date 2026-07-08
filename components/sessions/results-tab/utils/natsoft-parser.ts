import type { ParsedResultEntry, LapTimeEntry, Positions, ParseResult } from '@/types/results'
// Mirrors the Prisma enum (marketing site has no Prisma client).
type ResultStatus = 'FINISHED' | 'DNF' | 'DNS' | 'DSQ'

/**
 * Natsoft format types:
 * Format A: Pos Car Competitor/Team | Driver (SA format)
 * Format B: Pos Car Driver | Competitor/Team (VIC format)
 */
type NatsoftFormat = 'A' | 'B'
type SessionType = 'qualifying' | 'race'

/**
 * Detect Natsoft format and session type from headers
 */
function detectNatsoftFormat(lines: string[]): { format: NatsoftFormat; sessionType: SessionType } {
  let format: NatsoftFormat = 'A' // Default to Format A
  let sessionType: SessionType = 'qualifying' // Default to qualifying

  for (const line of lines) {
    // Detect column format
    if (line.includes('Pos Car  Competitor/Team')) {
      format = 'A' // SA format: Competitor/Team | Driver
    } else if (line.includes('Pos Car  Driver')) {
      format = 'B' // VIC format: Driver | Competitor/Team
    }

    // Detect session type from header
    if (line.includes('Qualifying') && line.includes('Mins')) {
      sessionType = 'qualifying'
    } else if (line.includes('Race') && line.includes('Mins')) {
      sessionType = 'race'
    } else if (line.includes('Formula Vee Race')) {
      sessionType = 'race'
    } else if (line.includes('Race.Time')) {
      // "Race.Time" column ONLY appears in race format (not qualifying)
      sessionType = 'race'
    }
  }

  return { format, sessionType }
}

/**
 * Detect and fix field swapping between driver and team fields
 * Sometimes Natsoft swaps driver and team columns
 */
function detectAndFixFieldSwapping(driverName: string, team: string): { driverName: string; team: string } {
  const driverField = driverName?.trim() || ''
  const teamField = team?.trim() || ''

  // Skip if either field is empty
  if (!driverField || !teamField) {
    return { driverName: driverField, team: teamField }
  }

  // Pattern for person name with state code
  const personWithStatePattern = /^[A-Z][a-z]+ [A-Z][a-z]+.*\([A-Z]{2,4}\)$/

  // Check if driver field already looks like a proper person name with state code
  const driverLooksLikePerson = personWithStatePattern.test(driverField)

  // If driver field already looks like a person name, don't swap
  if (driverLooksLikePerson) {
    return { driverName: driverField, team: teamField }
  }

  // Indicators that driver field contains team/corporate name
  const corporateIndicators = [
    'racing', 'motorsport', 'motor sport', 'team', 'engineering', 'automotive',
    'performance', 'speed', 'turbo', 'garage', 'workshop', 'competition',
    'sport', 'auto', 'works', 'factory', 'tuning', 'development', 'systems',
    'technologies', 'enterprises', 'solutions', 'services', 'group', 'ltd',
    'limited', 'inc', 'incorporated', 'pty', 'corp', 'company', 'co.',
    'ambrose', 'building', 'supplies', 'real estate', 'parts', 'spares',
    'fabrication', 'welding', 'mechanical', 'electrical', 'tyres', 'wheels',
    'hire', 'restoration', 'cars', 'fleet'
  ]

  // Check if driver field looks like a corporate/team name
  const driverLooksLikeCorporate = corporateIndicators.some(indicator =>
    driverField.toLowerCase().includes(indicator.toLowerCase())
  )

  // Check if team field looks like a person name with state
  const teamLooksLikePerson = personWithStatePattern.test(teamField)

  // Special cases for obvious corporate names in driver field
  const obviousCorporatePatterns = [
    /^[A-Z]{2,}\s+/, // All caps start (like "BF Racing")
    /\b(pty|ltd|inc|corp|llc)\b/i, // Legal entity suffixes
    /^(the\s+)?[a-z\s]+(racing|motorsport|team|garage|works)$/i, // Clear team patterns
  ]

  const driverIsObviouslyCorporate = obviousCorporatePatterns.some(pattern =>
    pattern.test(driverField)
  )

  // Only swap if we have clear evidence of reversal
  const shouldSwap = (driverLooksLikeCorporate && teamLooksLikePerson) ||
    (driverIsObviouslyCorporate && teamLooksLikePerson)

  if (shouldSwap) {
    return {
      driverName: teamField.replace(/\s*\([A-Z]{2,4}\)\s*$/, ''), // Remove state code for driver
      team: driverField
    }
  }

  return { driverName: driverField, team: teamField }
}

/**
 * Handle team name overflow into driver field
 */
function cleanupDriverName(driverName: string, team: string): { driverName: string; team: string } {
  const driverWords = driverName.split(' ')
  if (driverWords.length > 0) {
    const firstWord = driverWords[0]
    // Common word fragments that indicate overflow from team names
    const commonFragments = [
      'pplies', 'plies', 'lies', 'ies', 'es', 's', // from "Supplies"
      'ing', 'ed', 'er', 'ly', 'tion', 'sion', // common endings
      'ment', 'ness', 'able', 'ible' // more common endings
    ]

    // If first word is clearly a fragment (short and matches patterns)
    if (firstWord.length <= 6 && (
      commonFragments.includes(firstWord) ||
      /^[a-z]/.test(firstWord) // starts with lowercase (likely fragment)
    )) {
      // Move the fragment back to team name and clean up driver name
      return {
        team: (team + firstWord).trim(),
        driverName: driverWords.slice(1).join(' ').trim()
      }
    }
  }

  return { driverName, team }
}

/**
 * Parse qualifying line from Natsoft
 */
function parseQualifyingLine(line: string, format: NatsoftFormat): ParsedResultEntry | null {
  // Check if this looks like a data line (starts with a valid position number 1-999 or DNF/DNS/DSQ)
  if (!/^\s*(\d{1,3}|DNF|DNS|DSQ)\s/.test(line)) {
    return null
  }

  // Handle DNF/DNS/DSQ entries
  let position = 0
  let status: ResultStatus = 'FINISHED'
  const posField = line.substring(0, 4).trim()

  if (posField === 'DNF' || posField === 'DNS' || posField === 'DSQ') {
    status = posField as ResultStatus
    position = posField === 'DNF' ? 999 : posField === 'DNS' ? 998 : 997
  } else {
    const pos = parseInt(posField)
    if (isNaN(pos) || pos < 1 || pos > 200) {
      return null
    }
    position = pos
  }

  // Extract fields using fixed-width columns
  const carNumber = line.substring(4, 9).trim()
  const field1 = line.substring(9, 33).trim() // Team or Driver depending on format
  const field2 = line.substring(33, 63).trim().replace(/\s*\([A-Z]{2,4}\)\s*$/, '') // Driver or Team
  const vehicle = line.substring(63, 85).trim()

  // Assign driver/team based on format
  let driverName = format === 'A' ? field2 : field1
  let team = format === 'A' ? field1 : field2

  // Apply field swap detection
  const swapped = detectAndFixFieldSwapping(driverName, team)
  driverName = swapped.driverName
  team = swapped.team

  // Clean up driver name overflow
  const cleaned = cleanupDriverName(driverName, team)
  driverName = cleaned.driverName
  team = cleaned.team

  // Parse lap info - start from position 95 (after CL column)
  const lapInfo = line.substring(95).trim()
  let laps: number | undefined
  let fastestLapTime: string | undefined
  let gap: string | undefined

  if (lapInfo) {
    // Extract all time-like patterns (M:SS.mmmm or MM:SS.mmmm)
    const timePattern = /(\d{1,2}:\d{2}\.\d{4})(\*?)/g
    const timeMatches: Array<{ time: string; hasAsterisk: boolean; index: number }> = []
    let match
    while ((match = timePattern.exec(lapInfo)) !== null) {
      timeMatches.push({
        time: match[1],
        hasAsterisk: match[2] === '*',
        index: match.index
      })
    }

    // Extract laps count
    if (timeMatches.length > 0) {
      const beforeTime = lapInfo.substring(0, timeMatches[0].index).trim()
      const allNumbers = beforeTime.match(/\d+/g)
      if (allNumbers && allNumbers.length >= 2) {
        laps = parseInt(allNumbers[allNumbers.length - 2]) || undefined
      } else if (allNumbers && allNumbers.length === 1) {
        laps = parseInt(allNumbers[0]) || undefined
      }
    }

    // Determine fastest lap and gap
    if (timeMatches.length === 1) {
      fastestLapTime = timeMatches[0].time
    } else if (timeMatches.length === 2) {
      const time1 = timeMatches[0].time
      const time2 = timeMatches[1].time
      const time1LooksLikeGap = time1.startsWith('0:0')
      const time2LooksLikeGap = time2.startsWith('0:0')

      if (time2LooksLikeGap && !time1LooksLikeGap) {
        fastestLapTime = time1
        gap = time2
      } else if (time1LooksLikeGap && !time2LooksLikeGap) {
        fastestLapTime = time2
        gap = time1
      } else {
        fastestLapTime = time1
        gap = time2LooksLikeGap ? time2 : undefined
      }
    } else if (timeMatches.length > 2) {
      fastestLapTime = timeMatches[0].time
      const lastTime = timeMatches[timeMatches.length - 1].time
      gap = lastTime.startsWith('0:0') ? lastTime : undefined
    }
  }

  return {
    position,
    raceNumber: carNumber,
    driverName: driverName || 'Unknown Driver',
    team: team || undefined,
    vehicle: vehicle || undefined,
    laps,
    fastestLapTime,
    gap,
    status
  }
}

/**
 * Parse race line from Natsoft
 */
function parseRaceLine(line: string, format: NatsoftFormat): ParsedResultEntry | null {
  // Handle DNF/DNS/DSQ entries
  let position = 0
  let status: ResultStatus = 'FINISHED'
  const posField = line.substring(0, 4).trim()

  if (posField === 'DNF' || posField === 'DNS' || posField === 'DSQ') {
    status = posField as ResultStatus
    position = posField === 'DNF' ? 999 : posField === 'DNS' ? 998 : 997
  } else {
    const pos = parseInt(posField)
    if (isNaN(pos) || pos < 1 || pos > 200) {
      return null
    }
    position = pos
  }

  // Extract fields using fixed-width columns
  const carNumber = line.substring(4, 9).trim()
  const field1 = line.substring(9, 33).trim()
  const field2 = line.substring(33, 63).trim().replace(/\s*\([A-Z]{2,4}\)\s*$/, '')
  const vehicle = line.substring(63, 85).trim()

  // Assign driver/team based on format
  let driverName = format === 'A' ? field2 : field1
  let team = format === 'A' ? field1 : field2

  // Apply field swap detection
  const swapped = detectAndFixFieldSwapping(driverName, team)
  driverName = swapped.driverName
  team = swapped.team

  // Clean up driver name overflow
  const cleaned = cleanupDriverName(driverName, team)
  driverName = cleaned.driverName
  team = cleaned.team

  // Parse race data section
  const raceDataSection = line.substring(95).trim()
  let laps: number | undefined
  let raceTime: string | undefined
  let fastestLapTime: string | undefined

  // Match pattern: [laps] [race_time] [lap_number] [fastest_lap_time]
  const raceDataMatch = raceDataSection.match(/(\d+)\s+(\d{1,2}:\d{2}\.\d{4})\s+(\d+)\s+(\d{1,2}:\d{2}\.\d{4})/)

  if (raceDataMatch) {
    laps = parseInt(raceDataMatch[1]) || undefined
    raceTime = raceDataMatch[2]
    fastestLapTime = raceDataMatch[4]
  } else {
    // Fallback parsing
    const lapsField = line.substring(96, 103).trim()
    if (lapsField && /^\d+$/.test(lapsField)) {
      laps = parseInt(lapsField) || undefined
    }

    const raceTimeField = line.substring(103, 115).trim()
    if (raceTimeField && /\d{1,2}:\d{2}\.\d{4}/.test(raceTimeField)) {
      raceTime = raceTimeField
    }

    const fastestLapSection = line.substring(115).trim()
    if (fastestLapSection) {
      const fastestLapMatch = fastestLapSection.match(/(\d+)\s+([\d:.]+)(\*?)/)
      if (fastestLapMatch) {
        fastestLapTime = fastestLapMatch[2]
      }
    }
  }

  return {
    position,
    raceNumber: carNumber,
    driverName: driverName || 'Unknown Driver',
    team: team || undefined,
    vehicle: vehicle || undefined,
    laps,
    raceTime,
    fastestLapTime,
    status
  }
}

/**
 * Parse Natsoft classification results from pasted text
 * Ported from Formula Vee site parser - battle-tested across many race formats
 */
export function parseClassificationResults(text: string): ParseResult<ParsedResultEntry[]> {
  const lines = text.split('\n').filter(line => line.trim())
  const entries: ParsedResultEntry[] = []
  let skipped = 0

  // Detect format and session type
  const { format, sessionType } = detectNatsoftFormat(lines)

  for (const line of lines) {
    // Skip obvious header lines - but be careful not to skip data lines
    const lineStart = line.substring(0, 40).toLowerCase()
    if (lineStart.includes('pos ') ||
      lineStart.includes('position') ||
      line.toLowerCase().includes('---') ||
      line.length < 10) {
      continue
    }

    // Check if this looks like a data line
    if (!/^\s*(\d{1,3}|DNF|DNS|DSQ)\s/.test(line)) {
      continue
    }

    // Parse based on session type
    const result = sessionType === 'race'
      ? parseRaceLine(line, format)
      : parseQualifyingLine(line, format)

    if (result) {
      entries.push(result)
    } else {
      skipped++
    }
  }

  if (entries.length === 0) {
    return {
      success: false,
      error: 'No valid results found. Please check the format and try again.',
    }
  }

  return {
    success: true,
    data: entries,
    skipped,
  }
}

/**
 * Parse lap time string to milliseconds
 * Formats: "1:23.456" or "83.456" or "1:23:45.678"
 */
export function parseTimeToMs(timeStr: string): number | null {
  if (!timeStr) return null

  const cleanTime = timeStr.trim()
  const parts = cleanTime.split(':')

  try {
    if (parts.length === 1) {
      // Just seconds: "83.456"
      return Math.round(parseFloat(parts[0]) * 1000)
    } else if (parts.length === 2) {
      // Minutes:Seconds: "1:23.456"
      const minutes = parseInt(parts[0])
      const seconds = parseFloat(parts[1])
      return Math.round((minutes * 60 + seconds) * 1000)
    } else if (parts.length === 3) {
      // Hours:Minutes:Seconds: "1:23:45.678"
      const hours = parseInt(parts[0])
      const minutes = parseInt(parts[1])
      const seconds = parseFloat(parts[2])
      return Math.round((hours * 3600 + minutes * 60 + seconds) * 1000)
    }
  } catch {
    return null
  }

  return null
}

/**
 * Format milliseconds to lap time string
 */
export function formatMsToTime(ms: number): string {
  const totalSeconds = ms / 1000
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = (totalSeconds % 60).toFixed(3)

  if (minutes > 0) {
    return `${minutes}:${seconds.padStart(6, '0')}`
  }
  return seconds
}

/**
 * Check if a line is a driver header line (e.g., "  1 William Brown")
 * Driver headers have: number at start, then name (no time-like patterns)
 */
function isDriverHeaderLine(line: string): { number: string; driver: string } | null {
  const trimmed = line.trim()

  // Must start with a number (car number)
  const match = trimmed.match(/^(\d{1,3})\s+([A-Za-z][A-Za-z\s]+)$/)
  if (match) {
    return { number: match[1], driver: match[2].trim() }
  }
  return null
}

/**
 * Parse a line in the "INDIVIDUAL LAP TIMES" format
 * Format: " 17 Ben Purtell             0:57.8329 0:53.5873 0:55.5465 ..."
 * Returns driver info and all lap times on that line
 */
function parseIndividualLapTimeLine(line: string): { number: string; driver: string; laps: number[] } | null {
  const trimmed = line.trim()

  // Skip if empty or doesn't start with a number
  if (!trimmed || !/^\d/.test(trimmed)) return null

  // Match: race_number + driver_name + lap_times
  // Race number: 1-3 digits
  // Driver name: letters and spaces (until we hit a time pattern)
  // Time pattern: M:SS.ssss or MM:SS.ssss

  // First, extract all time patterns from the line
  const timePattern = /(\d{1,2}:\d{2}\.\d+)/g
  const timeMatches = trimmed.match(timePattern)

  // If no times found, this isn't a valid data line
  if (!timeMatches || timeMatches.length === 0) return null

  // Find where the first time starts to separate driver info from times
  const firstTimeIndex = trimmed.indexOf(timeMatches[0])
  if (firstTimeIndex === -1) return null

  const driverPart = trimmed.substring(0, firstTimeIndex).trim()

  // Parse driver part: number + name
  const driverMatch = driverPart.match(/^(\d{1,3})\s+(.+)$/)
  if (!driverMatch) return null

  const raceNumber = driverMatch[1]
  const driverName = driverMatch[2].trim()

  // Validate driver name (should have at least some letters)
  if (!/[A-Za-z]/.test(driverName)) return null

  // Convert all times to milliseconds
  const laps: number[] = []
  for (const timeStr of timeMatches) {
    const ms = parseTimeToMs(timeStr)
    if (ms !== null && ms > 0) {
      laps.push(ms)
    }
  }

  if (laps.length === 0) return null

  return { number: raceNumber, driver: driverName, laps }
}

/**
 * Check if a line is a lap data line (starts with lap number, contains times)
 * Format: "  1 0:52.2134 0:32.3313 0:35.9799 2:00.5246  0:27.6403 ..."
 */
function isLapDataLine(line: string): boolean {
  const trimmed = line.trim()
  // Starts with 1-3 digit lap number, followed by time patterns
  return /^\d{1,3}\s+\d+:\d+\.\d+/.test(trimmed)
}

/**
 * Extract lap times from a lap data line
 * Each line can have up to 3 sets of (S1, S2, S3, LapTime)
 * We want just the lap times (every 4th time value)
 */
function extractLapTimesFromLine(line: string): number[] {
  const times: number[] = []

  // Match all time patterns: 1:23.4567 or 23:45.678 or -:--.---- (invalid)
  const timePattern = /(\d{1,2}:\d{2}\.\d+|-:--.----)/g
  const matches = line.match(timePattern) || []

  // Times come in groups of 4: S1, S2, S3, LapTime
  // We want every 4th value (index 3, 7, 11, etc.)
  for (let i = 3; i < matches.length; i += 4) {
    const timeStr = matches[i]
    // Skip invalid times (pit laps, etc.)
    if (timeStr.includes('-')) continue

    const ms = parseTimeToMs(timeStr)
    if (ms !== null && ms > 0) {
      times.push(ms)
    }
  }

  return times
}

/**
 * Parse Natsoft lap times from pasted text
 * Supports two formats:
 * 1. Individual lap times (all on one line per driver):
 *    " 17 Ben Purtell             0:57.8329 0:53.5873 0:55.5465 ..."
 * 2. Sector times format (driver header + separate lap lines):
 *    "  1 William Brown"
 *    "  1 0:52.2134 0:32.3313 0:35.9799 2:00.5246  ..."
 */
export function parseLapTimes(text: string): ParseResult<LapTimeEntry[]> {
  const lines = text.split('\n')

  // Detect format by checking for "INDIVIDUAL LAP TIMES" or "SECTOR AND LAP TIMES"
  const lowerText = text.toLowerCase()
  const isIndividualFormat = lowerText.includes('individual lap times')
  const isSectorFormat = lowerText.includes('sector and lap times')

  // Try individual format first (more common for club racing)
  if (isIndividualFormat || !isSectorFormat) {
    const entries = parseIndividualLapTimesFormat(lines)
    if (entries.length > 0) {
      return { success: true, data: entries }
    }
  }

  // Fall back to sector times format
  const entries = parseSectorTimesFormat(lines)
  if (entries.length > 0) {
    return { success: true, data: entries }
  }

  return {
    success: false,
    error: 'No valid lap times found. Please check the format and try again.',
  }
}

/**
 * Parse "INDIVIDUAL LAP TIMES" format where each driver has all laps on one line
 */
function parseIndividualLapTimesFormat(lines: string[]): LapTimeEntry[] {
  const entries: LapTimeEntry[] = []
  let dataStarted = false

  for (const line of lines) {
    if (!line.trim()) continue

    const lower = line.toLowerCase()

    // Skip header patterns
    if (lower.includes('individual lap times') ||
        lower.includes('page ') ||
        lower.includes('scheduled start') ||
        lower.includes('elapsed time') ||
        lower.includes('event e') ||
        lower.includes('laps')) {
      dataStarted = true
      continue
    }

    // Detect start of data section (after underline or header row with numbers 1 2 3...)
    if (lower.includes('_____') || /^\s*1\s+2\s+3\s+4/.test(line.trim())) {
      dataStarted = true
      continue
    }

    // Skip footer patterns
    if (lower.includes('underline') ||
        lower.includes('fastest') ||
        lower.includes('issue#') ||
        lower.includes('timing system') ||
        lower.includes('natsoft')) {
      continue
    }

    // Try to parse as individual lap time line
    if (dataStarted) {
      const parsed = parseIndividualLapTimeLine(line)
      if (parsed) {
        entries.push({
          number: parsed.number,
          driver: parsed.driver,
          laps: parsed.laps,
        })
      }
    }
  }

  return entries
}

/**
 * Parse "SECTOR AND LAP TIMES" format where driver header and lap data are separate
 */
function parseSectorTimesFormat(lines: string[]): LapTimeEntry[] {
  const entries: LapTimeEntry[] = []
  let currentDriver: { number: string; driver: string } | null = null
  let currentLaps: number[] = []
  let dataStarted = false

  for (const line of lines) {
    if (!line.trim()) continue

    // Skip common header patterns
    const lower = line.toLowerCase()
    if (lower.includes('sector and lap times') ||
        lower.includes('page ') ||
        lower.includes('scheduled start') ||
        lower.includes('elapsed time') ||
        lower.includes('_____') ||
        lower.includes('lap -sector')) {
      dataStarted = true
      continue
    }

    // Skip footer patterns
    if (lower.includes('fastest sector') ||
        lower.includes('combined fastest') ||
        lower.includes('issue#') ||
        lower.includes('timing system') ||
        lower.includes('*=fastest')) {
      continue
    }

    // Check if this is a driver header line
    const driverHeader = isDriverHeaderLine(line)
    if (driverHeader) {
      // Save previous driver if we have one
      if (currentDriver && currentLaps.length > 0) {
        entries.push({
          number: currentDriver.number,
          driver: currentDriver.driver,
          laps: currentLaps,
        })
      }

      // Start new driver
      currentDriver = driverHeader
      currentLaps = []
      dataStarted = true
      continue
    }

    // Check if this is a lap data line
    if (dataStarted && currentDriver && isLapDataLine(line)) {
      const lapTimes = extractLapTimesFromLine(line)
      currentLaps.push(...lapTimes)
    }
  }

  // Don't forget the last driver
  if (currentDriver && currentLaps.length > 0) {
    entries.push({
      number: currentDriver.number,
      driver: currentDriver.driver,
      laps: currentLaps,
    })
  }

  return entries
}

/**
 * Parse Natsoft positions/lap chart from pasted text
 * Format:
 *       1   2   3   4   5   6   7    <- Header row (lap numbers)
 * 1    47  47  47  47  47  47  47    <- Position 1: driver numbers per lap
 * 2     4  77  77  77  77  77  77    <- Position 2: driver numbers per lap
 *
 * First column = position, remaining columns = driver number at that position per lap
 */
export function parsePositions(text: string): ParseResult<Positions> {
  const lines = text.trim().split('\n').filter(line => line.trim())

  // positionData[position][lap] = driverNumber
  const positionData: Map<number, string[]> = new Map()
  let maxLaps = 0
  let headerSkipped = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    const parts = trimmed.split(/\t|\s{2,}/).map(p => p.trim()).filter(Boolean)
    if (parts.length < 2) continue

    // First part should be position number (1, 2, 3, etc.)
    const position = parseInt(parts[0])
    if (isNaN(position) || position < 1) {
      // This might be the header row (lap numbers) - skip it
      if (!headerSkipped) {
        headerSkipped = true
      }
      continue
    }

    // If this row starts with a small number (1-30ish) but rest are also small numbers,
    // it might still be a header. Check if first few values in rest look like sequential lap numbers.
    if (!headerSkipped && parts.length > 3) {
      const firstThree = [parts[1], parts[2], parts[3]].map(p => parseInt(p))
      if (firstThree[0] === 1 && firstThree[1] === 2 && firstThree[2] === 3) {
        // This is the header row
        headerSkipped = true
        continue
      }
    }

    // Rest are driver numbers for each lap at this position
    const driversPerLap: string[] = []
    for (let i = 1; i < parts.length; i++) {
      const driverNum = parts[i].trim()
      if (/^\d+$/.test(driverNum)) {
        driversPerLap.push(driverNum)
      }
    }

    if (driversPerLap.length > 0) {
      positionData.set(position, driversPerLap)
      maxLaps = Math.max(maxLaps, driversPerLap.length)
    }
  }

  if (positionData.size === 0) {
    return {
      success: false,
      error: 'No valid position data found. Please check the format and try again.',
    }
  }

  // Convert to positions array format
  // positions[lap][positionIndex] = driverNumber
  // positions[0] = ["47", "4", "77", ...] means after lap 1: P1=#47, P2=#4, P3=#77
  const positions: Positions = []

  for (let lap = 0; lap < maxLaps; lap++) {
    const lapResult: string[] = []

    // Get all positions for this lap, sorted by position
    const sortedPositions = Array.from(positionData.entries())
      .sort((a, b) => a[0] - b[0])

    for (const [, driversPerLap] of sortedPositions) {
      if (lap < driversPerLap.length) {
        lapResult.push(driversPerLap[lap])
      }
    }

    positions.push(lapResult)
  }

  return {
    success: true,
    data: positions,
  }
}
