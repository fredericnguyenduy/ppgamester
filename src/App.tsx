import { useState } from 'react'
import { MainGame } from './MainGame'
import { LoadingScreen } from './screens/LoadingScreen'
import { TitleScreen } from './screens/TitleScreen'

type AppPhase = 'title' | 'loading' | 'game' | 'end'

function App() {
  const [phase, setPhase] = useState<AppPhase>('title')
  const [gameKey, setGameKey] = useState(0)
  const handleGameEnd = () => setPhase('end')

  if (phase === 'title') {
    return <TitleScreen onComplete={() => setPhase('loading')} />
  }

  if (phase === 'loading') {
    return <LoadingScreen onComplete={() => setPhase('game')} />
  }

  if (phase === 'game') {
    return (
      <MainGame
        key={gameKey}
        onRestart={() => setGameKey((currentKey) => currentKey + 1)}
        onGameEnd={handleGameEnd}
      />
    )
  }

  return null
}

export default App
