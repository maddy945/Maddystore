import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useStore } from '../context/StoreContext'
import { money } from '../lib/pricing'

const EMPTY_FORM = { name: '', email: '', address: '', city: '', zip: '', card: '', expiry: '', cvc: '' }

// Luhn checksum catches most mistyped card numbers before submission.
function luhnValid(digits) {
  let sum = 0
  let double = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = Number(digits[i])
    if (double) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
    double = !double
  }
  return sum % 10 === 0
}

export function validateCheckout(f) {
  const e = {}
  if (!f.name.trim()) e.name = 'Enter the name on the order.'
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Enter a valid email address.'
  if (!f.address.trim()) e.address = 'Enter a street address.'
  if (!f.city.trim()) e.city = 'Enter a city.'
  if (!/^[A-Za-z0-9][A-Za-z0-9 -]{2,9}$/.test(f.zip.trim())) e.zip = 'Enter a valid postal code.'

  const digits = f.card.replace(/\s|-/g, '')
  if (!/^\d{13,19}$/.test(digits) || !luhnValid(digits)) e.card = 'Enter a valid card number.'

  const m = f.expiry.trim().match(/^(0[1-9]|1[0-2])\/(\d{2})$/)
  if (!m) {
    e.expiry = 'Use MM/YY format.'
  } else {
    // Valid through the end of the expiry month.
    const expiresAfter = new Date(2000 + Number(m[2]), Number(m[1]), 1)
    if (expiresAfter <= new Date()) e.expiry = 'This card has expired.'
  }

  if (!/^\d{3,4}$/.test(f.cvc.trim())) e.cvc = 'Enter the 3 or 4 digit security code.'
  return e
}

function generateOrderId() {
  return 'MG' + String(Math.floor(100000 + Math.random() * 900000))
}

function Field({ label, name, form, errors, onChange, ...rest }) {
  return (
    <label className={`field ${errors[name] ? 'has-error' : ''}`}>
      <span>{label}</span>
      <input name={name} value={form[name]} onChange={onChange} aria-invalid={!!errors[name]} {...rest} />
      {errors[name] && <small className="field-error">{errors[name]}</small>}
    </label>
  )
}

export default function CheckoutPage() {
  const { items, total, shipping, grandTotal, clearCart } = useCart()
  const { user, placeOrder } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState(() => ({ ...EMPTY_FORM, name: user?.name || '', email: user?.email || '' }))
  const [errors, setErrors] = useState({})

  if (items.length === 0) {
    return (
      <div className="section">
        <p className="empty">
          Your cart is empty, so there's nothing to check out.<br /><br />
          <Link to="/products" className="btn">Browse Games</Link>
        </p>
      </div>
    )
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = validateCheckout(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    const digits = form.card.replace(/\s|-/g, '')
    const order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      status: 'Processing',
      items: items.map((i) => ({
        id: i.id, name: i.name, platform: i.platform, condition: i.condition,
        price: i.price, qty: i.qty, image: i.image,
      })),
      subtotal: total,
      shipping,
      total: grandTotal,
      shipTo: {
        name: form.name.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        zip: form.zip.trim(),
      },
      // Only the last four digits are kept, never the full card number or security code.
      paymentLast4: digits.slice(-4),
    }

    placeOrder(order)
    clearCart()
    navigate(`/orders/${order.id}`)
  }

  return (
    <div className="section">
      <div className="section-head">
        <h2>Checkout</h2>
      </div>
      <p className="notice">
        Demo checkout: no payment is charged and nothing is shipped. Use any valid-looking test card, such as 4242 4242 4242 4242.
      </p>

      <form className="checkout-grid" onSubmit={onSubmit} noValidate>
        <div className="checkout-form">
          <fieldset>
            <legend>Contact & shipping</legend>
            <Field label="Full name" name="name" form={form} errors={errors} onChange={onChange} autoComplete="name" />
            <Field label="Email" name="email" type="email" form={form} errors={errors} onChange={onChange} autoComplete="email" />
            <Field label="Street address" name="address" form={form} errors={errors} onChange={onChange} autoComplete="street-address" />
            <div className="field-row">
              <Field label="City" name="city" form={form} errors={errors} onChange={onChange} autoComplete="address-level2" />
              <Field label="Postal code" name="zip" form={form} errors={errors} onChange={onChange} autoComplete="postal-code" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Payment</legend>
            <Field label="Card number" name="card" inputMode="numeric" placeholder="1234 5678 9012 3456" form={form} errors={errors} onChange={onChange} autoComplete="cc-number" />
            <div className="field-row">
              <Field label="Expiry (MM/YY)" name="expiry" placeholder="MM/YY" form={form} errors={errors} onChange={onChange} autoComplete="cc-exp" />
              <Field label="Security code" name="cvc" inputMode="numeric" placeholder="CVC" form={form} errors={errors} onChange={onChange} autoComplete="cc-csc" />
            </div>
          </fieldset>
        </div>

        <aside className="order-summary">
          <h3>Order summary</h3>
          {items.map((i) => (
            <div key={i.id} className="summary-row">
              <span>{i.name} × {i.qty}</span>
              <span>{money(i.price * i.qty)}</span>
            </div>
          ))}
          <div className="summary-row"><span>Subtotal</span><span>{money(total)}</span></div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : money(shipping)}</span>
          </div>
          <div className="summary-row grand"><span>Total</span><span>{money(grandTotal)}</span></div>
          <button type="submit" className="btn btn-block">Place Order</button>
          <Link to="/cart" className="back-link">← Back to cart</Link>
        </aside>
      </form>
    </div>
  )
}
