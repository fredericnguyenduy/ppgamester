import bodyParts from '../../../assets/body-parts.json'
import type {
  CharacterChoice,
  SexChoice,
} from '../../types/CharacterChoice'
import './Character.css'

type BodyPart = 'heads' | 'bodies' | 'feet'

type BodyParts = Record<BodyPart, string[]>

const CHARACTER_LABEL = 'Character'
const CHARACTER_HEAD_BODY_OVERLAP = '30%'
const CHARACTER_BODY_FEET_OVERLAP = '17.333333%'
const BODY_PARTS_BY_SEX = bodyParts as Record<SexChoice, BodyParts>
const BODY_PART_URLS = import.meta.glob<string>(
  '../../../assets/body-parts/*',
  {
    eager: true,
    import: 'default',
    query: '?url',
  },
)

function getBodyPartUrl(
  sex: SexChoice | null,
  bodyPart: BodyPart,
  index: number,
): string | undefined {
  if (sex == null) {
    return undefined
  }

  const fileNames = BODY_PARTS_BY_SEX[sex][bodyPart]

  if (fileNames.length === 0) {
    return undefined
  }

  const normalizedIndex =
    ((index % fileNames.length) + fileNames.length) % fileNames.length
  const fileName = fileNames[normalizedIndex]
  const assetPath = `../../../assets/body-parts/${fileName}`
  const assetUrl = BODY_PART_URLS[assetPath]

  if (assetUrl == null) {
    throw new Error(`Body-part asset not found: ${assetPath}`)
  }

  return assetUrl
}

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
  const headUrl = getBodyPartUrl(
    characterChoice.sex,
    'heads',
    characterChoice.headIndex,
  )
  const bodyUrl = getBodyPartUrl(
    characterChoice.sex,
    'bodies',
    characterChoice.bodyIndex,
  )
  const feetUrl = getBodyPartUrl(
    characterChoice.sex,
    'feet',
    characterChoice.feetIndex,
  )

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
        {headUrl != null && <img src={headUrl} alt="" draggable={false} />}
      </button>

      <button
        className="character__part character__body"
        style={{ marginTop: `-${CHARACTER_HEAD_BODY_OVERLAP}` }}
        type="button"
        aria-label={`Body option ${characterChoice.bodyIndex}`}
        onClick={onBodyClick}
      >
        {bodyUrl != null && <img src={bodyUrl} alt="" draggable={false} />}
      </button>

      <button
        className="character__part character__feet"
        style={{ marginTop: `-${CHARACTER_BODY_FEET_OVERLAP}` }}
        type="button"
        aria-label={`Feet option ${characterChoice.feetIndex}`}
        onClick={onFeetClick}
      >
        {feetUrl != null && <img src={feetUrl} alt="" draggable={false} />}
      </button>
    </div>
  )
}
