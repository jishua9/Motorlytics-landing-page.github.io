'use client'

import { cn } from '@/lib/utils'
import { CheckCircle, AlertTriangle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface HealthGaugeProps {
  label: string
  icon: LucideIcon
  value: number
  unit: string
  status: 'ok' | 'warning'
  min: number
  max: number
  avg: number
  warningMessage?: string
  formatValue?: (v: number) => string
}

const STATUS_CONFIG = {
  ok: {
    icon: CheckCircle,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    badge: 'OK',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    badge: 'WARNING',
  },
}

export function HealthGauge({
  label,
  icon: Icon,
  value,
  unit,
  status,
  min,
  max,
  avg,
  warningMessage,
  formatValue = (v) => v.toFixed(1),
}: HealthGaugeProps) {
  const statusConfig = STATUS_CONFIG[status]
  const StatusIcon = statusConfig.icon

  return (
    <div className="bg-grid-sub border border-secondary-dark rounded-lg p-5 flex flex-col min-h-[200px]">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-5 w-5 text-primary" />
        <span className="text-sm text-text-sub font-medium">{label}</span>
        <span className={cn(
          'ml-auto text-[10px] px-2 py-0.5 rounded font-medium',
          statusConfig.color,
          statusConfig.bg,
        )}>
          {warningMessage || statusConfig.badge}
        </span>
      </div>

      <div className="flex items-baseline gap-1.5 mb-4">
        <span className="text-3xl font-semibold text-text-select font-mono">
          {formatValue(value)}
        </span>
        <span className="text-sm text-text-sub">{unit}</span>
        <StatusIcon className={cn('h-4 w-4 ml-1', statusConfig.color)} />
      </div>

      <div className="flex gap-5 text-sm mt-auto">
        <div>
          <span className="text-text-sub">Min </span>
          <span className="text-text-main font-mono">{formatValue(min)}</span>
        </div>
        <div>
          <span className="text-text-sub">Max </span>
          <span className="text-text-main font-mono">{formatValue(max)}</span>
        </div>
        <div>
          <span className="text-text-sub">Avg </span>
          <span className="text-text-main font-mono">{formatValue(avg)}</span>
        </div>
      </div>
    </div>
  )
}

export type { HealthGaugeProps }
