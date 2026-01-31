import { describe, expect, it } from 'vitest'

import { NEG_WEIGHT } from '../../data/constants'
import { computeFinalScores, getTopElements } from '../report'

describe('report helpers', () => {
  it('computes final scores with NEG weight', () => {
    const scoresPos = { E01: 2, E02: 1 }
    const scoresNeg = { E01: 1, E02: 3 }
    const result = computeFinalScores(scoresPos, scoresNeg, true)
    expect(result.E01).toBe(2 + NEG_WEIGHT * 1)
    expect(result.E02).toBe(1 + NEG_WEIGHT * 3)
  })

  it('returns top elements by score', () => {
    const elements = [
      { id: 'E01', name: 'A', axis: 'X' },
      { id: 'E02', name: 'B', axis: 'X' },
      { id: 'E03', name: 'C', axis: 'X' },
    ]
    const finalScores = { E01: 2, E02: 5, E03: 1 }
    const scoresPos = { E01: 2, E02: 3, E03: 1 }
    const scoresNeg = { E01: 0, E02: 2, E03: 0 }
    const result = getTopElements(elements, finalScores, scoresPos, scoresNeg, 2)
    expect(result.map((el) => el.id)).toEqual(['E02', 'E01'])
  })

  it('breaks ties using POS then NEG scores', () => {
    const elements = [
      { id: 'E01', name: 'A', axis: 'X' },
      { id: 'E02', name: 'B', axis: 'X' },
      { id: 'E03', name: 'C', axis: 'X' },
    ]
    // 동점 상황: E01, E02 둘 다 최종 3점
    const finalScores = { E01: 3, E02: 3, E03: 1 }
    // E02가 POS 점수가 더 높으므로 우선
    const scoresPos = { E01: 2, E02: 3, E03: 1 }
    const scoresNeg = { E01: 1, E02: 0, E03: 0 }
    const result = getTopElements(elements, finalScores, scoresPos, scoresNeg, 2)
    expect(result.map((el) => el.id)).toEqual(['E02', 'E01'])
  })
})
