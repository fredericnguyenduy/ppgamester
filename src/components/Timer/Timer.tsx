import { useEffect, useRef, useState } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import timerUrl from '../../../assets/timer.png'
import './Timer.css'

export type TimerProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  onComplete?: () => void
}

const INITIAL_VALUE = 100

export function Timer({ className, onComplete, ...divProps }: TimerProps) {
  const [value, setValue] = useState(INITIAL_VALUE)
  const hasCompleted = useRef(false)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setValue((currentValue) => {
        if (currentValue <= 1) {
          window.clearInterval(intervalId)
          return 0
        }

        return currentValue - 1
      })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (value === 0 && !hasCompleted.current) {
      hasCompleted.current = true
      onComplete?.()
    }
  }, [onComplete, value])

  return (
    <div
      {...divProps}
      className={['timer', className].filter(Boolean).join(' ')}
      role="timer"
      aria-label={`${value} seconds remaining`}
      data-value={value}
    >
      <img className="timer__image" src={timerUrl} alt="" draggable={false} />
      <span className="timer__value" aria-hidden="true">
        {value}
      </span>
    </div>
  )
}
