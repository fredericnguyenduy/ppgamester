import { useId } from 'react'
import dialogFrameUrl from '../../../assets/dialog-frame.png'
import './Dialog.css'

export type DialogProps = {
  prompt: string
  label1: string
  label2: string
  onButton1Click: () => void
  onButton2Click: () => void
}

export function Dialog({
  prompt,
  label1,
  label2,
  onButton1Click,
  onButton2Click,
}: DialogProps) {
  const promptId = useId()

  return (
    <div className="dialog" role="dialog" aria-labelledby={promptId}>
      <img
        className="dialog__frame"
        src={dialogFrameUrl}
        alt=""
        draggable={false}
      />

      <p className="dialog__prompt" id={promptId}>
        {prompt}
      </p>

      <button
        className="dialog__button dialog__button--first"
        type="button"
        onClick={onButton1Click}
      >
        {label1}
      </button>

      <button
        className="dialog__button dialog__button--second"
        type="button"
        onClick={onButton2Click}
      >
        {label2}
      </button>
    </div>
  )
}
