import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { money } from '../lib/pricing'

const EMAIL_RE = /^\S+@\S+\.\S+$/

export default function AccountPage() {
  const { user, signIn, signOut, orders } = useStore()
  const navigate = useNavigate()
  const [signInForm, setSignInForm] = useState({ name: '', email: '' })
  const [signInErrors, setSignInErrors] = useState({})
  const [orderNumber, setOrderNumber] = useState('')

  const submitSignIn = (e) => {
    e.preventDefault()
    const errs = {}
    if (!signInForm.name.trim()) errs.name = 'Enter your name.'
    if (!EMAIL_RE.test(signInForm.email.trim())) errs.email = 'Enter a valid email address.'
    setSignInErrors(errs)
    if (Object.keys(errs).length === 0) signIn(signInForm)
  }

  const lookupOrder = (e) => {
    e.preventDefault()
    const id = orderNumber.trim().toUpperCase()
    if (id) navigate(`/orders/${id}`)
  }

  const myOrders = user
    ? orders.filter((o) => o.shipTo.email.toLowerCase() === user.email.toLowerCase())
    : []

  return (
    <div className="section">
      <div className="section-head">
        <h2>{user ? `Welcome, ${user.name}` : 'Sign In'}</h2>
      </div>

      {user ? (
        <>
          <p className="notice">
            Signed in as {user.email}.{' '}
            <button className="link-btn" onClick={signOut}>Sign out</button>
          </p>
          <h3 className="sub-head">Your orders</h3>
          {myOrders.length === 0 ? (
            <p className="muted">No orders yet for this email on this device. <Link to="/products">Start shopping →</Link></p>
          ) : (
            <div className="order-list">
              {myOrders.map((o) => (
                <Link key={o.id} to={`/orders/${o.id}`} className="order-row">
                  <strong>{o.id}</strong>
                  <span>{new Date(o.createdAt).toLocaleDateString()}</span>
                  <span>{o.items.reduce((n, i) => n + i.qty, 0)} item(s)</span>
                  <span>{money(o.total)}</span>
                  <span className="status-pill">{o.status}</span>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <form className="account-form" onSubmit={submitSignIn} noValidate>
          <p className="notice">
            Demo sign-in: no password is needed and nothing is sent to a server. Your details are kept in this browser only.
          </p>
          <label className={`field ${signInErrors.name ? 'has-error' : ''}`}>
            <span>Full name</span>
            <input
              value={signInForm.name}
              onChange={(e) => setSignInForm({ ...signInForm, name: e.target.value })}
              autoComplete="name"
            />
            {signInErrors.name && <small className="field-error">{signInErrors.name}</small>}
          </label>
          <label className={`field ${signInErrors.email ? 'has-error' : ''}`}>
            <span>Email</span>
            <input
              type="email"
              value={signInForm.email}
              onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
              autoComplete="email"
            />
            {signInErrors.email && <small className="field-error">{signInErrors.email}</small>}
          </label>
          <button type="submit" className="btn">Sign In</button>
        </form>
      )}

      <h3 className="sub-head">Order status</h3>
      <form className="lookup-form" onSubmit={lookupOrder}>
        <input
          aria-label="Order number"
          placeholder="Order number, e.g. MG123456"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />
        <button type="submit" className="btn">Find Order</button>
      </form>
    </div>
  )
}
