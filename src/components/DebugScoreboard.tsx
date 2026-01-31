import type { ElementDefinition } from '../data/types'

type DebugScoreboardProps = {
  elements: ElementDefinition[]
  scoresPos: Record<string, number>
  scoresNeg: Record<string, number>
  roundIndexPos: number
  roundIndexNeg: number
  roundsPerPhase: { POS: number; NEG: number }
  excludedElementIds?: string[]
}

export default function DebugScoreboard({
  elements,
  scoresPos,
  scoresNeg,
  roundIndexPos,
  roundIndexNeg,
  roundsPerPhase,
  excludedElementIds = [],
}: DebugScoreboardProps) {
  const excludedSet = new Set(excludedElementIds)
  return (
    <aside className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      <div className="mx-auto max-w-6xl px-4 pb-3">
        <div className="pointer-events-auto rounded-xl border border-slate-200 bg-white/90 text-slate-700 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-slate-500">
            <span>Debug Console</span>
            <span>
              P {Math.min(roundIndexPos, roundsPerPhase.POS)}/
              {roundsPerPhase.POS} · N{' '}
              {Math.min(roundIndexNeg, roundsPerPhase.NEG)}/
              {roundsPerPhase.NEG} · EX {excludedElementIds.length}/4
            </span>
          </div>
          <div className="max-h-28 overflow-y-auto px-3 pb-2 text-[11px] leading-snug">
            <div className="grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {elements.map((element) => {
                const pos = scoresPos[element.id] ?? 0
                const neg = scoresNeg[element.id] ?? 0
                const total = pos + neg
                return (
                  <div
                    key={element.id}
                    className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-2 py-1"
                  >
                    <span
                      className={`truncate ${
                        excludedSet.has(element.id)
                          ? 'text-rose-400/70 line-through'
                          : 'text-slate-700'
                      }`}
                    >
                      {element.name}
                    </span>
                    <span className="ml-2 text-slate-500">
                      {pos.toFixed(1)} / {neg.toFixed(1)} / {total.toFixed(1)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
