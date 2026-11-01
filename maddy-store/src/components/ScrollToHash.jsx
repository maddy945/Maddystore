import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Makes in-page anchors such as /#deals and /#tradein work across routes:
// scrolls to the matching element, or to the top when there is no hash.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
