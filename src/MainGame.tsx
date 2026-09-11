import { useState } from 'react'
import bodyParts from '../assets/body-parts.json'
import { CastleScreen } from './screens/CastleScreen'
import { Shopping } from './Shopping'
import { FashionShowScreen } from './screens/FashionShowScreen'
import { ScoreScreen } from './screens/ScoreScreen'
import { SexChoiceScreen } from './screens/SexChoiceScreen'
import {
  SEX_CHOICES,
  type CharacterChoice,
} from './types/CharacterChoice'

type GamePhase = 'castle' | 'sex-choice' | 'shopping' | 'fashion-show' | 'score'

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

function createCharacterChoiceKey(choice: CharacterChoice): string {
  return [choice.sex, choice.headIndex, choice.bodyIndex, choice.feetIndex].join(
    ':',
  )
}

function getAvailableCharacterChoiceCount(): number {
  return SEX_CHOICES.reduce((total, sex) => {
    const availableBodyParts = bodyParts[sex]

    return (
      total +
      availableBodyParts.heads.length *
        availableBodyParts.bodies.length *
        availableBodyParts.feet.length
    )
  }, 0)
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
  if (getAvailableCharacterChoiceCount() < FASHION_SHOW_COUNT) {
    throw new Error('Not enough unique character choices are available')
  }

  const choices: CharacterChoices = []
  const usedChoiceKeys = new Set([createCharacterChoiceKey(playerChoice)])

  while (choices.length < FASHION_SHOW_COUNT - 1) {
    const randomChoice = createRandomCharacterChoice()
    const randomChoiceKey = createCharacterChoiceKey(randomChoice)

    if (usedChoiceKeys.has(randomChoiceKey)) {
      continue
    }

    usedChoiceKeys.add(randomChoiceKey)
    choices.push(randomChoice)
  }

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
          setPhase('shopping')
        }}
      />
    )
  }

  if (phase === 'shopping') {
    return (
      <Shopping
        characterChoice={characterChoice}
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
