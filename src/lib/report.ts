import type { ElementDefinition } from '../data/types'
import { NEG_WEIGHT } from '../data/constants'

export type ScoreMap = Record<string, number>

export const computeFinalScores = (
  scoresPos: ScoreMap,
  scoresNeg: ScoreMap,
  applyNegWeight = true,
): ScoreMap => {
  const result: ScoreMap = {}
  const weight = applyNegWeight ? NEG_WEIGHT : 1
  for (const key of Object.keys(scoresPos)) {
    result[key] = (scoresPos[key] ?? 0) + weight * (scoresNeg[key] ?? 0)
  }
  return result
}

export const getTopElements = (
  elements: ElementDefinition[],
  finalScores: ScoreMap,
  scoresPos: ScoreMap,
  scoresNeg: ScoreMap,
  count = 3,
): ElementDefinition[] => {
  return [...elements]
    .sort((a, b) => {
      const finalDiff = (finalScores[b.id] ?? 0) - (finalScores[a.id] ?? 0)
      if (finalDiff !== 0) return finalDiff
      // 동점 시 POS가 높은 쪽 우선 (더 자주 에너지 켜짐)
      const posDiff = (scoresPos[b.id] ?? 0) - (scoresPos[a.id] ?? 0)
      if (posDiff !== 0) return posDiff
      // 그래도 동점이면 NEG가 낮은 쪽 우선 (덜 꺼지는 요소)
      return (scoresNeg[a.id] ?? 0) - (scoresNeg[b.id] ?? 0)
    })
    .slice(0, count)
}
