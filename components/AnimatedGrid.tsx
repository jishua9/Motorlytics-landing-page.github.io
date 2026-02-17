'use client'

import { motion } from 'framer-motion'

export function AnimatedGrid() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <motion.path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255, 136, 0, 0.1)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* Orange gradient radial blur */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
    </div>
  )
}
