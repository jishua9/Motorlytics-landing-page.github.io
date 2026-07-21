import { ImageResponse } from 'next/og'

// Generator for public/og-image.png. Not part of the app build: the App
// Router opengraph-image convention emits an extensionless file, which
// GitHub Pages would serve with the wrong Content-Type.
//
// To regenerate: move this file to app/opengraph-image.tsx, run
// `npm run build`, copy out/opengraph-image to public/og-image.png, then
// move this file back here.
export const dynamic = 'force-static'

export const alt = 'Motorlytics · Your whole race weekend in one place'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// The Race Engineer's Laptop, compressed to a card: Night Carbon surface,
// Signal Orange accent, timing-screen sector blocks. Rendered at build time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0D1117',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 28,
              height: 28,
              backgroundColor: '#ff8800',
              borderRadius: 6,
            }}
          />
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: '#F5F5F6',
              letterSpacing: 2,
            }}
          >
            MOTORLYTICS
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: '#F5F5F6',
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Your whole race weekend in one place
          </div>
          <div style={{ fontSize: 34, color: '#B5B9BD' }}>
            Setup · Telemetry · Weather · Results
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', gap: 10 }}>
            <div
              style={{
                width: 64,
                height: 10,
                backgroundColor: '#A855F7',
                borderRadius: 2,
              }}
            />
            <div
              style={{
                width: 64,
                height: 10,
                backgroundColor: '#00ff41',
                borderRadius: 2,
              }}
            />
            <div
              style={{
                width: 64,
                height: 10,
                backgroundColor: '#ff8800',
                borderRadius: 2,
              }}
            />
          </div>
          <div style={{ fontSize: 30, color: '#ff8800' }}>
            motorlytics.com.au
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
