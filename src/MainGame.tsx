import { useState } from 'react'
import { CastleScreen } from './screens/CastleScreen'
import { DressScreen } from './screens/DressScreen'
import { FashionShowScreen } from './screens/FashionShowScreen'
import { ScoreScreen } from './screens/ScoreScreen'
import { SexChoiceScreen } from './screens/SexChoiceScreen'
import type { CharacterChoice } from './types/CharacterChoice'

export type { CharacterChoice } from './types/CharacterChoice'

type GamePhase = 'castle' | 'sex-choice' | 'dress' | 'fashion-show' | 'score'

const INITIAL_CHARACTER_CHOICE: CharacterChoice = {
  sex: null,
  headIndex: 0,
  bodyIndex: 0,
  feetIndex: 0,
}

type MainGameProps = {
  onRestart: () => void
  onGameEnd: () => void
}

export function MainGame({ onRestart, onGameEnd }: MainGameProps) {
  const [phase, setPhase] = useState<GamePhase>('castle')
  const [characterChoice, setCharacterChoice] = useState<CharacterChoice>(
    INITIAL_CHARACTER_CHOICE,
  )
  const [scorePosition] = useState(() => Math.floor(Math.random() * 3))

  if (phase === 'castle') {
    return <CastleScreen onEnter={() => setPhase('sex-choice')} />
  }

  if (phase === 'sex-choice') {
    return (
      <SexChoiceScreen
        onSelect={(sex) => {
          setCharacterChoice((currentChoice) => ({ ...currentChoice, sex }))
          setPhase('dress')
        }}
      />
    )
  }

  if (phase === 'dress') {
    return (
      <DressScreen
        characterChoice={characterChoice}
        onHeadClick={() =>
          setCharacterChoice((currentChoice) => ({
            ...currentChoice,
            headIndex: currentChoice.headIndex + 1,
          }))
        }
        onBodyClick={() =>
          setCharacterChoice((currentChoice) => ({
            ...currentChoice,
            bodyIndex: currentChoice.bodyIndex + 1,
          }))
        }
        onFeetClick={() =>
          setCharacterChoice((currentChoice) => ({
            ...currentChoice,
            feetIndex: currentChoice.feetIndex + 1,
          }))
        }
        onTimerComplete={() => setPhase('fashion-show')}
      />
    )
  }

  if (phase === 'fashion-show') {
    return (
      <FashionShowScreen
        characterChoice={characterChoice}
        onScrollComplete={() => setPhase('score')}
      />
    )
  }

  if (phase === 'score') {
    return (
      <ScoreScreen
        characterChoices={[0, 1, 2].map((position) =>
          position === scorePosition ? characterChoice : null,
        )}
        onRestart={onRestart}
        onGameEnd={onGameEnd}
      />
    )
  }

  return null
}
