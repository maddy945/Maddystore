export const products = [
  { id: 1, name: 'Call of Duty: Black Ops 6', platform: 'PS5', category: 'Games', condition: 'New', price: 69.99, oldPrice: null, rating: 4.5, image: '/images/cod.jpg', },
  { id: 2, name: 'EA Sports FC 27', platform: 'PS5', category: 'Games', condition: 'New', price: 69.99, oldPrice: null, rating: 4.2, image: '/images/fc27.jpg',},
  { id: 3, name: 'Gta 6', platform: 'Xbox Series X', category: 'Games', condition: 'Pre-Owned', price: 54.99, oldPrice: 69.99, rating: 4.9, image: '/images/gta6.jpg',  },
  { id: 4, name: 'Madden NFL 27', platform: 'Xbox Series X', category: 'Games', condition: 'New', price: 69.99, oldPrice: 79.99, rating: 4.0, image: '/images/madden.jpg', },
  { id: 5, name: 'Elden Ring Nightreign', platform: 'PS5', category: 'Games', condition: 'New', price: 59.99, oldPrice: null, rating: 4.7, image: '/images/elden.jpg', },
  { id: 6, name: 'PlayStation 5 Console – Slim', platform: 'PS5', category: 'Consoles', condition: 'New', price: 449.99, oldPrice: 499.99, rating: 4.8, image: '/images/ps5.jpg', },
  { id: 7, name: 'Xbox Series X Console', platform: 'Xbox Series X', category: 'Consoles', condition: 'New', price: 499.99, oldPrice: null, rating: 4.8, image: '/images/xbox.jpg',  },
  { id: 8, name: 'Nintendo Switch 2', platform: 'Switch 2', category: 'Consoles', condition: 'New', price: 449.99, oldPrice: null, rating: 4.9, image: '/images/switch2.jpg',  },
  { id: 9, name: 'DualSense Wireless Controller', platform: 'PS5', category: 'Accessories', condition: 'New', price: 54.99, oldPrice: 74.99, rating: 4.6, image: '/images/dualsense.jpg',},
  { id: 10, name: 'Xbox Wireless Controller – Carbon Black', platform: 'Xbox Series X', category: 'Accessories', condition: 'New', price: 49.99, oldPrice: 64.99, rating: 4.5, image: '/images/xbox-controller.jpg', },
  { id: 11, name: 'Turtle Beach Stealth 700 Headset', platform: 'Multi-Platform', category: 'Accessories', condition: 'New', price: 129.99, oldPrice: 179.99, rating: 4.3, image: '/images/headset.jpg',},
  { id: 12, name: 'Call of Duty: Black Ops 6', platform: 'PS5', category: 'Games', condition: 'Pre-Owned', price: 34.99, oldPrice: 69.99, rating: 4.4, image: '/images/cod.jpg',},
  { id: 13, name: 'Spider-Man 2', platform: 'PS5', category: 'Games', condition: 'Pre-Owned', price: 29.99, oldPrice: 69.99, rating: 4.8, image: '/images/spiderman.jpg', },
  { id: 14, name: 'Legend of Zelda: Tears of the Kingdom', platform: 'Switch', category: 'Games', condition: 'Pre-Owned', price: 39.99, oldPrice: 59.99, rating: 4.9, image: '/images/zelda.jpg',},
  { id: 15, name: 'NBA 2K27', platform: 'PS5', category: 'Games', condition: 'New', price: 69.99, oldPrice: null, rating: 3.9, image: '/images/nba2k.jpg', },
  { id: 16, name: 'Meta Quest 3S 128GB', platform: 'VR', category: 'Consoles', condition: 'New', price: 299.99, oldPrice: null, rating: 4.6, image: '/images/quest.jpg', },
]

export const categories = ['All', 'Games', 'Consoles', 'Accessories']
export const conditions = ['All', 'New', 'Pre-Owned']

export function getProduct(id) {
  return products.find((p) => p.id === Number(id))
}

// Other names shoppers use for each platform, so "playstation" finds PS5 items, "nintendo" finds Switch, etc.
const PLATFORM_ALIASES = {
  PS5: 'playstation ps5 sony',
  'Xbox Series X': 'xbox microsoft series',
  Switch: 'nintendo switch',
  'Switch 2': 'nintendo switch 2',
  VR: 'vr meta quest virtual reality',
  'Multi-Platform': 'all platforms',
}

// Every search term must appear somewhere in the product's name, platform, category, condition or platform aliases.
export function searchProducts(list, query) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return list
  return list.filter((p) => {
    const haystack = `${p.name} ${p.platform} ${p.category} ${p.condition} ${PLATFORM_ALIASES[p.platform] || ''}`.toLowerCase()
    return terms.every((t) => haystack.includes(t))
  })
}

export function filterProducts({ q = '', cat = 'All', cond = 'All' }) {
  let list = searchProducts(products, q)
  if (cat !== 'All') list = list.filter((p) => p.category === cat)
  if (cond !== 'All') list = list.filter((p) => p.condition === cond)
  return list
}

export function getBadge(p) {
  if (p.condition === 'Pre-Owned') return { cls: 'preowned', label: 'Pre-Owned' }
  if (p.oldPrice) return { cls: 'sale', label: 'Sale' }
  return null
}

export function stars(rating) {
  const full = Math.round(rating)
  return '★'.repeat(full) + '☆'.repeat(5 - full)
}
