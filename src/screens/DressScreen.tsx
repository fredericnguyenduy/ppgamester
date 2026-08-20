import dressUrl from '../../assets/screens/dress.png'
import { Character } from '../components/Character'
import { Timer } from '../components/Timer'
import type { CharacterChoice } from '../types/CharacterChoice'
import './DressScreen.css'

type DressScreenProps = {
  characterChoice: CharacterChoice
  onHeadClick: () => void
  onBodyClick: () => void
  onFeetClick: () => void
  onTimerComplete: () => void
}

export function DressScreen({
  characterChoice,
  onHeadClick,
  onBodyClick,
  onFeetClick,
  onTimerComplete,
}: DressScreenProps) {
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
          size={100 / 3}
          top={100}
          left={50}
          onHeadClick={onHeadClick}
          onBodyClick={onBodyClick}
          onFeetClick={onFeetClick}
        />
      </div>
    </main>
  )
}
