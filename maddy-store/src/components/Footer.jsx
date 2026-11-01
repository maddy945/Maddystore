import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div>
          <h4>Customer Service</h4>
          <Link to="/info/help">Help Center</Link>
          <Link to="/account">Order Status</Link>
          <Link to="/info/returns">Returns &amp; Exchanges</Link>
          <Link to="/info/shipping">Shipping Info</Link>
        </div>
        <div>
          <h4>Shopping With Us</h4>
          <Link to="/info/weekly-ad">Weekly Ad</Link>
          <Link to="/info/gift-cards">Gift Cards</Link>
          <Link to="/trade-in">Trade-In Program</Link>
          <Link to="/info/powerup">PowerUp Rewards</Link>
        </div>
        <div>
          <h4>About MaddyStore</h4>
          <Link to="/info/about">About Us</Link>
          <Link to="/info/careers">Careers</Link>
          <Link to="/info/store-locator">Store Locator</Link>
          <Link to="/info/newsroom">Newsroom</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="mailto:support@maddystore.com">support@maddystore.com</a>
          <span className="footer-text">1-800-MADDY-GS</span>
          <Link to="/info/live-chat">Live Chat</Link>
        </div>
      </div>
      <div className="footer-bottom">
        🎮 MADDYSTORE — POWER TO THE PLAYERS © 2026 | Prices and offers subject to change.
      </div>
    </footer>
  )
}
