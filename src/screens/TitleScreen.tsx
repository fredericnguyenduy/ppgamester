import { useEffect, useState } from 'react'
import title1Url from '../../assets/screens/title1.png'
import title2Url from '../../assets/screens/title2.png'
import './TitleScreen.css'

const IMAGE_CHANGE_INTERVAL_MS = 1_000
const LOADING_REDIRECT_DELAY_MS = 5_000

type TitleScreenProps = {
  onComplete: () => void
}

export function TitleScreen({ onComplete }: TitleScreenProps) {
  const [visibleImageIndex, setVisibleImageIndex] = useState(0)

  useEffect(() => {
    const imageChangeInterval = window.setInterval(() => {
      setVisibleImageIndex((currentIndex) => (currentIndex + 1) % 2)
    }, IMAGE_CHANGE_INTERVAL_MS)

    const loadingRedirectTimeout = window.setTimeout(() => {
      onComplete()
    }, LOADING_REDIRECT_DELAY_MS)

    return () => {
      window.clearInterval(imageChangeInterval)
      window.clearTimeout(loadingRedirectTimeout)
    }
  }, [onComplete])

  return (
    <main className="title-screen">
      <img
        className="title-screen__image"
        src={title1Url}
        alt="Princess & Prince Gamester title screen"
        draggable={false}
        hidden={visibleImageIndex !== 0}
      />
      <img
        className="title-screen__image"
        src={title2Url}
        alt=""
        draggable={false}
        hidden={visibleImageIndex !== 1}
      />
    </main>
  )
}
