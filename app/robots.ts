import type { MetadataRoute } from 'next'

// Required by output:'export' so the route is emitted as a static file.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://motorlytics.com.au/sitemap.xml',
  }
}
