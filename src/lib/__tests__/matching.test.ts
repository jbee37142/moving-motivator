import { describe, expect, it } from 'vitest'

import type { CardDefinition } from '../../data/types'
import { drawPair } from '../matching'

describe('matching', () => {
  it('draws two cards from different elements', () => {
    const cards: CardDefinition[] = [
      { id: 'C1', element_id: 'E01', polarity: 'POS', text: 'a', intensity_level: 2 },
      { id: 'C2', element_id: 'E02', polarity: 'POS', text: 'b', intensity_level: 2 },
      { id: 'C3', element_id: 'E03', polarity: 'POS', text: 'c', intensity_level: 2 },
    ]
    const [left, right] = drawPair(cards, [])
    expect(left.element_id).not.toBe(right.element_id)
  })

  it('prefers unseen cards when possible', () => {
    const cards: CardDefinition[] = [
      { id: 'C1', element_id: 'E01', polarity: 'POS', text: 'a', intensity_level: 2 },
      { id: 'C2', element_id: 'E02', polarity: 'POS', text: 'b', intensity_level: 2 },
      { id: 'C3', element_id: 'E03', polarity: 'POS', text: 'c', intensity_level: 2 },
    ]
    const [left, right] = drawPair(cards, ['C1'])
    expect([left.id, right.id]).not.toEqual(['C1', 'C1'])
  })
})
