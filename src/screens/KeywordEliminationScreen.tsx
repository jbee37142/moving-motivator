import { useMemo } from 'react'

import type { ElementDefinition } from '../data/types'

type KeywordEliminationScreenProps = {
  elements: ElementDefinition[]
  excludedElementIds: string[]
  onToggleExclude: (id: string) => void
  onComplete: () => void
}

const MAX_EXCLUDE = 4

export default function KeywordEliminationScreen({
  elements,
  excludedElementIds,
  onToggleExclude,
  onComplete,
}: KeywordEliminationScreenProps) {
  const excludedSet = useMemo(
    () => new Set(excludedElementIds),
    [excludedElementIds],
  )
  const remaining = MAX_EXCLUDE - excludedElementIds.length

  return (
    <section className="space-y-6 mb-32">
      <div className="space-y-2">
        <p className="text-sm text-slate-500">키워드 제거</p>
        <h2 className="text-2xl font-semibold">
          나와 거리가 먼 키워드 4개를 골라 제거하세요.
        </h2>
        <p className="text-slate-600">
          선택된 4개는 이후 질문에서 제외됩니다. 지금은 “고르는 것”이 아니라
          “지우는 것”이에요.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {elements.map((element) => {
          const isExcluded = excludedSet.has(element.id)
          const isLimitReached = excludedElementIds.length >= MAX_EXCLUDE
          return (
            <button
              key={element.id}
              type="button"
              onClick={() => onToggleExclude(element.id)}
              className={`rounded-xl border px-4 py-4 text-left transition ${
                isExcluded
                  ? isLimitReached
                    ? 'border-rose-200 bg-rose-50 text-rose-400'
                    : 'border-rose-300 bg-rose-50 text-rose-600'
                  : isLimitReached
                    ? 'border-slate-900 bg-white text-slate-900'
                    : 'border-slate-200 bg-white text-slate-900 hover:border-slate-400'
              }`}
            >
              <p className="text-lg font-semibold">{element.name}</p>
              <p className="mt-2 text-xs text-slate-500">
                {isExcluded
                  ? '제거됨'
                  : excludedElementIds.length === 0
                    ? '탭하여 제거'
                    : ''}
              </p>
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onComplete}
          disabled={excludedElementIds.length !== MAX_EXCLUDE}
          className="px-6 py-3 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          다음으로
        </button>
        <span className="text-xs text-slate-500">
          남은 제거 {remaining} · 제거됨 {excludedElementIds.length}/
          {MAX_EXCLUDE}
        </span>
      </div>
    </section>
  )
}
