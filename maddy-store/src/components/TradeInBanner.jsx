import { Link } from 'react-router-dom'

export default function TradeInBanner() {
  return (
    <section className="tradein" id="tradein">
      <div>
        <h3>💰 Trade, Save, Play — Get up to <span>$350</span> in store credit</h3>
        <p>Trade in your old games, consoles and accessories. Instant quote online, credit in store.</p>
      </div>
      <Link to="/trade-in" className="btn">Get a Trade Quote</Link>
    </section>
  )
}
