import { useState } from 'react'

// Shows the product photo if it exists in public/images, otherwise the emoji.
export default function ProductImage({ product, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (!product.image || failed) {
    return <span className="emoji">{product.emoji}</span>
  }
  return (
    <img
      src={product.image}
      alt={product.name}
      className={`product-img ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
