import { createContext, useContext } from 'react'

import { cardsData } from '../data'
import { useSession } from './session'

type SessionContextValue = ReturnType<typeof useSession>

const SessionContext = createContext<SessionContextValue | null>(null)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const session = useSession(cardsData.elements, cardsData.cards)

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSessionContext() {
  const value = useContext(SessionContext)
  if (!value) {
    throw new Error('useSessionContext must be used within SessionProvider')
  }
  return value
}
