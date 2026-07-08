// Hand-written mock fixture matching WeekendPaceChart's `sessions` prop.
// Realistic AU club-racing lap times (Phillip Island ~1:35, in ms).
export interface PaceSession {
  id: string
  name: string
  bestLapMs: number | null
  avgLapMs: number | null
  isBaseline: boolean
  changed: boolean
}

export const mockSessions: PaceSession[] = [
  { id: 's1', name: 'Practice 1', bestLapMs: 96420, avgLapMs: 97880, isBaseline: true, changed: false },
  { id: 's2', name: 'Practice 2', bestLapMs: 95870, avgLapMs: 96940, isBaseline: false, changed: true },
  { id: 's3', name: 'Qualifying', bestLapMs: 95210, avgLapMs: 96120, isBaseline: false, changed: true },
  { id: 's4', name: 'Race 1', bestLapMs: 95480, avgLapMs: 96650, isBaseline: false, changed: false },
  { id: 's5', name: 'Race 2', bestLapMs: 94990, avgLapMs: 95820, isBaseline: false, changed: true },
]

export const mockBaselineSessionId = 's1'

// ---------------------------------------------------------------------------
// WeekendPositionChart positions[lap][posIndex] = raceNumber.
// A 12-car club race; driver #7 climbs from P6 to P2.
// ---------------------------------------------------------------------------
export const mockPositions: string[][] = [
  ['12', '3', '44', '21', '9', '7', '5', '88', '16', '2', '55', '33'],
  ['12', '3', '44', '9', '21', '7', '5', '88', '16', '2', '55', '33'],
  ['3', '12', '44', '9', '7', '21', '5', '88', '16', '2', '55', '33'],
  ['3', '12', '9', '44', '7', '5', '21', '88', '16', '2', '33', '55'],
  ['3', '12', '9', '7', '44', '5', '21', '16', '88', '2', '33', '55'],
  ['3', '9', '12', '7', '44', '5', '16', '21', '88', '33', '2', '55'],
  ['3', '9', '7', '12', '5', '44', '16', '21', '88', '33', '2', '55'],
  ['3', '9', '7', '12', '5', '16', '44', '21', '33', '88', '2', '55'],
  ['3', '7', '9', '5', '12', '16', '44', '33', '21', '88', '55', '2'],
  ['3', '7', '9', '5', '12', '16', '44', '33', '21', '88', '55', '2'],
]

export const mockUserRaceNumber = '7'
export const mockTotalEntries = 12

// ---------------------------------------------------------------------------
// TrackWindDiagram wind at the track (m/s + bearing).
// ---------------------------------------------------------------------------
export const mockWind = { windSpeed: 5.4, windDeg: 210 }

// ---------------------------------------------------------------------------
// CurrentConditions a partly-sunny, dry afternoon at the track.
// ---------------------------------------------------------------------------
export const mockWeather = {
  dt: 0,
  temp: 21.4,
  feels_like: 20.8,
  pressure: 1014,
  humidity: 58,
  dew_point: 12,
  uvi: 4,
  clouds: 30,
  visibility: 10000,
  wind_speed: 5.4,
  wind_deg: 210,
  weather: [{ id: 802, main: 'Clouds', description: 'partly cloudy', icon: '02d' }],
  rain: { '1h': 0 },
}

// 12 hourly points (08:00-19:00 in the chart's timezone), with a light shower
// mid-afternoon so the rain bars show. Fixed base keeps the build deterministic.
const HOURLY_BASE = 1721030400 // 08:00 UTC, fixed
const HOURLY_SEED = [
  { t: 15, w: 3.0, d: 190, r: 0 },
  { t: 16, w: 3.4, d: 200, r: 0 },
  { t: 18, w: 3.8, d: 210, r: 0 },
  { t: 20, w: 4.2, d: 215, r: 0 },
  { t: 22, w: 4.6, d: 220, r: 0 },
  { t: 23, w: 5.0, d: 225, r: 0.2 },
  { t: 22, w: 5.4, d: 230, r: 0.6 },
  { t: 21, w: 5.0, d: 235, r: 0.4 },
  { t: 20, w: 4.4, d: 230, r: 0 },
  { t: 19, w: 3.9, d: 225, r: 0 },
  { t: 18, w: 3.4, d: 220, r: 0 },
  { t: 17, w: 3.0, d: 215, r: 0 },
]

