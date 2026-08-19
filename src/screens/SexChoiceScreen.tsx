import sexChoiceUrl from '../../assets/screens/sex-choice.png'
import './SexChoiceScreen.css'

export type SexChoice = 'F' | 'M'

type Percentage = `${number}%`

type ChoiceZoneBounds = {
  left: Percentage
  top: Percentage
  width: Percentage
  height: Percentage
}

type ChoiceZone = {
  sex: SexChoice
  label: string
  bounds: ChoiceZoneBounds
}

const CHOICE_ZONES: ChoiceZone[] = [
  {
    sex: 'F',
    label: 'Choose female',
    bounds: {
      left: '25.5383%',
      top: '45.6961%',
      width: '13.8158%',
      height: '40.3826%',
    },
  },
  {
    sex: 'M',
    label: 'Choose male',
    bounds: {
      left: '62.2009%',
      top: '45.6961%',
      width: '13.8158%',
      height: '40.3826%',
    },
  },
]

type SexChoiceScreenProps = {
  onSelect: (sex: SexChoice) => void
}

export function SexChoiceScreen({ onSelect }: SexChoiceScreenProps) {
  return (
    <main className="sex-choice-screen">
      <div className="sex-choice-screen__stage">
        <img
          className="sex-choice-screen__image"
          src={sexChoiceUrl}
          alt="Choose a character"
        />
        {CHOICE_ZONES.map((zone) => (
          <button
            key={zone.sex}
            className="sex-choice-screen__zone"
            type="button"
            aria-label={zone.label}
            style={zone.bounds}
            onClick={() => onSelect(zone.sex)}
          />
        ))}
      </div>
    </main>
  )
}
