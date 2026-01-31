import type { AppProps } from 'next/app'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import DebugScoreboard from '../src/components/DebugScoreboard'
import Header from '../src/components/Header'
import Seo from '../src/components/Seo'
import { cardsData } from '../src/data'
import { SessionProvider, useSessionContext } from '../src/state/sessionContext'
import '../src/styles.css'

export default function App({ Component, pageProps }: AppProps) {
  const showDebug = process.env.NODE_ENV !== 'production'
  const gaId = 'G-W6YNG90XHH'
  const router = useRouter()

  useEffect(() => {
    if (!gaId) return

    const handleRouteChange = (url: string) => {
      window.gtag?.('config', gaId, { page_path: url })
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [gaId, router.events])

  return (
    <SessionProvider>
      {gaId && (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');
`}
          </Script>
        </>
      )}
      <Seo />
      <Header />
      <main className="min-h-screen bg-white text-slate-900">
        <Component {...pageProps} />
      </main>
      {showDebug && <ClientOnlyDebugScoreboard />}
    </SessionProvider>
  )
}

function ClientOnlyDebugScoreboard() {
  const hasMounted = useHasMounted()
  if (!hasMounted) return null
  return <DebugScoreboardContainer />
}

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

function DebugScoreboardContainer() {
  const { state } = useSessionContext()

  return (
    <DebugScoreboard
      elements={cardsData.elements}
      scoresPos={state.scoresPos}
      scoresNeg={state.scoresNeg}
      roundIndexPos={state.roundIndexPos}
      roundIndexNeg={state.roundIndexNeg}
      roundsPerPhase={state.roundsPerPhase}
      excludedElementIds={state.excludedElementIds}
    />
  )
}
