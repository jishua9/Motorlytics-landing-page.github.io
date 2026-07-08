import { Star, CloudRain, CloudSun, Cloud, Activity } from 'lucide-react'

// Reproduces the app's weather-matched setup history (SetupHistoryItem list):
// past sessions scored by how close the conditions were, with weather, rating
// and car feedback. This is the real "last time it was like this" surface.

type Feedback = { value: string; color: string }

type Match = {
  score: number
  date: string
  icon: typeof Cloud
  temp: number
  condition: string
  rating: number
  session: string
  feedback: Feedback[]
  top?: boolean
}

const GREEN = 'text-green-400'
const YELLOW = 'text-yellow-400'
const RED = 'text-red-400'

const MATCHES: Match[] = [
  {
    score: 94,
    date: '14 May 2026',
    icon: CloudRain,
    temp: 21,
    condition: 'Wet',
    rating: 4,
    session: 'Qualifying',
    feedback: [
      { value: 'Stable', color: GREEN },
      { value: 'Grip Med', color: YELLOW },
      { value: 'Bal N', color: GREEN },
    ],
    top: true,
  },
  {
    score: 81,
    date: '3 Apr 2026',
    icon: CloudRain,
    temp: 19,
    condition: 'Wet',
    rating: 3,
    session: 'Race 1',
    feedback: [
      { value: 'OS', color: RED },
      { value: 'Grip High', color: GREEN },
    ],
  },
  {
    score: 62,
    date: '12 Mar 2026',
    icon: CloudSun,
    temp: 24,
    condition: 'Partly Cloudy',
    rating: 4,
    session: 'Race 2',
    feedback: [{ value: 'Stable', color: GREEN }],
  },
]

function scoreColor(score: number): string {
  if (score >= 80) return 'text-green-500'
  if (score >= 60) return 'text-yellow-500'
  return 'text-text-sub'
}

function borderColor(score: number): string {
  if (score >= 80) return 'border-l-green-500'
  if (score >= 60) return 'border-l-yellow-500'
  return 'border-l-secondary-dark'
}

export function SetupHistoryDemo() {
  return (
    <div className="overflow-hidden rounded-lg border border-secondary-dark bg-grid">
      <div className="bg-card-header border-b border-secondary-dark px-4 py-3">
        <p className="font-[Outfit] text-sm font-medium text-text-select">
          Setups in similar weather
        </p>
        <p className="text-xs text-text-sub">
          Phillip Island · Formula Ford · scored against right now
        </p>
      </div>

      <div>
        {MATCHES.map((m) => {
          const Icon = m.icon
          return (
            <div
              key={m.date}
              className={`border-b border-l-4 border-secondary-dark p-3 last:border-b-0 ${borderColor(
                m.score,
              )} ${m.top ? 'bg-primary/5' : ''}`}
            >
              {/* Score + date */}
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {m.top && (
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  )}
                  <span className={`font-semibold ${scoreColor(m.score)}`}>
                    {m.score}% match
                  </span>
                </div>
                <span className="text-xs text-text-sub">{m.date}</span>
              </div>

              {/* Weather + rating */}
              <div className="mb-2 flex items-center gap-2 text-sm text-text-sub">
                <Icon className="h-3.5 w-3.5" />
                <span>{m.temp}°C</span>
                <span className="text-secondary-dark">|</span>
                <span>{m.condition}</span>
                <span className="mx-1 text-secondary-dark">|</span>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-3 w-3 ${
                        s <= m.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-secondary-dark'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Session type */}
              <div className="mb-2 text-xs text-text-sub">{m.session}</div>

              {/* Feedback badges */}
              <div className="flex flex-wrap items-center gap-1.5">
                <Activity className="h-3 w-3 text-text-sub" />
                {m.feedback.map((f) => (
                  <span
                    key={f.value}
                    className={`rounded bg-grid-sub/50 px-1 py-0.5 text-xs ${f.color}`}
                  >
                    {f.value}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
