'use client'

import { Cloud, CloudSun, Sun, CloudRain, CloudDrizzle, CloudLightning, Snowflake, CloudFog, Thermometer } from 'lucide-react'
import type { WeatherData } from '@/lib/services/weather'
import type { LucideIcon } from 'lucide-react'

interface CurrentConditionsProps {
  current: WeatherData
}

/**
 * Get arrow character for wind direction
 * Arrow points in the direction the wind is blowing TO
 */
function getWindArrow(degrees: number): string {
  const arrows = ['↓', '↙', '←', '↖', '↑', '↗', '→', '↘']
  const index = Math.round(((degrees % 360) / 45)) % 8
  return arrows[index]
}

/**
 * Convert m/s to km/h
 */
function msToKmh(ms: number): number {
  return Math.round(ms * 3.6)
}

/**
 * Estimate track surface temperature from air temp and cloud cover.
 * Sun heats tarmac significantly — up to +20°C in direct sun, ~+5°C under full cloud.
 */
function estimateTrackTemp(airTemp: number, cloudPercent: number): number {
  const sunFactor = (1 - cloudPercent / 100) * 15 + 5
  return Math.round((airTemp + sunFactor) * 10) / 10
}

/**
 * Determine surface condition label from rain amount (mm/h)
 */
function getSurfaceCondition(rainMmH: number): { label: string; color: string } {
  if (rainMmH <= 0) return { label: 'Dry', color: 'text-green-500' }
  if (rainMmH <= 1) return { label: 'Damp', color: 'text-yellow-500' }
  if (rainMmH <= 5) return { label: 'Wet', color: 'text-blue-400' }
  return { label: 'Very Wet', color: 'text-blue-500' }
}

/**
 * Get weather icon based on condition code
 */
function getWeatherIcon(iconCode: string): LucideIcon {
  const iconMap: Record<string, LucideIcon> = {
    '01d': Sun,
    '01n': Sun,
    '02d': CloudSun,
    '02n': CloudSun,
    '03d': Cloud,
    '03n': Cloud,
    '04d': Cloud,
    '04n': Cloud,
    '09d': CloudDrizzle,
    '09n': CloudDrizzle,
    '10d': CloudRain,
    '10n': CloudRain,
    '11d': CloudLightning,
    '11n': CloudLightning,
    '13d': Snowflake,
    '13n': Snowflake,
    '50d': CloudFog,
    '50n': CloudFog,
  }
  return iconMap[iconCode] || Cloud
}

export function CurrentConditions({ current }: CurrentConditionsProps) {
  const windSpeed = msToKmh(current.wind_speed)
  const windArrow = getWindArrow(current.wind_deg)
  const conditionDesc = current.weather[0]?.description ?? 'Unknown'
  const iconCode = current.weather[0]?.icon ?? '03d'
  const WeatherIcon = getWeatherIcon(iconCode)
  const rainAmount = current.rain?.['1h'] ?? 0
  const trackTemp = estimateTrackTemp(current.temp, current.clouds)
  const surface = getSurfaceCondition(rainAmount)

  return (
    <div className="flex items-center gap-6 p-4 rounded-lg bg-grid-sub">
      {/* Temperature - Left */}
      <div className="flex-shrink-0">
        <p className="text-3xl font-bold text-primary">
          {current.temp.toFixed(1)}&deg;C
        </p>
        <p className="text-sm text-text-sub">
          Feels like {current.feels_like.toFixed(1)}&deg;C
        </p>
      </div>

      {/* Weather Icon & Condition - Center */}
      <div className="flex flex-col items-center flex-shrink-0 px-4 border-l border-r border-secondary-dark">
        <p className="text-sm text-text-sub capitalize mb-1">{conditionDesc}</p>
        <WeatherIcon className="h-10 w-10 text-primary" />
        <p className="text-sm text-text-sub mt-1">Rain: {rainAmount} mm</p>
      </div>

      {/* Stats - Right */}
      <div className="flex gap-6 text-sm flex-1">
        <div>
          <p className="text-text-sub">Track:</p>
          <div className="flex items-center gap-1">
            <Thermometer className="h-3.5 w-3.5 text-orange-400" />
            <p className="text-text">{trackTemp.toFixed(1)}&deg;C</p>
          </div>
          <p className={`text-xs font-medium ${surface.color}`}>{surface.label}</p>
        </div>
        <div>
          <p className="text-text-sub">Wind:</p>
          <p className="text-text">
            {windSpeed} km/h <span className="text-blue-400">{windArrow}</span>
          </p>
        </div>
        <div>
          <p className="text-text-sub">Humidity:</p>
          <p className="text-text">{current.humidity}%</p>
        </div>
      </div>
    </div>
  )
}
