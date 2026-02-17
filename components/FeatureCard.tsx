import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  linkText: string
  linkHref: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  linkText,
  linkHref,
}: FeatureCardProps) {
  return (
    <div className="group rounded-xl border border-secondary-dark bg-grid p-8 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-[0_4px_24px_rgba(255,136,0,0.2)]">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-light">
        <Icon className="h-6 w-6 text-black" />
      </div>

      <h3 className="mb-3 text-2xl font-bold text-text-select">{title}</h3>

      <p className="mb-4 text-text">{description}</p>

      <Link
        href={linkHref}
        className="inline-flex items-center gap-2 text-primary transition-colors hover:underline"
      >
        {linkText} →
      </Link>
    </div>
  )
}
