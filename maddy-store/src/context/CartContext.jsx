import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getProduct } from '../data/products'
import { loadJSON, saveJSON } from '../lib/storage'
import { shippingFor } from '../lib/pricing'

const CART_KEY = 'maddy-cart'
const CartContext = createContext(null)

// The cart stores only { id, qty }; product details are looked up from the catalog,
// so prices and names never go stale. Invalid saved entries are dropped.
function sanitize(raw) {
  if (!Array.isArray(raw)) return []
  return raw.filter((l) => l && getProduct(l.id) && Number.isInteger(l.qty) && l.qty > 0)
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(() => sanitize(loadJSON(CART_KEY, [])))

  useEffect(() => {
    saveJSON(CART_KEY, lines)
  }, [lines])

  const addToCart = useCallback((product) => {
    setLines((prev) =>
      prev.some((l) => l.id === product.id)
        ? prev.map((l) => (l.id === product.id ? { ...l, qty: l.qty + 1 } : l))
        : [...prev, { id: product.id, qty: 1 }]
    )
  }, [])

  const removeFromCart = useCallback((id) => {
    setLines((prev) => prev.filter((l) => l.id !== id))
  }, [])

  const updateQty = useCallback((id, delta) => {
    setLines((prev) =>
      prev.map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0)
    )
  }, [])

  const clearCart = useCallback(() => setLines([]), [])

  const items = useMemo(
    () => lines.map((l) => ({ ...getProduct(l.id), qty: l.qty })),
    [lines]
  )

  const { total, count } = useMemo(
    () => ({
      total: items.reduce((sum, i) => sum + i.price * i.qty, 0),
      count: items.reduce((sum, i) => sum + i.qty, 0),
    }),
    [items]
  )

  const shipping = shippingFor(total)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        total,
        count,
        shipping,
        grandTotal: total + shipping,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
