import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { cardsData } from '../src/data'
import Seo from '../src/components/Seo'
import KeywordEliminationScreen from '../src/screens/KeywordEliminationScreen'
import { useSessionContext } from '../src/state/sessionContext'

const MAX_EXCLUDE = 4

export default function KeywordPage() {
  const router = useRouter()
  const { state, dispatch } = useSessionContext()
  const canContinue = state.excludedElementIds.length === MAX_EXCLUDE
  const excludedSet = useMemo(
    () => new Set(state.excludedElementIds),
    [state.excludedElementIds],
  )

  const toggleExclude = (id: string) => {
    const next = new Set(excludedSet)
    if (next.has(id)) {
      next.delete(id)
    } else if (next.size < MAX_EXCLUDE) {
      next.add(id)
    }
    dispatch({
      type: 'setExcludedElements',
      excludedElementIds: Array.from(next),
    })
  }

  const handleComplete = () => {
    if (state.excludedElementIds.length !== MAX_EXCLUDE) return
    void router.push('/match/pos')
  }

  return (
    <>
      <Seo
        title="키워드 선택"
        description="나와 맞지 않는 요소를 4개 선택해 제외하고, 매치를 시작할 준비를 해요."
      />
      <div className="px-6 py-10 max-w-5xl mx-auto">
        <KeywordEliminationScreen
          elements={cardsData.elements}
          excludedElementIds={state.excludedElementIds}
          onToggleExclude={toggleExclude}
          onComplete={handleComplete}
        />
        {canContinue && (
          <p className="mt-4 text-sm text-slate-400">
            제거 완료! 다음으로 진행해 주세요.
          </p>
        )}
      </div>
    </>
  )
}
