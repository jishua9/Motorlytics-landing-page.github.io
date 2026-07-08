// Copied verbatim from Motorlytics app: lib/utils/lap-stats.ts (formatLapMs only)
export function formatLapMs(ms: number | null): string {
  if (ms == null) return '—'
  const totalSeconds = ms / 1000
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds - minutes * 60
  return `${minutes}:${seconds.toFixed(3).padStart(6, '0')}`
}
