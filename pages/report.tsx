import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Seo from '../src/components/Seo'
import { cardsData } from '../src/data'
import ReportScreen from '../src/screens/ReportScreen'
import { clearSessionStorage } from '../src/state/session'
import { useSessionContext } from '../src/state/sessionContext'

export default function ReportPage() {
  const router = useRouter()
  const { state, dispatch } = useSessionContext()

  useEffect(() => {
    if (state.excludedElementIds.length < 4) {
      void router.replace('/keywords')
      return
    }
    if (state.roundIndexPos < state.roundsPerPhase.POS) {
      void router.replace('/match/pos')
      return
    }
    if (!state.skippedNeg && state.roundIndexNeg < state.roundsPerPhase.NEG) {
      void router.replace('/match/neg')
    }
  }, [
    state.roundIndexPos,
    state.roundIndexNeg,
    state.excludedElementIds.length,
    state.roundsPerPhase.POS,
    state.roundsPerPhase.NEG,
    state.skippedNeg,
    router,
  ])

  const scoresNeg = state.skippedNeg
    ? cardsData.elements.reduce<Record<string, number>>((acc, element) => {
        acc[element.id] = 0
        return acc
      }, {})
    : state.scoresNeg

  return (
    <>
      <Seo
        title="개인 리포트"
        description="선택 패턴을 바탕으로 당신의 동기 스위치 Top 3를 정리한 리포트입니다."
      />
      <div className="px-6 py-10 max-w-4xl mx-auto">
        <ReportScreen
          name={state.name}
          scoresPos={state.scoresPos}
          scoresNeg={scoresNeg}
          elements={cardsData.elements}
          excludedElementIds={state.excludedElementIds}
          onRestart={() => {
            clearSessionStorage()
            dispatch({ type: 'reset' })
            void router.push('/')
          }}
        />
      </div>
    </>
  )
}
