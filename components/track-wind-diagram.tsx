'use client'

import { Wind } from 'lucide-react'

interface TrackWindDiagramProps {
  windSpeed: number // m/s
  windDeg: number
  trackMapUrl?: string | null
}

/**
 * Convert m/s to km/h
 */
function msToKmh(ms: number): number {
  return Math.round(ms * 3.6)
}

/**
 * Get cardinal direction from degrees
 */
function degreesToCardinal(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round(((degrees % 360) / 22.5)) % 16
  return directions[index]
}

/**
 * Wind arrow positions as percentage coordinates on the track map
 * Spread across the map in a staggered pattern
 */
const ARROW_POSITIONS = [
  // Top row
  { x: 15, y: 15 },
  { x: 50, y: 10 },
  { x: 85, y: 15 },
  // Upper middle
  { x: 25, y: 35 },
  { x: 75, y: 35 },
  // Center
  { x: 50, y: 50 },
  // Lower middle
  { x: 25, y: 65 },
  { x: 75, y: 65 },
  // Bottom row
  { x: 15, y: 85 },
  { x: 50, y: 90 },
  { x: 85, y: 85 },
]

/**
 * Single wind arrow component
 */
function WindArrow({
  x,
  y,
  rotation,
  size = 24
}: {
  x: number
  y: number
  rotation: number
  size?: number
}) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="text-blue-400 drop-shadow-lg"
      >
        {/* Arrow pointing down (will be rotated by wind direction) */}
        <path
          d="M12 4L12 20M12 20L6 14M12 20L18 14"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function TrackWindDiagram({
  windSpeed,
  windDeg,
  trackMapUrl,
}: TrackWindDiagramProps) {
  const windSpeedKmh = msToKmh(windSpeed)
  const cardinalDir = degreesToCardinal(windDeg)

  return (
    <div className="h-full flex flex-col">
      {/* Wind Info Header */}
      <div className="flex items-center justify-center gap-4 py-3 border-b border-secondary-dark">
        <Wind className="h-5 w-5 text-blue-500" />
        <div className="text-center">
          <p className="text-lg font-bold text-text">
            {windSpeedKmh} km/h
          </p>
          <p className="text-sm text-text-sub">
            from {cardinalDir}
          </p>
        </div>
      </div>

      {/* Track Map with Wind Arrows */}
      <div className="flex-1 relative overflow-hidden">
        {trackMapUrl ? (
          <>
            {/* Track Map Background */}
            <div
              className="absolute inset-0 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${trackMapUrl})`,
                opacity: 0.4,
              }}
            />

            {/* Wind Arrows Overlay */}
            <div className="absolute inset-0">
              {ARROW_POSITIONS.map((pos, index) => (
                <WindArrow
                  key={index}
                  x={pos.x}
                  y={pos.y}
                  rotation={windDeg}
                  size={20}
                />
              ))}
            </div>

            {/* Center direction indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-grid/80 rounded-lg px-3 py-1.5 backdrop-blur-sm border border-secondary-dark">
                <p className="text-xs text-text-sub text-center">
                  Wind blowing {cardinalDir}
                </p>
              </div>
            </div>
          </>
        ) : (
          /* Compass Fallback when no track map */
          <div className="h-full flex flex-col items-center justify-center">
            <div className="relative">
              {/* Compass circle */}
              <div className="w-40 h-40 rounded-full border-2 border-secondary-dark relative bg-grid-sub">
                {/* Cardinal directions */}
                <span className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-bold text-text">N</span>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-bold text-text">S</span>
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm font-bold text-text">W</span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-text">E</span>

                {/* Wind arrows in compass */}
                <div className="absolute inset-0">
                  <WindArrow x={50} y={30} rotation={windDeg} size={18} />
                  <WindArrow x={30} y={50} rotation={windDeg} size={18} />
                  <WindArrow x={70} y={50} rotation={windDeg} size={18} />
                  <WindArrow x={50} y={70} rotation={windDeg} size={18} />
                </div>
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-text-sub">
              No track map available
            </p>
          </div>
        )}
      </div>

      {/* Wind Speed Scale */}
      <div className="flex justify-center items-center gap-4 py-2 border-t border-secondary-dark text-xs">
        <div className="flex items-center gap-2">
          <span className="text-text-sub">Light</span>
          <div className="flex gap-1">
            <div className={`w-2 h-2 rounded-full ${windSpeedKmh < 15 ? 'bg-green-500' : 'bg-secondary-dark'}`} />
            <div className={`w-2 h-2 rounded-full ${windSpeedKmh >= 15 && windSpeedKmh < 30 ? 'bg-yellow-500' : 'bg-secondary-dark'}`} />
            <div className={`w-2 h-2 rounded-full ${windSpeedKmh >= 30 ? 'bg-red-500' : 'bg-secondary-dark'}`} />
          </div>
          <span className="text-text-sub">Strong</span>
        </div>
      </div>
    </div>
  )
}
