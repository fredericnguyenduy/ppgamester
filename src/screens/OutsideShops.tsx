import { memo } from 'react'
import outsideShopsUrl from '../../assets/screens/outside-shops.png'
import './OutsideShops.css'

export const OutsideShops = memo(function OutsideShops() {
  return (
    <main className="outside-shops">
      <div className="outside-shops__scene">
        <img
          className="outside-shops__image"
          src={outsideShopsUrl}
          alt="Choose a shop"
          draggable={false}
        />
      </div>
    </main>
  )
})
