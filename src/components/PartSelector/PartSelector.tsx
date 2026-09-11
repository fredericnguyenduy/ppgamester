import { useState } from 'react'
import frameUrl from '../../../assets/part-selector.png'
import leftUrl from '../../../assets/selector-left.png'
import rightUrl from '../../../assets/selector-right.png'
import './PartSelector.css'

export type PartSelectorProps = {
  images: readonly string[]
  onCancel: () => void
  onOk: (selectedIndex: number) => void
}

export function PartSelector({ images, onCancel, onOk }: PartSelectorProps) {
  const [index, setIndex] = useState(0)
  const lastIndex = Math.max(0, images.length - 1)

  // Keep the selection valid if the supplied list gets shorter.
  if (index > lastIndex) {
    setIndex(lastIndex)
  }

  const selectedIndex = Math.min(index, lastIndex)
  const canGoLeft = selectedIndex > 0
  const canGoRight = selectedIndex < lastIndex

  return (
    <div className="part-selector" role="group" aria-label="Part selector">
      <img className="part-selector__artwork" src={frameUrl} alt="" draggable={false} />
      <div className="part-selector__preview" aria-live="polite">
        {images.length > 0 && (
          <img
            src={images[selectedIndex]}
            alt={`Part option ${selectedIndex + 1} of ${images.length}`}
            draggable={false}
          />
        )}
      </div>
      <button
        className="part-selector__button part-selector__button--left"
        type="button"
        aria-label="Previous part"
        disabled={!canGoLeft}
        onClick={() => setIndex((current) => Math.max(0, current - 1))}
      >
        {canGoLeft && <img src={leftUrl} alt="" draggable={false} />}
      </button>
      <button
        className="part-selector__button part-selector__button--right"
        type="button"
        aria-label="Next part"
        disabled={!canGoRight}
        onClick={() => setIndex((current) => Math.min(lastIndex, current + 1))}
      >
        {canGoRight && <img src={rightUrl} alt="" draggable={false} />}
      </button>
      <button
        className="part-selector__button part-selector__button--cancel"
        type="button"
        aria-label="Cancel"
        onClick={onCancel}
      />
      <button
        className="part-selector__button part-selector__button--ok"
        type="button"
        aria-label="OK"
        disabled={images.length === 0}
        onClick={() => onOk(selectedIndex)}
      />
    </div>
  )
}
