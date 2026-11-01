import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useStore } from '../context/StoreContext'
import SearchBar from './SearchBar'

const catLinks = [
  { to: '/products?cat=Games', label: 'Video Games', cat: 'Games' },
  { to: '/products?cat=Consoles', label: 'Consoles', cat: 'Consoles' },
  { to: '/products?cat=Accessories', label: 'Controllers & Accessories', cat: 'Accessories' },
  { to: '/products?cond=Pre-Owned', label: 'Pre-Owned', cond: 'Pre-Owned', sale: true },
]

// A category link is active when the product page's filters match it exactly.
function isActive(link, location) {
  if (location.pathname !== '/products') return false
  const p = new URLSearchParams(location.search)
  return (
    (p.get('cat') || '') === (link.cat || '') &&
    (p.get('cond') || '') === (link.cond || '') &&
    !p.get('q')
  )
}

export default function Navbar() {
  const { count } = useCart()
  const { user } = useStore()
  const location = useLocation()
  const firstName = user?.name.split(' ')[0]

  return (
    <header>
      <div className="header">
        <div className="header-top">
          <Link to="/" className="logo">
            MADDY<span>STORE</span>
            <span className="tag">POWER TO THE PLAYERS</span>
          </Link>
          <SearchBar />
          <div className="header-actions">
            <Link to="/account">
              <span>👤</span>
              <span className="txt">{firstName ? `Hi, ${firstName}` : 'Sign In'}</span>
              <small>Account</small>
            </Link>
            <Link to="/cart">
              <span>🛒</span>
              <span className="txt">Cart</span>
              <small>{count > 0 ? `${count} item${count > 1 ? 's' : ''}` : '0 items'}</small>
            </Link>
          </div>
        </div>
        <nav className="cat-nav">
          <ul>
            {catLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className={[isActive(l, location) ? 'active' : '', l.sale ? 'sale' : ''].join(' ').trim()}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li><Link to="/trade-in">Trade-In</Link></li>
            <li><Link to="/#deals" className="sale">Deals 🔥</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
