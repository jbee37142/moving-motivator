import type { CardDefinition, CardPolarity } from '../data/types'

const pickRandom = <T,>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)]
}

export const groupCardsByPolarity = (cards: CardDefinition[]) => {
  const result: Record<CardPolarity, CardDefinition[]> = {
    POS: [],
    NEG: [],
  }
  for (const card of cards) {
    result[card.polarity].push(card)
  }
  return result
}

export const drawPair = (
  cards: CardDefinition[],
  seenIds: string[],
): [CardDefinition, CardDefinition] => {
  const seenSet = new Set(seenIds)
  const unseen = cards.filter((card) => !seenSet.has(card.id))
  const pool = unseen.length >= 2 ? unseen : cards
  const left = pickRandom(pool)
  const rightCandidates = pool.filter(
    (card) => card.element_id !== left.element_id && card.id !== left.id,
  )
  const rightPool =
    rightCandidates.length > 0
      ? rightCandidates
      : cards.filter((card) => card.element_id !== left.element_id)
  const right = pickRandom(rightPool)
  return [left, right]
}
