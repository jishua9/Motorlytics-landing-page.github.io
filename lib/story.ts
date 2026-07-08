// The Race Weekend narrative acts.
// Each act is one beat of the scroll story. `slot` names the REAL app
// component that will eventually live here (placeholders render it for now).

export type Act = {
  id: string
  /** short label shown in the progress rail */
  label: string
  /** the "phase of the weekend" kicker */
  kicker: string
  title: string
  copy: string
  /** the real Motorlytics component that will fill this act */
  slot: string
  accent?: 'primary' | 'cyan' | 'green'
}

export const ACTS: Act[] = [
  {
    id: 'pitwall',
    label: 'Pit Wall',
    kicker: 'Friday · Setup day',
    title: 'One command centre for the whole weekend',
    copy: 'Every session, result, weather window and setup change for the event, collated onto a single pit wall. No spreadsheets, no group chats, no lost notes.',
    slot: 'PitWall (Dashboard tab)',
    accent: 'primary',
  },
  {
    id: 'setup',
    label: 'Setup',
    kicker: 'Saturday · Qualifying',
    title: 'Your setup sheet, off paper',
    copy: 'Log the car exactly the way your setup sheet already reads, corner by corner. Every change is timestamped against the session it ran in.',
    slot: 'Setup sheet + weekend pace chart',
    accent: 'primary',
  },
  {
    id: 'telemetry',
    label: 'Telemetry',
    kicker: 'Saturday · Debrief',
    title: 'See where the lap was won and lost',
    copy: 'Import your MoTeC or AiM data and overlay it on the circuit. Speed, throttle and brake read out corner by corner, lap against lap.',
    slot: 'Lap map + corner analysis',
    accent: 'cyan',
  },
  {
    id: 'results',
    label: 'Results',
    kicker: 'Sunday · Race',
    title: 'Results that mean something',
    copy: 'Finishing position, gaps and best laps land next to the setup and conditions that produced them, so the result is never just a number.',
    slot: 'Results table + quick stats',
    accent: 'green',
  },
  {
    id: 'climax',
    label: 'The Find',
    kicker: 'The whole point',
    title: 'Last time it was like this, here’s what you ran',
    copy: 'Motorlytics finds your past sessions at this track, in this car, in the most similar weather, and shows which setup change actually found the time. Setups off paper. Last time, found for you.',
    slot: 'Weather-match reveal · setup diff · −0.3s',
    accent: 'primary',
  },
]
