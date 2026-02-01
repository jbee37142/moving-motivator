import { useRef, useState } from 'react'

import {
  animalBgByElementId,
  animalByElementId,
  animalEmojiByElementId,
  reportCopyByElementId
} from '../data/reportContent'
import type { ElementDefinition } from '../data/types'
import { computeFinalScores, getTopElements } from '../lib/report'

type ReportScreenProps = {
  name: string
  scoresPos: Record<string, number>
  scoresNeg: Record<string, number>
  elements: ElementDefinition[]
  excludedElementIds: string[]
  onRestart: () => void
}

export default function ReportScreen({
  name,
  scoresPos,
  scoresNeg,
  elements,
  excludedElementIds,
  onRestart,
}: ReportScreenProps) {
  const displayName = name.trim().length > 0 ? name.trim() : '당신'
  const availableElements = elements.filter(
    (element) => !excludedElementIds.includes(element.id),
  )
  const finalScores = computeFinalScores(scoresPos, scoresNeg, true)
  const topElements = getTopElements(
    availableElements,
    finalScores,
    scoresPos,
    scoresNeg,
    3,
  )
  const cardRef = useRef<HTMLDivElement>(null)
  const [saving, setSaving] = useState(false)
  const topOne = topElements[0]

  const buildGuide = (element: ElementDefinition) => {
    const copy = reportCopyByElementId[element.id]
    const tips = copy?.tips ?? []
    const tipSentence =
      tips.length > 0 ? `오늘은 ${tips[0]}부터 시작해 보세요.` : ''
    return `${element.name}에서 에너지가 자주 켜집니다. ${copy?.why ?? ''} ${tipSentence}`.trim()
  }

  const handleSaveImage = async () => {
    if (!cardRef.current || saving) return
    setSaving(true)
    try {
      const { toPng } = await import('html-to-image')
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: window.devicePixelRatio,
      })
      const link = document.createElement('a')
      link.download = `동기스위치_${topOne?.name ?? 'Top1'}.png`
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (e) {
      console.error('이미지 저장 실패', e)
      alert('이미지 저장에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="space-y-8 mb-32 break-keep wrap-anywhere">
      <div className="space-y-3">
        <p className="text-sm text-slate-500">개인 리포트</p>
        <h2 className="text-3xl font-semibold">
          {displayName}의 동기 스위치 Top 3
        </h2>
      </div>

      {topOne && (
        <article
          ref={cardRef}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div
              className={`h-20 w-20 rounded-full flex items-center justify-center text-4xl ${animalBgByElementId[topOne.id] ?? 'bg-slate-100'}`}
            >
              {animalEmojiByElementId[topOne.id] ?? '🐾'}
            </div>
            <div>
              <h3 className="text-2xl font-semibold">
                {animalByElementId[topOne.id] ?? '동물 카드'}
              </h3>
              <p className="text-sm text-slate-500">{topOne.name}</p>
            </div>
          </div>
          <p className="text-slate-600">
            {topOne.description}
          </p>
          {(topOne.mascot?.keywords?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-2">
              {topOne.mascot?.keywords?.map((keyword) => (
                <span
                  key={keyword}
                  className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          )}
          {reportCopyByElementId[topOne.id]?.why && (
            <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              {reportCopyByElementId[topOne.id].why}
            </div>
          )}
        </article>
      )}

      <div className="grid gap-4">
        {topElements.map((element, index) => {
          const copy = reportCopyByElementId[element.id]
          const keywords = element.mascot?.keywords ?? []
          return (
            <article
              key={element.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm"
            >
              <header className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Top {index + 1}</p>
                  <h3 className="text-2xl font-semibold">{element.name}</h3>
                  <p className="text-sm text-slate-500">{element.axis}</p>
                </div>
                <span className="text-sm text-slate-500">
                  점수 {finalScores[element.id]?.toFixed(1)}
                </span>
              </header>
              {element.description && (
                <p className="text-sm text-slate-600">{element.description}</p>
              )}
              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              )}
              <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                {buildGuide(element)}
              </div>
              <p className="text-slate-700">{copy?.why}</p>
              {element.message && (
                <p className="text-sm text-slate-600 whitespace-pre-line">
                  {element.message}
                </p>
              )}
            </article>
          )
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSaveImage}
          disabled={saving}
          className="px-5 py-3 rounded-lg border border-slate-300 text-slate-700 hover:border-slate-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? '저장 중…' : '이미지로 저장'}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="px-5 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition"
        >
          다시 하기
        </button>
      </div>
    </section>
  )
}
