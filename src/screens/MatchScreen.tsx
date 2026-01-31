import { useEffect, useState } from 'react'

import type { CardDefinition } from '../data/types'
import ScenarioCard from './ScenarioCard'

type MatchScreenProps = {
  phase: 'POS' | 'NEG'
  roundIndex: number
  roundsTotal: number
  pair: [CardDefinition, CardDefinition] | null
  onSelect: (selection: 'LEFT' | 'RIGHT' | 'NEUTRAL') => void
}

export default function MatchScreen({
  phase,
  roundIndex,
  roundsTotal,
  pair,
  onSelect,
}: MatchScreenProps) {
  const [isLocked, setIsLocked] = useState(false)
  const step = Math.min(roundIndex + 1, roundsTotal)
  const label = phase === 'POS' ? '동기부여' : '동기저해'
  const helper =
    phase === 'POS'
      ? '더 에너지가 올라가는 상황을 골라주세요.'
      : '더 에너지가 빨리 소진되는 상황을 골라주세요.'
  const tone =
    phase === 'POS'
      ? {
          label: 'text-slate-700',
          cardHover: 'hover:border-slate-400',
          surface: 'border-slate-200 bg-white text-slate-500',
        }
      : {
          label: 'text-rose-600',
          cardHover: 'hover:border-rose-400',
          surface: 'border-rose-200 bg-rose-50 text-rose-600',
        }

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (isLocked) return
      if (event.key === 'ArrowLeft') onSelect('LEFT')
      if (event.key === 'ArrowRight') onSelect('RIGHT')
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isLocked, onSelect])

  useEffect(() => {
    if (!pair) return
    setIsLocked(false)
  }, [pair])

  const selectAndLock = (selection: 'LEFT' | 'RIGHT' | 'NEUTRAL') => {
    if (isLocked) return
    setIsLocked(true)
    onSelect(selection)
  }

  return (
    <section className="space-y-6 break-keep wrap-anywhere">
      <div>
        <p className={`text-sm ${tone.label}`}>{label}</p>
        <h2 className="text-2xl font-semibold">
          현재 {step} / {roundsTotal}
        </h2>
        <p className="text-slate-600">{helper}</p>
      </div>

      {pair && (
        <div className="grid md:grid-cols-2 gap-4">
          <ScenarioCard
            text={pair[0].text}
            onSelect={() => selectAndLock('LEFT')}
            toneClass={tone.cardHover}
          />
          <ScenarioCard
            text={pair[1].text}
            onSelect={() => selectAndLock('RIGHT')}
            toneClass={tone.cardHover}
          />
        </div>
      )}

    </section>
  )
}
