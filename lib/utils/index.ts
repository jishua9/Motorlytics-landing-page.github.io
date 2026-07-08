// Mirror of the app's `@/lib/utils` barrel re-exports what lifted
// components import. Add more here as components are brought over.
export { cn } from './cn'

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-AU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export type PartLifecycleStatus = 'healthy' | 'monitor' | 'replace-soon' | 'overdue'

export interface PartLifecycleResult {
  currentLifeKm: number
  remainingLifeKm: number | null
  kmPercent: number
  timePercent: number
  daysUntilExpiry: number | null
  percentUsed: number
  expiryType: 'km' | 'time'
  status: PartLifecycleStatus
}

/**
 * Calculate part lifecycle status based on both KM usage and time-based expiry.
 * Uses worst-case (whichever expires first) for overall status. Copied verbatim
 * from the app so the lifted CarPartsSection behaves identically.
 */
export function calculatePartLifecycle(
  carRacingKm: number,
  installationKm: number,
  lifespanKm: number | null,
  installationDate?: Date | string | null,
  expiresAt?: Date | string | null,
): PartLifecycleResult {
  const currentLifeKm = carRacingKm - installationKm
  const remainingLifeKm = lifespanKm ? lifespanKm - currentLifeKm : null
  const kmPercent = lifespanKm && lifespanKm > 0 ? (currentLifeKm / lifespanKm) * 100 : 0

  let timePercent = 0
  let daysUntilExpiry: number | null = null

  if (expiresAt && installationDate) {
    const expiryDate = new Date(expiresAt)
    const installDate = new Date(installationDate)
    const now = new Date()

    const totalDays = Math.floor(
      (expiryDate.getTime() - installDate.getTime()) / (1000 * 60 * 60 * 24),
    )
    const elapsedDays = Math.floor(
      (now.getTime() - installDate.getTime()) / (1000 * 60 * 60 * 24),
    )

    timePercent = totalDays > 0 ? (elapsedDays / totalDays) * 100 : 100
    daysUntilExpiry = Math.floor(
      (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    )
  }

  const percentUsed = Math.max(kmPercent, timePercent)
  const expiryType: 'km' | 'time' = timePercent > kmPercent ? 'time' : 'km'

  let status: PartLifecycleStatus
  if (percentUsed < 70) status = 'healthy'
  else if (percentUsed < 90) status = 'monitor'
  else if (percentUsed < 100) status = 'replace-soon'
  else status = 'overdue'

  return {
    currentLifeKm,
    remainingLifeKm,
    kmPercent: Math.min(kmPercent, 100),
    timePercent: Math.min(timePercent, 100),
    daysUntilExpiry,
    percentUsed: Math.min(percentUsed, 100),
    expiryType,
    status,
  }
}
