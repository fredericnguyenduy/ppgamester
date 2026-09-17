import { useEffect, useRef, useState } from 'react'
import characterParts from '../assets/character-parts/master.json'
import { Character } from './components/Character'
import { ControlPad } from './components/ControlPad'
import { Timer } from './components/Timer'
import { ClothesShopScreen } from './screens/ClothesShopScreen'
import { OutsideShops } from './screens/OutsideShops'
import type { CharacterChoice } from './types/CharacterChoice'
import type { CharacterPosition } from './types/CharacterPosition'
import './Shopping.css'

type ShoppingProps = {
  characterChoice: CharacterChoice
  onTimerComplete: (characterChoice: CharacterChoice) => void
}

type ShoppingScreen = 'outside-shops' | 'clothes-shop'

const CHARACTER_SIZE = 100 / 3
const CHARACTER_MOVE_STEP = 5
const INITIAL_CHARACTER_POSITION: CharacterPosition = {
  top: 100,
  left: 50,
}

function initializeCharacterChoice(choice: CharacterChoice): CharacterChoice {
  if (choice.sex === null) return { ...choice, layers: [] }

  const parts = characterParts[choice.sex]
  const defaultParts = ['clothes', 'face', 'shoes', 'hair'] as const
  const layers = defaultParts.flatMap((part) => {
    const match = parts[part]?.[0]

    if (!match) return []

    const { file, x, y, size, zIndex } = match
    return [{ file, x, y, size, zIndex }]
  })

  return { ...choice, layers }
}

function clampToScene(value: number): number {
  return Math.min(Math.max(value, 0), 100)
}

function moveCharacterPosition(
  currentPosition: CharacterPosition,
  topDelta: number,
  leftDelta: number,
): CharacterPosition {
  return {
    top: clampToScene(currentPosition.top + topDelta),
    left: clampToScene(currentPosition.left + leftDelta),
  }
}

export function Shopping({ characterChoice, onTimerComplete }: ShoppingProps) {
  const [shoppingCharacterChoice] = useState(() =>
    initializeCharacterChoice(characterChoice),
  )
  const [screen, setScreen] = useState<ShoppingScreen>('outside-shops')
  const [characterPosition, setCharacterPosition] = useState(
    INITIAL_CHARACTER_POSITION,
  )
  const wasInsideShopEntrance = useRef(false)

  useEffect(() => {
    if (screen !== 'outside-shops') {
      wasInsideShopEntrance.current = false
      return
    }

    const isInsideShopEntrance =
      characterPosition.top <= 80 &&
      characterPosition.left >= 45 &&
      characterPosition.left <= 60
    const hasEnteredShop = isInsideShopEntrance && !wasInsideShopEntrance.current
    wasInsideShopEntrance.current = isInsideShopEntrance

    if (hasEnteredShop) {
      setScreen('clothes-shop')
    }
  }, [characterPosition, screen])

  return (
    <div className="shopping" data-sex={shoppingCharacterChoice.sex ?? undefined}>
      <div className="shopping__scene">
        {screen === 'clothes-shop' ? (
          <ClothesShopScreen
            onLeftShelfClick={() => {}}
            onRightShelfClick={() => {}}
          />
        ) : (
          <OutsideShops />
        )}

        <div className="shopping__timer-frame">
          <Timer onComplete={() => onTimerComplete(shoppingCharacterChoice)} />
        </div>

        <Character
          characterChoice={shoppingCharacterChoice}
          size={CHARACTER_SIZE}
          top={characterPosition.top}
          left={characterPosition.left}
        />

        <ControlPad
          onUp={() =>
            setCharacterPosition((currentPosition) =>
              moveCharacterPosition(currentPosition, -CHARACTER_MOVE_STEP, 0),
            )
          }
          onLeft={() =>
            setCharacterPosition((currentPosition) =>
              moveCharacterPosition(currentPosition, 0, -CHARACTER_MOVE_STEP),
            )
          }
          onRight={() =>
            setCharacterPosition((currentPosition) =>
              moveCharacterPosition(currentPosition, 0, CHARACTER_MOVE_STEP),
            )
          }
          onBottom={() =>
            setCharacterPosition((currentPosition) =>
              moveCharacterPosition(currentPosition, CHARACTER_MOVE_STEP, 0),
            )
          }
        />
      </div>
    </div>
  )
}
