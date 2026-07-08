import type { ReactNode } from 'react'
import { SiteNav } from '@/components/site/site-nav'
import { ProgressRail } from '@/components/site/progress-rail'
import { Hero } from '@/components/story/hero'
import { ActShell } from '@/components/story/act-shell'
import { FullWidthAct } from '@/components/story/full-width-act'
import { Conversion } from '@/components/story/conversion'
import { ACTS } from '@/lib/story'
import { StageCard } from '@/components/features/blocks'
import { PitwallDemo } from '@/components/features/pitwall-demo'
import { SetupSheetDemo } from '@/components/features/setup-sheet-demo'
import { SpeedTraceDemo } from '@/components/features/speed-trace-demo'
import { ResultsDemo } from '@/components/features/results-demo'
import { SetupHistoryDemo } from '@/components/features/setup-history-demo'

// The real (or faithful) component filling each half-width act stage.
// (pitwall and results render full-width via FullWidthAct, so aren't listed.)
const ACT_VISUALS: Record<string, ReactNode> = {
  setup: <SetupSheetDemo />,
  telemetry: (
    <StageCard title="Lap comparison · speed trace" subtitle="Your best lap against a reference">
      <SpeedTraceDemo />
    </StageCard>
  ),
  climax: <SetupHistoryDemo />,
}

// Wide components that get their own full-width story beat.
const FULL_WIDTH: Record<string, ReactNode> = {
  pitwall: <PitwallDemo />,
  results: (
    <div className="rounded-xl border border-secondary-dark bg-grid p-4">
      <ResultsDemo />
    </div>
  ),
}

export default function Home() {
  return (
    <>
      <SiteNav />
      <ProgressRail />
      <main>
        <Hero />

        {ACTS.map((act, i) =>
          FULL_WIDTH[act.id] ? (
            <FullWidthAct key={act.id} act={act}>
              {FULL_WIDTH[act.id]}
            </FullWidthAct>
          ) : (
            <ActShell key={act.id} act={act} index={i}>
              {ACT_VISUALS[act.id]}
            </ActShell>
          ),
        )}

        <Conversion />
      </main>
    </>
  )
}
