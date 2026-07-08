'use client'

import { Gauge, Thermometer, Droplets, Fuel } from 'lucide-react'
import { HealthGauge } from '@/components/health-gauge'

/**
 * A grid of the REAL HealthGauge component fed mock session-health data 
 * reproduces the app's Session Health panel without its tRPC coupling.
 */
export function TelemetryHealthDemo() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <HealthGauge
        label="Engine RPM"
        icon={Gauge}
        value={6820}
        unit="rpm"
        status="ok"
        min={1240}
        max={7180}
        avg={4960}
        formatValue={(v) => Math.round(v).toLocaleString()}
      />
      <HealthGauge
        label="Oil Temperature"
        icon={Thermometer}
        value={108.4}
        unit="°C"
        status="warning"
        min={82.1}
        max={112.0}
        avg={98.7}
        warningMessage="HIGH"
      />
      <HealthGauge
        label="Coolant Temperature"
        icon={Droplets}
        value={89.6}
        unit="°C"
        status="ok"
        min={71.3}
        max={93.2}
        avg={86.4}
      />
      <HealthGauge
        label="Lambda"
        icon={Fuel}
        value={0.98}
        unit="λ"
        status="ok"
        min={0.91}
        max={1.08}
        avg={0.99}
        formatValue={(v) => v.toFixed(2)}
      />
    </div>
  )
}
