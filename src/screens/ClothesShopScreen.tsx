import clothesShopUrl from '../../assets/screens/clothes-shop.png'
import './ClothesShopScreen.css'

type ClothesShopScreenProps = {
  onLeftShelfClick: () => void
  onRightShelfClick: () => void
}

export function ClothesShopScreen({
  onLeftShelfClick,
  onRightShelfClick,
}: ClothesShopScreenProps) {
  return (
    <main className="clothes-shop-screen">
      <div className="clothes-shop-screen__scene">
        <img
          className="clothes-shop-screen__image"
          src={clothesShopUrl}
          alt="Clothes shop"
          draggable={false}
        />
        <button
          className="clothes-shop-screen__shelf clothes-shop-screen__shelf--left"
          type="button"
          aria-label="Left clothes shelf"
          onClick={onLeftShelfClick}
        />
        <button
          className="clothes-shop-screen__shelf clothes-shop-screen__shelf--right"
          type="button"
          aria-label="Right clothes shelf"
          onClick={onRightShelfClick}
        />
      </div>
    </main>
  )
}
