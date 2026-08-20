import castleUrl from '../../assets/screens/castle.png'
import './CastleScreen.css'

type CastleScreenProps = {
  onEnter: () => void
}

export function CastleScreen({ onEnter }: CastleScreenProps) {
  return (
    <button
      className="castle-screen"
      type="button"
      onClick={onEnter}
    >
      <img
        className="castle-screen__image"
        src={castleUrl}
        alt="Enter the castle"
        draggable={false}
      />
    </button>
  )
}
