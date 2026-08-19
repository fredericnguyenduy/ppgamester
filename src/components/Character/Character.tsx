import defaultBodyUrl from '../../../assets/girl-body.png'
import defaultFeetUrl from '../../../assets/girl-feet.png'
import defaultHeadUrl from '../../../assets/girl-head.png'
import type { CharacterChoice } from '../../types/CharacterChoice'
import './Character.css'

const CHARACTER_LABEL = 'Character'
const CHARACTER_HEAD_BODY_OVERLAP = '30%'
const CHARACTER_BODY_FEET_OVERLAP = '17.333333%'

function toPercentage(value: number): string {
  return `${value}%`
}

function getCharacterStyle(size: number, top: number, left: number) {
  return {
    height: toPercentage(size),
    top: toPercentage(top),
    left: toPercentage(left),
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
        style={{ marginTop: `-${CHARACTER_HEAD_BODY_OVERLAP}` }}
        type="button"
        aria-label={`Body option ${characterChoice.bodyIndex}`}
        onClick={onBodyClick}
      >
        <img src={defaultBodyUrl} alt="" draggable={false} />
      </button>

      <button
        className="character__part character__feet"
        style={{ marginTop: `-${CHARACTER_BODY_FEET_OVERLAP}` }}
        type="button"
        aria-label={`Feet option ${characterChoice.feetIndex}`}
        onClick={onFeetClick}
      >
        <img src={defaultFeetUrl} alt="" draggable={false} />
      </button>
    </div>
  )
}
