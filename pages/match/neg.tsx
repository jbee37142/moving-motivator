import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'

import { cardsData } from '../../src/data'
import Seo from '../../src/components/Seo'
import { drawPair, groupCardsByPolarity } from '../../src/lib/matching'
import MatchScreen from '../../src/screens/MatchScreen'
import { useSessionContext } from '../../src/state/sessionContext'

export default function NegMatchPage() {
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
    if (state.skippedNeg) {
      void router.replace('/report')
      return
    }
    if (state.roundIndexNeg >= state.roundsPerPhase.NEG) {
      void router.replace('/report')
      return
    }
    if (!state.currentPairNeg) {
      dispatch({
        type: 'setPair',
        phase: 'NEG',
        pair: drawPair(cardsByPolarity.NEG, state.seenNeg),
      })
    }
  }, [
    state.roundIndexNeg,
    state.roundsPerPhase.NEG,
    state.currentPairNeg,
    state.seenNeg,
    state.skippedNeg,
    state.excludedElementIds.length,
    cardsByPolarity,
    dispatch,
    router,
  ])

  return (
    <>
      <Seo
        title="매치 - 동기저해"
        description="두 상황 중 더 에너지가 빨리 소진되는 쪽을 선택해 동기저해 패턴을 찾아요."
      />
      <div className="px-6 py-10 max-w-4xl mx-auto">
        <MatchScreen
          phase="NEG"
          roundIndex={state.roundIndexNeg}
          roundsTotal={state.roundsPerPhase.NEG}
          pair={state.currentPairNeg}
          onSelect={(selection) =>
            dispatch({ type: 'applySelection', phase: 'NEG', selection })
          }
        />
      </div>
    </>
  )
}
