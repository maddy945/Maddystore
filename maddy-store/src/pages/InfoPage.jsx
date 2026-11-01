import { Link, useParams } from 'react-router-dom'
import { INFO_PAGES } from '../data/info'

export default function InfoPage() {
  const { slug } = useParams()
  const page = INFO_PAGES[slug]

  if (!page) {
    return (
      <div className="section">
        <p className="empty">That page doesn't exist. <Link to="/" className="btn">Go Home</Link></p>
      </div>
    )
  }

  return (
    <div className="section info-page">
      <div className="section-head"><h2>{page.title}</h2></div>
      {page.body.map((p, i) => <p key={i}>{p}</p>)}
      {page.action && (
        <Link to={page.action.to} className="btn">{page.action.label}</Link>
      )}
    </div>
  )
}
