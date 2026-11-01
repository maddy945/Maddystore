import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import TradeInBanner from '../components/TradeInBanner'
import CategoryTiles from '../components/CategoryTiles'
import ProductGrid from '../components/ProductGrid'
import { products } from '../data/products'

export default function HomePage() {
  const newReleases = products.filter((p) => p.condition === 'New').slice(0, 5)
  const topDeals = products.filter((p) => p.oldPrice).slice(0, 5)
  const preOwned = products.filter((p) => p.condition === 'Pre-Owned').slice(0, 5)

  return (
    <>
      <Hero />
      <div className="section">
        <CategoryTiles />
      </div>

      <div className="section" id="deals">
        <div className="section-head">
          <h2>Top Deals</h2>
          <Link to="/products">View All →</Link>
        </div>
        <ProductGrid products={topDeals} />
      </div>

      <TradeInBanner />

      <div className="section">
        <div className="section-head">
          <h2>New Releases</h2>
          <Link to="/products?cond=New">View All →</Link>
        </div>
        <ProductGrid products={newReleases} />
      </div>

      <div className="section">
        <div className="section-head">
          <h2>Certified Pre-Owned</h2>
          <Link to="/products?cond=Pre-Owned">View All →</Link>
        </div>
        <ProductGrid products={preOwned} />
      </div>
    </>
  )
}
