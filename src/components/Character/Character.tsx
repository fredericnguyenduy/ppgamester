import templateBoy from '../../../assets/character-parts/template-boy.png'
import templateGirl from '../../../assets/character-parts/template-girl.png'
import type { CharacterChoice } from '../../types/CharacterChoice'
import './Character.css'

const TEMPLATES = { M: templateBoy, F: templateGirl }

const PART_URLS = import.meta.glob<string>(
  '../../../assets/character-parts/**/*',
  { eager: true, import: 'default', query: '?url' },
)

function getPartUrl(file: string): string {
  const url = PART_URLS[`../../../assets/character-parts/${file}`]

  if (url == null) {
    throw new Error(`Character-part asset not found: ${file}`)
  }

  return url
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
}

export function Character({
  characterChoice,
  size,
  top,
  left,
}: CharacterProps) {
  if (characterChoice.sex == null) {
    return null
  }

  return (
    <div
      className="character"
      style={getCharacterStyle(size, top, left)}
    >
      <img
        className="character__template"
        src={TEMPLATES[characterChoice.sex]}
        alt={characterChoice.sex === 'M' ? 'Boy' : 'Girl'}
        draggable={false}
      />
      {characterChoice.layers.map((layer, index) => (
        <img
          key={index}
          className="character__layer"
          src={getPartUrl(layer.file)}
          style={{
            height: toPercentage(layer.size),
            left: toPercentage(layer.x),
            top: toPercentage(layer.y),
            zIndex: layer.zIndex,
          }}
          alt=""
          draggable={false}
        />
      ))}
    </div>
  )
}
