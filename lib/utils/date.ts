// Minimal mirror of the app's date helpers that lifted components import.
// The marketing site only needs 'HH:mm' formatting, done with Intl so we
// don't pull in date-fns / date-fns-tz.

export function formatInTz(
  utcDate: Date | string,
  timezone: string,
  _formatStr: string,
): string {
  const d = new Date(utcDate)
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(d)
  const hh = parts.find((p) => p.type === 'hour')?.value ?? '00'
  const mm = parts.find((p) => p.type === 'minute')?.value ?? '00'
  return `${hh}:${mm}`
}

export function getSessionEndTime(
  startTime: Date | string,
  durationMinutes: number,
): Date {
  const start = new Date(startTime)
  return new Date(start.getTime() + durationMinutes * 60 * 1000)
}
