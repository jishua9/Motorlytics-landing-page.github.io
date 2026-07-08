'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Lock, Wrench } from 'lucide-react'
import { formatDate, calculatePartLifecycle } from '@/lib/utils'

type Part = {
  id: string
  name: string
  partNumber?: string | null
  manufacturer?: string | null
  lifespan: number
  installationKm: number
  installationDate: Date
  expiresAt?: Date | null
}

interface CarPartsSectionProps {
  parts: Part[]
  racingKm: number
  subscriptionTier: 'PRO' | 'TEAM'
}

export function CarPartsSection({
  parts,
  racingKm,
  subscriptionTier: _subscriptionTier,
}: CarPartsSectionProps) {
  const isLocked = false

  const getProgressColor = (percentUsed: number) => {
    if (percentUsed < 70) return 'bg-green-500'
    if (percentUsed < 90) return 'bg-yellow-500'
    if (percentUsed < 100) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      healthy: 'border-green-500 text-green-500',
      monitor: 'border-yellow-500 text-yellow-500',
      'replace-soon': 'border-orange-500 text-orange-500',
      overdue: 'border-red-500 text-red-500',
    }
    const labels = {
      healthy: 'Healthy',
      monitor: 'Monitor',
      'replace-soon': 'Replace Soon',
      overdue: 'Overdue',
    }
    return (
      <Badge variant="outline" className={colors[status as keyof typeof colors]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  return (
    <Card className="border-secondary-dark bg-grid">
      <CardHeader className="bg-card-header rounded-t-lg border-b border-secondary-dark">
        <div className="flex items-center justify-between">
          <CardTitle className="text-text-select font-[Outfit] flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            Parts
          </CardTitle>
          {isLocked && (
            <Lock className="h-4 w-4 text-text-sub" />
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {isLocked ? (
          <div className="text-center py-8">
            <Lock className="h-12 w-12 mx-auto text-text-sub mb-4" />
            <p className="text-text-sub mb-2">Parts tracking is a Pro feature</p>
            <p className="text-sm text-text-sub">
              Upgrade to Pro to track part lifecycles and service history
            </p>
          </div>
        ) : parts.length === 0 ? (
          <div className="text-center py-8">
            <Wrench className="h-12 w-12 mx-auto text-text-sub mb-4" />
            <p className="text-text-sub">No parts tracked yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {parts.map((part) => {
              const lifecycle = calculatePartLifecycle(
                racingKm,
                part.installationKm,
                part.lifespan,
                part.installationDate,
                part.expiresAt
              )

              return (
                <div
                  key={part.id}
                  className="p-4 bg-grid-sub rounded-lg border border-secondary-dark space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-text font-[Outfit]">{part.name}</h4>
                      {part.manufacturer && (
                        <p className="text-sm text-text-sub">{part.manufacturer}</p>
                      )}
                      {part.partNumber && (
                        <p className="text-xs text-text-sub">PN: {part.partNumber}</p>
                      )}
                    </div>
                    {getStatusBadge(lifecycle.status)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-sub">Lifecycle</span>
                      <span className="text-text font-mono">
                        {lifecycle.currentLifeKm.toFixed(1)} / {part.lifespan.toFixed(1)} km
                      </span>
                    </div>
                    <Progress
                      value={lifecycle.percentUsed}
                      className="h-2"
                      indicatorClassName={getProgressColor(lifecycle.percentUsed)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-text-sub">Installed</p>
                      <p className="text-text">{formatDate(part.installationDate)}</p>
                    </div>
                    <div>
                      <p className="text-text-sub">Remaining</p>
                      <p className="text-text font-mono">
                        {lifecycle.remainingLifeKm !== null && lifecycle.remainingLifeKm > 0
                          ? `${lifecycle.remainingLifeKm.toFixed(1)} km`
                          : 'Overdue'}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
