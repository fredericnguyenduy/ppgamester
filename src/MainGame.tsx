import { useState } from 'react'
import bodyParts from '../assets/body-parts.json'
import { CastleScreen } from './screens/CastleScreen'
import { DressScreen } from './screens/DressScreen'
import { FashionShowScreen } from './screens/FashionShowScreen'
import { ScoreScreen } from './screens/ScoreScreen'
import { SexChoiceScreen } from './screens/SexChoiceScreen'
import type { BodyPart } from './types/BodyPart'
import {
  SEX_CHOICES,
  type CharacterChoice,
  type SexChoice,
} from './types/CharacterChoice'

type GamePhase = 'castle' | 'sex-choice' | 'dress' | 'fashion-show' | 'score'

type CharacterChoices = CharacterChoice[]

const FASHION_SHOW_COUNT = 3

const INITIAL_CHARACTER_CHOICE: CharacterChoice = {
  sex: null,
  headIndex: 0,
  bodyIndex: 0,
  feetIndex: 0,
}

function getRandomIndex(length: number): number {
  if (length === 0) {
    return 0
  }

  return Math.floor(Math.random() * length)
}

function getNextBodyPartIndex(
  sex: SexChoice | null,
  bodyPart: BodyPart,
  currentIndex: number,
): number {
  if (sex == null) {
    return 0
  }

  const optionCount = bodyParts[sex][bodyPart].length

  if (optionCount === 0) {
    return 0
  }

  return ((currentIndex + 1) % optionCount + optionCount) % optionCount
}

function createRandomCharacterChoice(): CharacterChoice {
  const sex = SEX_CHOICES[getRandomIndex(SEX_CHOICES.length)]
  const availableBodyParts = bodyParts[sex]

  return {
    sex,
    headIndex: getRandomIndex(availableBodyParts.heads.length),
    bodyIndex: getRandomIndex(availableBodyParts.bodies.length),
    feetIndex: getRandomIndex(availableBodyParts.feet.length),
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
            headIndex: getNextBodyPartIndex(
              currentChoice.sex,
              'heads',
              currentChoice.headIndex,
            ),
          }))
        }
        onBodyClick={() =>
          setCharacterChoice((currentChoice) => ({
            ...currentChoice,
            bodyIndex: getNextBodyPartIndex(
              currentChoice.sex,
              'bodies',
              currentChoice.bodyIndex,
            ),
          }))
        }
        onFeetClick={() =>
          setCharacterChoice((currentChoice) => ({
            ...currentChoice,
            feetIndex: getNextBodyPartIndex(
              currentChoice.sex,
              'feet',
              currentChoice.feetIndex,
            ),
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
