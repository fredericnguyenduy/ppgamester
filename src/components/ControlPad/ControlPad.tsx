import type { ComponentPropsWithoutRef } from 'react'
import controlPadUrl from '../../../assets/control-pad.png'
import './ControlPad.css'

export type ControlPadProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  onUp: () => void
  onLeft: () => void
  onRight: () => void
  onBottom: () => void
}

export function ControlPad({
  className,
  onUp,
  onLeft,
  onRight,
  onBottom,
  ...divProps
}: ControlPadProps) {
  return (
    <div
      {...divProps}
      className={['control-pad', className].filter(Boolean).join(' ')}
      role="group"
      aria-label="Control pad"
    >
      <img
        className="control-pad__image"
        src={controlPadUrl}
        alt=""
        draggable={false}
      />

      <button
        className="control-pad__button control-pad__button--up"
        type="button"
        aria-label="Up"
        onClick={onUp}
      />

      <button
        className="control-pad__button control-pad__button--left"
        type="button"
        aria-label="Left"
        onClick={onLeft}
      />

      <button
        className="control-pad__button control-pad__button--right"
        type="button"
        aria-label="Right"
        onClick={onRight}
      />

      <button
        className="control-pad__button control-pad__button--bottom"
        type="button"
        aria-label="Down"
        onClick={onBottom}
      />
    </div>
  )
}
