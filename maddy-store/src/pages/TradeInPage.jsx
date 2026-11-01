import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

const PLATFORMS = ['PS5', 'PS4', 'Xbox Series X|S', 'Xbox One', 'Switch', 'Switch 2', 'VR', 'Other']
const CONDITIONS = ['Like New', 'Good', 'Fair', 'Heavily Used']
const EMAIL_RE = /^\S+@\S+\.\S+$/

export default function TradeInPage() {
  const { user } = useStore()
  const [form, setForm] = useState({
    item: '', platform: PLATFORMS[0], condition: CONDITIONS[1],
    email: user?.email || '', notes: '',
  })
  const [errors, setErrors] = useState({})
  const [reference, setReference] = useState(null)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.item.trim()) errs.item = 'Tell us what you want to trade in.'
    if (!EMAIL_RE.test(form.email.trim())) errs.email = 'Enter a valid email address.'
    setErrors(errs)
    if (Object.keys(errs).length) return
    setReference('TI-' + Math.random().toString(36).slice(2, 8).toUpperCase())
  }

  if (reference) {
    return (
      <div className="section">
        <div className="section-head"><h2>Trade-In Request Received</h2></div>
        <p className="notice success">
          Reference <strong>{reference}</strong>. In a live store, your quote for <strong>{form.item}</strong> would be emailed to {form.email}.
        </p>
        <p className="notice">Demo store: no quote is calculated and nothing is sent. Connect a backend to make this live.</p>
        <button className="btn" onClick={() => setReference(null)}>Submit another item</button>
        <Link to="/" className="back-link" style={{ marginLeft: '1rem' }}>Back to home</Link>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="section-head"><h2>Trade-In Quote</h2></div>
      <p className="muted">Trade in games, consoles and accessories for store credit. Tell us about your item and we'll send a quote.</p>

      <form className="account-form" onSubmit={onSubmit} noValidate>
        <label className={`field ${errors.item ? 'has-error' : ''}`}>
          <span>Item name</span>
          <input name="item" value={form.item} onChange={onChange} placeholder="e.g. Spider-Man 2" />
          {errors.item && <small className="field-error">{errors.item}</small>}
        </label>
        <div className="field-row">
          <label className="field">
            <span>Platform</span>
            <select name="platform" value={form.platform} onChange={onChange}>
              {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Condition</span>
            <select name="condition" value={form.condition} onChange={onChange}>
              {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
        </div>
        <label className={`field ${errors.email ? 'has-error' : ''}`}>
          <span>Email for your quote</span>
          <input name="email" type="email" value={form.email} onChange={onChange} autoComplete="email" />
          {errors.email && <small className="field-error">{errors.email}</small>}
        </label>
        <label className="field">
          <span>Notes (optional)</span>
          <textarea name="notes" rows={3} value={form.notes} onChange={onChange} placeholder="Included box, manual, damage…" />
        </label>
        <button type="submit" className="btn">Get My Quote</button>
      </form>
    </div>
  )
}
