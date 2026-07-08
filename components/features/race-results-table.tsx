// Representative race results table (finishing standings), styled to match the
// app's results table. Fake drivers; your car (#7) highlighted.

type Row = {
  pos: number
  num: string
  driver: string
  laps: number
  best: string
  gap: string
  you?: boolean
}

const ROWS: Row[] = [
  { pos: 1, num: '3', driver: 'Mia Nguyen', laps: 12, best: '1:34.48', gap: '' },
  { pos: 2, num: '44', driver: 'Chloe Zhang', laps: 12, best: '1:34.69', gap: '+2.14' },
  { pos: 3, num: '12', driver: "Liam O'Brien", laps: 12, best: '1:35.19', gap: '+4.83' },
  { pos: 4, num: '88', driver: 'Ethan Brooks', laps: 12, best: '1:35.61', gap: '+6.30' },
  { pos: 5, num: '9', driver: 'Noah Ferrari', laps: 12, best: '1:35.20', gap: '+8.95' },
  { pos: 6, num: '7', driver: 'Jack Thompson', laps: 12, best: '1:35.04', gap: '+11.40', you: true },
  { pos: 7, num: '21', driver: 'Ava Kowalski', laps: 12, best: '1:36.09', gap: '+14.22' },
]

export function RaceResultsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] text-sm">
        <thead>
          <tr className="text-left text-xs text-text-sub">
            <th className="py-2 pl-1 pr-2 font-medium">Pos</th>
            <th className="px-2 py-2 font-medium">#</th>
            <th className="px-2 py-2 font-medium">Driver</th>
            <th className="px-2 py-2 text-center font-medium">Laps</th>
            <th className="px-2 py-2 text-right font-medium">Best lap</th>
            <th className="py-2 pl-2 pr-1 text-right font-medium">Gap</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr
              key={r.num}
              className={`border-t border-secondary-dark ${
                r.you ? 'bg-primary/10' : ''
              }`}
            >
              <td className="py-2 pl-1 pr-2">
                <span
                  className={`font-[Outfit] font-semibold ${
                    r.pos === 1 ? 'text-primary' : 'text-text-select'
                  }`}
                >
                  {r.pos}
                </span>
              </td>
              <td className="px-2 py-2 font-mono text-text-sub">{r.num}</td>
              <td
                className={`px-2 py-2 ${
                  r.you ? 'font-semibold text-primary' : 'text-text-main'
                }`}
              >
                {r.driver}
              </td>
              <td className="px-2 py-2 text-center font-mono text-text-sub">
                {r.laps}
              </td>
              <td className="px-2 py-2 text-right font-mono text-text-select">
                {r.best}
              </td>
              <td className="py-2 pl-2 pr-1 text-right font-mono text-text-sub">
                {r.gap}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
