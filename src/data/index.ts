import rawCardsData from './cards.json'
import { validateCardsData } from './loadCards'

export const cardsData = validateCardsData(rawCardsData)
