import { Link } from 'react-router-dom'

const tiles = [
  { to: '/products?cat=Games', emoji: '📀', label: 'Video Games', sub: 'New & Pre-Owned', bg: 'linear-gradient(135deg, #7c3aed, #4c1d95)' },
  { to: '/products?cat=Consoles', emoji: '🎮', label: 'Consoles', sub: 'PS5, Xbox, Switch, VR', bg: 'linear-gradient(135deg, #0891b2, #155e75)' },
  { to: '/products?cat=Accessories', emoji: '🎧', label: 'Accessories', sub: 'Controllers, Headsets', bg: 'linear-gradient(135deg, #db2777, #831843)' },
  { to: '/products?cond=Pre-Owned', emoji: '♻️', label: 'Pre-Owned', sub: 'Certified & Tested', bg: 'linear-gradient(135deg, #f59e0b, #b45309)' },
]

export default function CategoryTiles() {
  return (
    <div className="tiles">
      {tiles.map((t) => (
        <Link key={t.label} to={t.to} className="tile" style={{ background: t.bg }}>
          <span>{t.emoji}</span>
          {t.label}
          <small>{t.sub}</small>
        </Link>
      ))}
    </div>
  )
}
