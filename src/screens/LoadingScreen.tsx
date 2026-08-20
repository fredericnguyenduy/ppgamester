import { useEffect } from 'react'
import loadingUrl from '../../assets/screens/loading.png'
import './LoadingScreen.css'

const LOADING_DELAY_MS = 5_000

type LoadingScreenProps = {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  useEffect(() => {
    const loadingTimeout = window.setTimeout(onComplete, LOADING_DELAY_MS)

    return () => {
      window.clearTimeout(loadingTimeout)
    }
  }, [onComplete])

  return (
    <main className="loading-screen">
      <img
        className="loading-screen__image"
        src={loadingUrl}
        alt="Princess & Prince Gamester loading screen"
        draggable={false}
      />
    </main>
  )
}
