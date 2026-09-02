import { useState } from 'react'
import dressUrl from '../../assets/screens/dress.png'
import { Character } from '../components/Character'
import { ControlPad } from '../components/ControlPad'
import { Timer } from '../components/Timer'
import type { CharacterChoice } from '../types/CharacterChoice'
import './DressScreen.css'

type CharacterPosition = {
  top: number
  left: number
}

const CHARACTER_SIZE = 100 / 3
const CHARACTER_MOVE_STEP = 5
const INITIAL_CHARACTER_POSITION: CharacterPosition = {
  top: 100,
  left: 50,
}

type DressScreenProps = {
  characterChoice: CharacterChoice
  onHeadClick: () => void
  onBodyClick: () => void
  onFeetClick: () => void
  onTimerComplete: () => void
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

export function DressScreen({
  characterChoice,
  onHeadClick,
  onBodyClick,
  onFeetClick,
  onTimerComplete,
}: DressScreenProps) {
  const [characterPosition, setCharacterPosition] = useState(
    INITIAL_CHARACTER_POSITION,
  )

  return (
    <main
      className="dress-screen"
      data-sex={characterChoice.sex ?? undefined}
    >
      <div className="dress-screen__scene">
        <img
          className="dress-screen__image"
          src={dressUrl}
          alt="Choose an outfit"
          draggable={false}
        />

        <div className="dress-screen__timer-frame">
          <Timer onComplete={onTimerComplete} />
        </div>

        <Character
          characterChoice={characterChoice}
          size={CHARACTER_SIZE}
          top={characterPosition.top}
          left={characterPosition.left}
          onHeadClick={onHeadClick}
          onBodyClick={onBodyClick}
          onFeetClick={onFeetClick}
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
    </main>
  )
}
