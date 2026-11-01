import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { getBadge, stars } from '../data/products'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const badge = getBadge(product)

  // Briefly confirm the add, then return the button to its normal label.
  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(false), 1200)
    return () => clearTimeout(t)
  }, [added])

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
  }

  return (
    <div className="card">
      {badge && <span className={`badge ${badge.cls}`}>{badge.label}</span>}
      <div className="thumb">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="body">
        <span className="platform">{product.platform} • {product.condition}</span>
        <h3>{product.name}</h3>
        <div className="rating">
          {stars(product.rating)} <span>({product.rating})</span>
        </div>
        <div className="price-row">
          <span className="price">${product.price.toFixed(2)}</span>
          {product.oldPrice && <span className="old">${product.oldPrice.toFixed(2)}</span>}
        </div>
        <button
          className={`add-btn ${added ? 'added' : ''}`}
          onClick={handleAdd}
          aria-live="polite"
        >
          {added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
