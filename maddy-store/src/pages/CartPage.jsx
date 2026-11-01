import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FREE_SHIPPING_THRESHOLD, money } from '../lib/pricing'

export default function CartPage() {
  const { items, removeFromCart, updateQty, clearCart, total, count, shipping, grandTotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="section">
        <p className="empty">
          🛒 Your cart is empty.<br /><br />
          <Link to="/products" className="btn">Continue Shopping</Link>
        </p>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="section-head">
        <h2>Your Cart ({count} item{count > 1 ? 's' : ''})</h2>
      </div>

      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <span className="thumb">
            <img src={item.image} alt={item.name} />
          </span>
          <div className="info">
            <strong>{item.name}</strong><br />
            <small>{item.platform} • {item.condition}</small>
          </div>
          <div className="qty-controls">
            <button onClick={() => updateQty(item.id, -1)} aria-label="Decrease quantity">−</button>
            <span>{item.qty}</span>
            <button onClick={() => updateQty(item.id, +1)} aria-label="Increase quantity">+</button>
          </div>
          <strong className="line-total">{money(item.price * item.qty)}</strong>
          <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <div className="cart-summary">
        <div className="line"><span>Subtotal</span><span>{money(total)}</span></div>
        <div className="line">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'FREE 🚀' : money(shipping)}</span>
        </div>
        {shipping > 0 && (
          <div className="line" style={{ color: 'var(--accent)' }}>
            <span>Add {money(FREE_SHIPPING_THRESHOLD - total)} more for FREE shipping!</span>
          </div>
        )}
        <div className="total">Total: {money(grandTotal)}</div>
        <Link to="/checkout" className="btn btn-block">Proceed to Checkout</Link>
        <button
          onClick={() => {
            if (window.confirm('Remove all items from your cart?')) clearCart()
          }}
          className="link-danger"
        >
          Clear cart
        </button>
      </div>
    </div>
  )
}
