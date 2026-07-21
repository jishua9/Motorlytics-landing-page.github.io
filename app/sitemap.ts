import type { MetadataRoute } from 'next'

// Required by output:'export' so the route is emitted as a static file.
export const dynamic = 'force-static'

const BASE = 'https://motorlytics.com.au'

// next.config.ts sets trailingSlash: true, so the canonical URLs end in "/".
const ROUTES = ['/', '/features/', '/pricing/', '/about/']

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map((route) => ({
    url: `${BASE}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8,
  }))
}
