import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'

import { cardsData } from '../../src/data'
import Seo from '../../src/components/Seo'
import { drawPair, groupCardsByPolarity } from '../../src/lib/matching'
import MatchScreen from '../../src/screens/MatchScreen'
import { useSessionContext } from '../../src/state/sessionContext'

export default function PosMatchPage() {
  const router = useRouter()
  const { state, dispatch } = useSessionContext()
  const availableCards = useMemo(
    () =>
      cardsData.cards.filter(
        (card) => !state.excludedElementIds.includes(card.element_id),
      ),
    [state.excludedElementIds],
  )
  const cardsByPolarity = useMemo(
    () => groupCardsByPolarity(availableCards),
    [availableCards],
  )

  useEffect(() => {
    if (state.excludedElementIds.length < 4) {
      void router.replace('/keywords')
      return
    }
    if (state.roundIndexPos >= state.roundsPerPhase.POS) {
      void router.replace('/match/neg')
      return
    }
    if (!state.currentPairPos) {
      dispatch({
        type: 'setPair',
        phase: 'POS',
        pair: drawPair(cardsByPolarity.POS, state.seenPos),
      })
    }
  }, [
    state.roundIndexPos,
    state.roundsPerPhase.POS,
    state.currentPairPos,
    state.seenPos,
    state.excludedElementIds.length,
    cardsByPolarity,
    dispatch,
    router,
  ])

  return (
    <>
      <Seo
        title="매치 - 동기부여"
        description="두 상황 중 더 에너지가 올라가는 쪽을 선택해 동기부여 패턴을 찾아요."
      />
      <div className="px-6 py-10 max-w-4xl mx-auto">
        <MatchScreen
          phase="POS"
          roundIndex={state.roundIndexPos}
          roundsTotal={state.roundsPerPhase.POS}
          pair={state.currentPairPos}
          onSelect={(selection) =>
            dispatch({ type: 'applySelection', phase: 'POS', selection })
          }
        />
      </div>
    </>
  )
}
