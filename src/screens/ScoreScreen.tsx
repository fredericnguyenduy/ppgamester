import { useEffect } from 'react'
import scoreUrl from '../../assets/screens/score.png'
import { Character } from '../components/Character'
import type { CharacterChoice } from '../types/CharacterChoice'
import './ScoreScreen.css'

type ScoreScreenProps = {
  characterChoices: (CharacterChoice | null)[]
  onRestart: () => void
  onGameEnd: () => void
}

const CHARACTER_POSITIONS = [
  { left: (832 / 1672) * 100, top: (562 / 941) * 100 + 1.15 },
  { left: (518 / 1672) * 100, top: (625 / 941) * 100 + 1 },
  { left: (1135 / 1672) * 100, top: (645 / 941) * 100 + 2 },
] as const

const ignoreClick = () => undefined

export function ScoreScreen({
  characterChoices,
  onRestart,
  onGameEnd,
}: ScoreScreenProps) {
  useEffect(() => {
    const confirmationTimer = window.setTimeout(() => {
      if (window.confirm('Would you like to play again?')) {
        onRestart()
      } else {
        onGameEnd()
      }
    }, 10_000)

    return () => window.clearTimeout(confirmationTimer)
  }, [onRestart, onGameEnd])

  return (
    <main className="score-screen">
      <div className="score-screen__scene">
        <img className="score-screen__image" src={scoreUrl} alt="Final score" />

        {CHARACTER_POSITIONS.map((position, index) => {
          const characterChoice = characterChoices[index]

          if (characterChoice == null) {
            return null
          }

          return (
            <Character
              key={index}
              characterChoice={characterChoice}
              size={100 / 3}
              top={position.top}
              left={position.left}
              onHeadClick={ignoreClick}
              onBodyClick={ignoreClick}
              onFeetClick={ignoreClick}
            />
          )
        })}

      </div>
    </main>
  )
}
