'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** stagger delay in seconds */
  delay?: number
  /** travel distance in px (default 24) */
  y?: number
  className?: string
}

/**
 * Fades + lifts its children into place the first time they scroll into view.
 * Respects prefers-reduced-motion (renders static). The building block for
 * every act's entrance later we layer scrubbed animation on top of this.
 */
export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
