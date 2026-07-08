'use client'

import { CarPartsSection } from '@/components/cars/car-parts-section'
import { mockParts, mockRacingKm } from '@/lib/mock'

/** The real CarPartsSection with mock parts at varying stages of wear. */
export function PartsDemo() {
  return (
    <CarPartsSection
      parts={mockParts}
      racingKm={mockRacingKm}
      subscriptionTier="PRO"
    />
  )
}
