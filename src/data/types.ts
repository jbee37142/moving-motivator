export type CardPolarity = 'POS' | 'NEG'

export type MascotDefinition = {
  emoji?: string
  animal?: string
  mode_name?: string
  keywords?: string[]
  one_liner?: string
  description?: string
}

export type ElementDefinition = {
  id: string
  name: string
  axis: string
  company?: string
  description?: string
  mascot?: MascotDefinition
  message?: string
}

export type CardDefinition = {
  id: string
  element_id: string
  polarity: CardPolarity
  text: string
  intensity_level: number
}

export type CardsData = {
  version: string
  locale: string
  generated_at: string
  elements: ElementDefinition[]
  cards: CardDefinition[]
}
