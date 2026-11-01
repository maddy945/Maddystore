export default function PromoStrip() {
  const items = [
    { icon: '🚚', title: 'Free Shipping', text: 'On orders over $35' },
    { icon: '🔄', title: 'Trade-In Value', text: 'Get cash or credit' },
    { icon: '⭐', title: 'Member Pricing', text: 'Save more every day' },
  ]
  return (
    <div className="promo-strip">
      <div className="promo-inner">
        {items.map((i) => (
          <div key={i.title} className="promo-item">
            <span className="promo-icon">{i.icon}</span>
            <div>
              <strong>{i.title}</strong>
              <span>{i.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
