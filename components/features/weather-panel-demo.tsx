'use client'

import { CurrentConditions } from '@/components/pitwall/weather/current-conditions'
import { HourlyChart } from '@/components/pitwall/weather/hourly-chart'
import { mockWeather, mockHourly, mockWeatherSessions } from '@/lib/mock'

/**
 * Reproduces the app's pit-wall WeatherPanel (current conditions + 12 hour
 * forecast chart with session overlays) using the real components fed mock
 * data. The container in the app fetches this via tRPC; here it is static.
 */
export function WeatherPanelDemo() {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="min-w-[460px]">
          <CurrentConditions current={mockWeather} />
        </div>
      </div>

      <div className="pt-2">
        <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-text-sub">
          12 hour forecast
        </h4>
        <div className="h-56 overflow-x-auto">
          <div className="h-full min-w-[460px]">
            <HourlyChart
              hourlyData={mockHourly}
              sessions={mockWeatherSessions}
              timezone="UTC"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
