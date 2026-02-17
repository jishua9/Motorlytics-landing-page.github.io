import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

interface PricingCardProps {
  name: string
  price: string
  billing: string
  description: string
  features: string[]
  ctaText: string
  ctaHref: string
  badge?: string
  featured?: boolean
  comingSoon?: boolean
  footerNote?: string
}

export function PricingCard({
  name,
  price,
  billing,
  description,
  features,
  ctaText,
  ctaHref,
  badge,
  featured = false,
  comingSoon = false,
  footerNote,
}: PricingCardProps) {
  return (
    <Card
      className={`relative ${
        featured
          ? 'border-2 border-primary shadow-[0_8px_32px_rgba(255,136,0,0.3)] -translate-y-2 scale-105'
          : 'border-secondary-dark'
      } ${comingSoon ? 'opacity-80' : ''}`}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge
            variant={featured ? 'default' : 'outline'}
            className={featured ? 'bg-primary text-black' : 'border-primary text-primary'}
          >
            {badge}
          </Badge>
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription className="text-4xl font-bold text-text-select">
          {price}
          <span className="text-sm font-normal text-text-sub"> {billing}</span>
        </CardDescription>
        <p className="text-sm text-text">{description}</p>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm text-text">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button
          variant={featured ? 'default' : 'outline'}
          className="w-full"
          asChild
        >
          <Link href={ctaHref}>{ctaText}</Link>
        </Button>
        {footerNote && (
          <p className="text-xs text-text-sub text-center">{footerNote}</p>
        )}
      </CardFooter>
    </Card>
  )
}
