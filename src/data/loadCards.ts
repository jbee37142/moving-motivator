import type { CardDefinition, CardsData, ElementDefinition } from './types'

const ELEMENT_COUNT = 16
const CARDS_PER_ELEMENT = 8
const POS_PER_ELEMENT = 4
const NEG_PER_ELEMENT = 4

type ValidationResult = {
  elements: ElementDefinition[]
  cards: CardDefinition[]
}

const assert = (condition: boolean, message: string) => {
  if (!condition) {
    throw new Error(`[cards-data] ${message}`)
  }
}

export const validateCardsData = (data: unknown): ValidationResult => {
  assert(Boolean(data) && typeof data === 'object', 'data must be an object')
  const payload = data as CardsData
  assert(Array.isArray(payload.elements), 'elements must be an array')
  assert(Array.isArray(payload.cards), 'cards must be an array')
  assert(
    payload.elements.length === ELEMENT_COUNT,
    `expected ${ELEMENT_COUNT} elements`,
  )
  assert(
    payload.cards.length === ELEMENT_COUNT * CARDS_PER_ELEMENT,
    `expected ${ELEMENT_COUNT * CARDS_PER_ELEMENT} cards`,
  )

  const elementIds = new Set<string>()
  for (const element of payload.elements) {
    assert(element.id.length > 0, 'element id is required')
    assert(!elementIds.has(element.id), `duplicate element id ${element.id}`)
    elementIds.add(element.id)
  }

  const cardIds = new Set<string>()
  const perElementCounts: Record<
    string,
    { pos: number; neg: number; total: number }
  > = {}

  for (const card of payload.cards) {
    assert(card.id.length > 0, 'card id is required')
    assert(!cardIds.has(card.id), `duplicate card id ${card.id}`)
    cardIds.add(card.id)
    assert(
      elementIds.has(card.element_id),
      `card ${card.id} references unknown element ${card.element_id}`,
    )
    assert(card.text.length > 0, `card ${card.id} text is required`)
    assert(card.polarity === 'POS' || card.polarity === 'NEG', 'bad polarity')

    if (!perElementCounts[card.element_id]) {
      perElementCounts[card.element_id] = { pos: 0, neg: 0, total: 0 }
    }
    const target = perElementCounts[card.element_id]
    target.total += 1
    if (card.polarity === 'POS') {
      target.pos += 1
    } else {
      target.neg += 1
    }
  }

  for (const elementId of elementIds) {
    const counts = perElementCounts[elementId]
    assert(
      counts?.total === CARDS_PER_ELEMENT,
      `element ${elementId} needs ${CARDS_PER_ELEMENT}`,
    )
    assert(
      counts?.pos === POS_PER_ELEMENT && counts?.neg === NEG_PER_ELEMENT,
      `element ${elementId} needs POS ${POS_PER_ELEMENT} / NEG ${NEG_PER_ELEMENT}`,
    )
  }

  return {
    elements: payload.elements,
    cards: payload.cards,
  }
}
