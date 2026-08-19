import { useState } from 'react'
import { CastleScreen } from './screens/CastleScreen'
import { DressScreen } from './screens/DressScreen'
import { FashionShowScreen } from './screens/FashionShowScreen'
import { ScoreScreen } from './screens/ScoreScreen'
import { SexChoiceScreen } from './screens/SexChoiceScreen'
import type { CharacterChoice } from './types/CharacterChoice'

export type { CharacterChoice } from './types/CharacterChoice'

type GamePhase = 'castle' | 'sex-choice' | 'dress' | 'fashion-show' | 'score'

type CharacterChoices = CharacterChoice[]

const CHARACTER_OPTION_COUNT = 4
const FASHION_SHOW_COUNT = 3
const SEX_CHOICES = ['F', 'M'] as const

const INITIAL_CHARACTER_CHOICE: CharacterChoice = {
  sex: null,
  headIndex: 0,
  bodyIndex: 0,
  feetIndex: 0,
}

function getRandomIndex(length: number): number {
  return Math.floor(Math.random() * length)
}

function createRandomCharacterChoice(): CharacterChoice {
  return {
    sex: SEX_CHOICES[getRandomIndex(SEX_CHOICES.length)],
    headIndex: getRandomIndex(CHARACTER_OPTION_COUNT),
    bodyIndex: getRandomIndex(CHARACTER_OPTION_COUNT),
    feetIndex: getRandomIndex(CHARACTER_OPTION_COUNT),
  }
}

function createFashionShowChoices(
  playerChoice: CharacterChoice,
): CharacterChoices {
  const choices = Array.from(
    { length: FASHION_SHOW_COUNT - 1 },
    () => createRandomCharacterChoice(),
  )

  choices.splice(getRandomIndex(choices.length + 1), 0, playerChoice)

  return choices
}

function shuffleCharacterChoices(
  choices: CharacterChoices,
): CharacterChoices {
  const shuffledChoices = [...choices]

  for (let index = shuffledChoices.length - 1; index > 0; index -= 1) {
    const randomIndex = getRandomIndex(index + 1)
    const currentChoice = shuffledChoices[index]

    shuffledChoices[index] = shuffledChoices[randomIndex]
    shuffledChoices[randomIndex] = currentChoice
  }

  return shuffledChoices
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
  const [fashionShowChoices, setFashionShowChoices] =
    useState<CharacterChoices | null>(null)
  const [fashionShowIndex, setFashionShowIndex] = useState(0)
  const [scoreCharacterChoices, setScoreCharacterChoices] =
    useState<CharacterChoices | null>(null)

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
        onTimerComplete={() => {
          setFashionShowChoices(createFashionShowChoices(characterChoice))
          setFashionShowIndex(0)
          setPhase('fashion-show')
        }}
      />
    )
  }

  if (phase === 'fashion-show' && fashionShowChoices != null) {
    return (
      <FashionShowScreen
        key={fashionShowIndex}
        characterChoice={fashionShowChoices[fashionShowIndex]}
        onScrollComplete={() => {
          if (fashionShowIndex < fashionShowChoices.length - 1) {
            setFashionShowIndex((currentIndex) => currentIndex + 1)
            return
          }

          setScoreCharacterChoices(
            shuffleCharacterChoices(fashionShowChoices),
          )
          setPhase('score')
        }}
      />
    )
  }

  if (phase === 'score' && scoreCharacterChoices != null) {
    return (
      <ScoreScreen
        characterChoices={scoreCharacterChoices}
        onRestart={onRestart}
        onGameEnd={onGameEnd}
      />
    )
  }

  return null
}
