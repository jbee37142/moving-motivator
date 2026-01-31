import { useEffect, useMemo, useReducer } from 'react'

import type { CardDefinition, ElementDefinition } from '../data/types'
import { DEFAULT_ROUNDS } from '../data/constants'

export type Phase = 'POS' | 'NEG'
export type Selection = 'LEFT' | 'RIGHT' | 'NEUTRAL'

export type SessionState = {
  name: string
  roundsPerPhase: { POS: number; NEG: number }
  roundIndexPos: number
  roundIndexNeg: number
  currentPairPos: [CardDefinition, CardDefinition] | null
  currentPairNeg: [CardDefinition, CardDefinition] | null
  scoresPos: Record<string, number>
  scoresNeg: Record<string, number>
  seenPos: string[]
  seenNeg: string[]
  skippedNeg: boolean
  excludedElementIds: string[]
}

type SessionStorage = {
  schemaVersion: number
  name: string
  roundsPerPhase: { POS: number; NEG: number }
  roundIndexPos: number
  roundIndexNeg: number
  currentPairPosIds: [string, string] | null
  currentPairNegIds: [string, string] | null
  scoresPos: Record<string, number>
  scoresNeg: Record<string, number>
  seenPos: string[]
  seenNeg: string[]
  skippedNeg: boolean
  excludedElementIds: string[]
}

type Action =
  | { type: 'setName'; name: string }
  | { type: 'setExcludedElements'; excludedElementIds: string[] }
  | {
      type: 'setPair'
      phase: Phase
      pair: [CardDefinition, CardDefinition] | null
    }
  | { type: 'applySelection'; phase: Phase; selection: Selection }
  | { type: 'skipNeg' }
  | { type: 'reset' }

const STORAGE_KEY = 'moving-motivator-session'
const SCHEMA_VERSION = 3

const createScores = (elements: ElementDefinition[]) =>
  elements.reduce<Record<string, number>>((acc, element) => {
    acc[element.id] = 0
    return acc
  }, {})

const getInitialState = (elements: ElementDefinition[]): SessionState => ({
  name: '',
  roundsPerPhase: { ...DEFAULT_ROUNDS },
  roundIndexPos: 0,
  roundIndexNeg: 0,
  currentPairPos: null,
  currentPairNeg: null,
  scoresPos: createScores(elements),
  scoresNeg: createScores(elements),
  seenPos: [],
  seenNeg: [],
  skippedNeg: false,
  excludedElementIds: [],
})

const toStorage = (state: SessionState): SessionStorage => ({
  schemaVersion: SCHEMA_VERSION,
  name: state.name,
  roundsPerPhase: state.roundsPerPhase,
  roundIndexPos: state.roundIndexPos,
  roundIndexNeg: state.roundIndexNeg,
  currentPairPosIds: state.currentPairPos
    ? [state.currentPairPos[0].id, state.currentPairPos[1].id]
    : null,
  currentPairNegIds: state.currentPairNeg
    ? [state.currentPairNeg[0].id, state.currentPairNeg[1].id]
    : null,
  scoresPos: state.scoresPos,
  scoresNeg: state.scoresNeg,
  seenPos: state.seenPos,
  seenNeg: state.seenNeg,
  skippedNeg: state.skippedNeg,
  excludedElementIds: state.excludedElementIds,
})

const normalizeRounds = (
  rounds: SessionStorage['roundsPerPhase'] | undefined,
  fallback: SessionState['roundsPerPhase'],
) => {
  if (!rounds) return fallback
  const pos = Number.isFinite(rounds.POS) ? rounds.POS : fallback.POS
  const neg = Number.isFinite(rounds.NEG) ? rounds.NEG : fallback.NEG
  return { POS: pos, NEG: neg }
}

const safeNumber = (value: number | undefined, fallback: number) =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback

const fromStorage = (
  stored: SessionStorage,
  cardsById: Record<string, CardDefinition>,
  fallback: SessionState,
): SessionState => {
  if (stored.schemaVersion !== SCHEMA_VERSION) {
    return fallback
  }
  const pairPos = stored.currentPairPosIds?.map((id) => cardsById[id]).filter(Boolean)
  const pairNeg = stored.currentPairNegIds?.map((id) => cardsById[id]).filter(Boolean)
  const scoresPos =
    stored.scoresPos && Object.keys(stored.scoresPos).length > 0
      ? stored.scoresPos
      : fallback.scoresPos
  const scoresNeg =
    stored.scoresNeg && Object.keys(stored.scoresNeg).length > 0
      ? stored.scoresNeg
      : fallback.scoresNeg
  const seenPos = Array.isArray(stored.seenPos) ? stored.seenPos : []
  const seenNeg = Array.isArray(stored.seenNeg) ? stored.seenNeg : []
  const excludedElementIds = Array.isArray(stored.excludedElementIds)
    ? stored.excludedElementIds
    : []

  return {
    ...fallback,
    name: stored.name,
    roundsPerPhase: normalizeRounds(stored.roundsPerPhase, fallback.roundsPerPhase),
    roundIndexPos: safeNumber(stored.roundIndexPos, 0),
    roundIndexNeg: safeNumber(stored.roundIndexNeg, 0),
    currentPairPos: pairPos?.length === 2 ? [pairPos[0], pairPos[1]] : null,
    currentPairNeg: pairNeg?.length === 2 ? [pairNeg[0], pairNeg[1]] : null,
    scoresPos,
    scoresNeg,
    seenPos,
    seenNeg,
    skippedNeg: Boolean(stored.skippedNeg),
    excludedElementIds,
  }
}

