import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="section">
      <p className="empty">
        <strong>Page not found.</strong><br /><br />
        <Link to="/" className="btn">Back to Home</Link>
      </p>
    </div>
  )
}
