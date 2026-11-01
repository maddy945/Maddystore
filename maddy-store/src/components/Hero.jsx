import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="hero-banner">
      <div className="content">
        <div className="kicker">This Week Only</div>
        <h1>BOGO 50% OFF<br />ALL PRE-OWNED GAMES</h1>
        <p>Mix & match thousands of titles. Build your backlog for less — online or in store.</p>
        <Link to="/products?cond=Pre-Owned" className="btn">Shop Pre-Owned</Link>
        <Link to="/products" className="btn btn-outline">View All Deals</Link>
      </div>
      <div className="hero-img">
        <img src="/images/ps5.jpg" alt="PlayStation 5 console" />
      </div>
    </section>
  )
}
