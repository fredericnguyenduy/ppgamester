import catwalkUrl from '../../assets/screens/catwalk.png'
import { Character } from '../components/Character'
import type { CharacterChoice } from '../types/CharacterChoice'
import './FashionShowScreen.css'

type FashionShowScreenProps = {
  characterChoice: CharacterChoice
  onScrollComplete: () => void
}

const ignoreClick = () => undefined

export function FashionShowScreen({
  characterChoice,
  onScrollComplete,
}: FashionShowScreenProps) {
  return (
    <main className="fashion-show-screen">
      <div className="fashion-show-screen__scene">
        <img
          className="fashion-show-screen__image"
          src={catwalkUrl}
          alt="Fashion show catwalk"
          onAnimationEnd={onScrollComplete}
        />

        <Character
          characterChoice={characterChoice}
          size={100 / 3}
          top={100}
          left={50}
          onHeadClick={ignoreClick}
          onBodyClick={ignoreClick}
          onFeetClick={ignoreClick}
        />
      </div>
    </main>
  )
}