export const mockHourly = HOURLY_SEED.map((h, i) => ({
  dt: HOURLY_BASE + i * 3600,
  temp: h.t,
  feels_like: h.t - 1,
  pressure: 1014,
  humidity: 58,
  dew_point: 11,
  uvi: 3,
  clouds: 40,
  visibility: 10000,
  wind_speed: h.w,
  wind_deg: h.d,
  weather: [{ id: 802, main: 'Clouds', description: 'partly cloudy', icon: '02d' }],
  rain: h.r > 0 ? { '1h': h.r } : undefined,
}))

// Sessions overlaid on the forecast (green Practice, yellow Qualifying, red Race).
export const mockWeatherSessions = [
  {
    id: 'ws1',
    startTime: new Date((HOURLY_BASE + 2 * 3600) * 1000),
    sessionLength: 20,
    sessionType: 'Practice',
    sessionNumber: 1,
  },
  {
    id: 'ws2',
    startTime: new Date((HOURLY_BASE + 5 * 3600) * 1000),
    sessionLength: 20,
    sessionType: 'Qualifying',
    sessionNumber: null,
  },
  {
    id: 'ws3',
    startTime: new Date((HOURLY_BASE + 8 * 3600) * 1000),
    sessionLength: 25,
    sessionType: 'Race',
    sessionNumber: 1,
  },
]

// ---------------------------------------------------------------------------
// LapTimesTable a club race at Phillip Island, all fake drivers.
// Times in milliseconds; first lap is a slower out-lap. Driver #7 is "you".
// ---------------------------------------------------------------------------
export const mockUserLapNumber = '7'
export const mockLapTimes = [
  { number: '3', driver: 'Mia Nguyen', laps: [98950, 94880, 94620, 94710, 94550, 94990, 94480, 94700, 94610, 94830] },
  { number: '7', driver: 'Jack Thompson', laps: [99820, 95210, 94990, 95120, 94870, 95340, 94760, 95010, 94920, 95180] },
  { number: '44', driver: 'Chloe Zhang', laps: [99510, 95040, 94820, 94950, 94720, 95180, 94690, 94910, 94840, 95070] },
  { number: '12', driver: "Liam O'Brien", laps: [100240, 95680, 95410, 95530, 95270, 95720, 95190, 95440, 95350, 95610] },
  { number: '9', driver: 'Noah Ferrari', laps: [100870, 96120, 95870, 95990, 95740, 96210, 95680, 95910, 95820, 96080] },
  { number: '21', driver: 'Ava Kowalski', laps: [101340, 96540, 96280, 96410, 96150, 96620, 96090, 96330, 96240, 96500] },
  { number: '88', driver: 'Ethan Brooks', laps: [102100, 97210, 96950, 97080, 96820, 97300, 96760, 97010, 96920, 97180] },
]

// ---------------------------------------------------------------------------
// CarParts a mix of healthy, monitor and overdue components.
// Fixed installation dates keep the render deterministic (km drives status).
// ---------------------------------------------------------------------------
export const mockRacingKm = 4200
export const mockParts = [
  {
    id: 'p1',
    name: 'Engine (rebuild)',
    manufacturer: 'Ford Duratec',
    partNumber: 'ENG-2.0',
    lifespan: 5000,
    installationKm: 900,
    installationDate: new Date('2025-09-14'),
    expiresAt: null,
  },
  {
    id: 'p2',
    name: 'Front brake discs',
    manufacturer: 'DBA',
    partNumber: 'T2-330',
    lifespan: 1500,
    installationKm: 2900,
    installationDate: new Date('2026-02-08'),
    expiresAt: null,
  },
  {
    id: 'p3',
    name: 'Clutch assembly',
    manufacturer: 'Xtreme',
    partNumber: 'CLU-184',
    lifespan: 3500,
    installationKm: 300,
    installationDate: new Date('2025-07-20'),
    expiresAt: null,
  },
]