const reducer = (elements: ElementDefinition[]) => {
  const initial = getInitialState(elements)

  return (state: SessionState, action: Action): SessionState => {
    switch (action.type) {
      case 'setName':
        return { ...state, name: action.name }
      case 'setExcludedElements':
        return {
          ...state,
          excludedElementIds: action.excludedElementIds,
          roundIndexPos: 0,
          roundIndexNeg: 0,
          currentPairPos: null,
          currentPairNeg: null,
          seenPos: [],
          seenNeg: [],
        }
      case 'setPair':
        return action.phase === 'POS'
          ? { ...state, currentPairPos: action.pair }
          : { ...state, currentPairNeg: action.pair }
      case 'applySelection': {
        const currentPair =
          action.phase === 'POS' ? state.currentPairPos : state.currentPairNeg
        if (!currentPair) return state
        const [left, right] = currentPair
        const isPos = action.phase === 'POS'
        const nextScoresPos = { ...state.scoresPos }
        const nextScoresNeg = { ...state.scoresNeg }
        const scores = isPos ? nextScoresPos : nextScoresNeg
        const addScore = (elementId: string, delta: number) => {
          scores[elementId] = (scores[elementId] ?? 0) + delta
        }
        if (action.selection === 'LEFT') {
          addScore(left.element_id, 1)
        } else if (action.selection === 'RIGHT') {
          addScore(right.element_id, 1)
        } else {
          // 동점 확률을 낮추기 위해 NEUTRAL 가중치 감소 (0.5 → 0.3)
          addScore(left.element_id, 0.3)
          addScore(right.element_id, 0.3)
        }

        const seenSet = new Set(isPos ? state.seenPos : state.seenNeg)
        seenSet.add(left.id)
        seenSet.add(right.id)

        if (isPos) {
          return {
            ...state,
            roundIndexPos: state.roundIndexPos + 1,
            currentPairPos: null,
            seenPos: Array.from(seenSet),
            scoresPos: nextScoresPos,
            scoresNeg: nextScoresNeg,
          }
        }
        return {
          ...state,
          roundIndexNeg: state.roundIndexNeg + 1,
          currentPairNeg: null,
          seenNeg: Array.from(seenSet),
          scoresPos: nextScoresPos,
          scoresNeg: nextScoresNeg,
        }
      }
      case 'skipNeg':
        return { ...state, skippedNeg: true, currentPairNeg: null }
      case 'reset':
        return { ...initial }
      default:
        return state
    }
  }
}

export const useSession = (
  elements: ElementDefinition[],
  cards: CardDefinition[],
) => {
  const cardsById = useMemo(
    () =>
      cards.reduce<Record<string, CardDefinition>>((acc, card) => {
        acc[card.id] = card
        return acc
      }, {}),
    [cards],
  )

  const [state, dispatch] = useReducer(
    reducer(elements),
    getInitialState(elements),
    (initial) => {
      if (typeof window === 'undefined') return initial
      const fromSession = window.sessionStorage.getItem(STORAGE_KEY)
      const fromLocal = window.localStorage.getItem(STORAGE_KEY)
      const raw = fromSession ?? fromLocal
      if (!raw) return initial
      try {
        const parsed = JSON.parse(raw) as SessionStorage
        const next = fromStorage(parsed, cardsById, initial)
        // 마이그레이션: 기존 localStorage에 저장돼 있던 세션을 sessionStorage로 이동
        if (!fromSession && fromLocal) {
          window.sessionStorage.setItem(STORAGE_KEY, raw)
          window.localStorage.removeItem(STORAGE_KEY)
        }
        return next
      } catch {
        return initial
      }
    },
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toStorage(state)))
  }, [state])

  return { state, dispatch }
}

export const clearSessionStorage = () => {
  if (typeof window === 'undefined') return
  window.sessionStorage.removeItem(STORAGE_KEY)
  // 과거 버전에서 localStorage를 썼던 흔적도 함께 정리
  window.localStorage.removeItem(STORAGE_KEY)
}
