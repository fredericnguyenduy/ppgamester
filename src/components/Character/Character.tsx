import type { CSSProperties } from 'react'
import defaultBodyUrl from '../../../assets/girl-body.png'
import defaultFeetUrl from '../../../assets/girl-feet.png'
import defaultHeadUrl from '../../../assets/girl-head.png'
import type { CharacterChoice } from '../../types/CharacterChoice'
import './Character.css'

type CharacterStyle = CSSProperties & {
  '--character-height': string
  '--character-top': string
  '--character-left': string
  '--character-head-body-overlap': string
  '--character-body-feet-overlap': string
  '--character-head-padding-x': string
  '--character-head-padding-y': string
  '--character-body-padding-x': string
  '--character-body-padding-y': string
  '--character-feet-padding-x': string
  '--character-feet-padding-y': string
}

const CHARACTER_LABEL = 'Character'
const CHARACTER_HEAD_BODY_OVERLAP = '30%'
const CHARACTER_BODY_FEET_OVERLAP = '17.333333%'
const CHARACTER_PART_PADDING = '0px'

function toPercentage(value: number): string {
  return `${value}%`
}

function getCharacterStyle(
  size: number,
  top: number,
  left: number,
): CharacterStyle {
  return {
    '--character-height': toPercentage(size),
    '--character-top': toPercentage(top),
    '--character-left': toPercentage(left),
    '--character-head-body-overlap': CHARACTER_HEAD_BODY_OVERLAP,
    '--character-body-feet-overlap': CHARACTER_BODY_FEET_OVERLAP,
    '--character-head-padding-x': CHARACTER_PART_PADDING,
    '--character-head-padding-y': CHARACTER_PART_PADDING,
    '--character-body-padding-x': CHARACTER_PART_PADDING,
    '--character-body-padding-y': CHARACTER_PART_PADDING,
    '--character-feet-padding-x': CHARACTER_PART_PADDING,
    '--character-feet-padding-y': CHARACTER_PART_PADDING,
  }
}

export type CharacterProps = {
  characterChoice: CharacterChoice
  size: number
  top: number
  left: number
  onHeadClick: () => void
  onBodyClick: () => void
  onFeetClick: () => void
}

export function Character({
  characterChoice,
  size,
  top,
  left,
  onHeadClick,
  onBodyClick,
  onFeetClick,
}: CharacterProps) {
  return (
    <div
      className="character"
      style={getCharacterStyle(size, top, left)}
      role="group"
      aria-label={CHARACTER_LABEL}
      data-sex={characterChoice.sex ?? undefined}
      data-head-index={characterChoice.headIndex}
      data-body-index={characterChoice.bodyIndex}
      data-feet-index={characterChoice.feetIndex}
    >
      <button
        className="character__part character__head"
        type="button"
        aria-label={`Head option ${characterChoice.headIndex}`}
        onClick={onHeadClick}
      >
        <img src={defaultHeadUrl} alt="" draggable={false} />
      </button>

      <button
        className="character__part character__body"
        type="button"
        aria-label={`Body option ${characterChoice.bodyIndex}`}
        onClick={onBodyClick}
      >
        <img src={defaultBodyUrl} alt="" draggable={false} />
      </button>

      <button
        className="character__part character__feet"
        type="button"
        aria-label={`Feet option ${characterChoice.feetIndex}`}
        onClick={onFeetClick}
      >
        <img src={defaultFeetUrl} alt="" draggable={false} />
      </button>
    </div>
  )
}
