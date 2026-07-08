import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Emit `features/index.html` so both /features and /features/ resolve on
  // GitHub Pages (avoids trailing-slash 404s).
  trailingSlash: true,
}

export default nextConfig
