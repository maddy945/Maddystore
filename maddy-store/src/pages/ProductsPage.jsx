import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { filterProducts, categories, conditions } from '../data/products'

// All filter state lives in the URL (?q=, ?cat=, ?cond=), so links from the navbar,
// home tiles and search all land on the right results, and the page can be bookmarked or shared.
export default function ProductsPage() {
  const [params, setParams] = useSearchParams()

  const cat = categories.includes(params.get('cat')) ? params.get('cat') : 'All'
  const cond = conditions.includes(params.get('cond')) ? params.get('cond') : 'All'
  const q = (params.get('q') || '').trim()

  const filtered = filterProducts({ q, cat, cond })

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (!value || value === 'All') next.delete(key)
    else next.set(key, value)
    setParams(next)
  }

  const activeParts = [cat !== 'All' ? cat : null, cond !== 'All' ? cond : null].filter(Boolean)
  const title = q
    ? `Results for “${q}”`
    : activeParts.length
      ? activeParts.join(' · ')
      : 'All Products'
  const hasFilters = q || cat !== 'All' || cond !== 'All'

  return (
    <div className="section">
      <div className="section-head">
        <h2>{title}</h2>
        <span className="result-count">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {hasFilters && (
        <div className="active-filters">
          {q && (
            <button className="filter-chip active" onClick={() => setParam('q', '')}>
              Search: {q} ✕
            </button>
          )}
          {cat !== 'All' && (
            <button className="filter-chip active" onClick={() => setParam('cat', 'All')}>
              {cat} ✕
            </button>
          )}
          {cond !== 'All' && (
            <button className="filter-chip active" onClick={() => setParam('cond', 'All')}>
              {cond} ✕
            </button>
          )}
          <button className="clear-filters" onClick={() => setParams(new URLSearchParams())}>
            Clear all
          </button>
        </div>
      )}

      <div className="filters">
        {categories.map((c) => (
          <button
            key={c}
            className={`filter-chip ${cat === c ? 'active' : ''}`}
            onClick={() => setParam('cat', c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="filters">
        {conditions.map((c) => (
          <button
            key={c}
            className={`filter-chip ${cond === c ? 'active' : ''}`}
            onClick={() => setParam('cond', c)}
          >
            {c === 'All' ? 'Any Condition' : c}
          </button>
        ))}
      </div>

      <ProductGrid products={filtered} />
    </div>
  )
}
