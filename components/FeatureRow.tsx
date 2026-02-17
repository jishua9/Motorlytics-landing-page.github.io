import { LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface FeatureRowProps {
  icon: LucideIcon
  title: string
  description: string
  pills: string[]
  visualPlacement: 'left' | 'right'
  visualContent: React.ReactNode
  ctaText: string
  ctaHref: string
  badge?: string
}

export function FeatureRow({
  icon: Icon,
  title,
  description,
  pills,
  visualPlacement,
  visualContent,
  ctaText,
  ctaHref,
  badge,
}: FeatureRowProps) {
  const visual = (
    <div className="rounded-xl border-2 border-primary bg-grid p-8 shadow-[0_0_50px_rgba(255,136,0,0.3)]">
      {visualContent}
    </div>
  )

  const content = (
    <div className="flex flex-col justify-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-light">
        <Icon className="h-7 w-7 text-black" />
      </div>

      {badge && (
        <Badge variant="outline" className="mb-2 w-fit border-primary text-primary">
          {badge}
        </Badge>
      )}

      <h3 className="mb-4 text-3xl font-bold text-text-select">{title}</h3>

      <p className="mb-6 text-lg text-text">{description}</p>

      <div className="mb-6 flex flex-wrap gap-2">
        {pills.map((pill, index) => (
          <span
            key={index}
            className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
          >
            {pill}
          </span>
        ))}
      </div>

      <Link
        href={ctaHref}
        className="inline-flex items-center gap-2 text-primary hover:underline"
      >
        {ctaText} →
      </Link>
    </div>
  )

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
      {visualPlacement === 'left' ? (
        <>
          <div className="lg:col-span-3">{visual}</div>
          <div className="lg:col-span-2">{content}</div>
        </>
      ) : (
        <>
          <div className="lg:col-span-2">{content}</div>
          <div className="lg:col-span-3">{visual}</div>
        </>
      )}
    </div>
  )
}
