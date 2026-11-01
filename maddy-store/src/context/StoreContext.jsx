import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { loadJSON, saveJSON } from '../lib/storage'

// Demo account and order history, kept in this browser's localStorage.
// There is no server, so sign-in does not verify anyone and orders are not shared between devices.
const USER_KEY = 'maddy-user'
const ORDERS_KEY = 'maddy-orders'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [user, setUser] = useState(() => loadJSON(USER_KEY, null))
  const [orders, setOrders] = useState(() => {
    const saved = loadJSON(ORDERS_KEY, [])
    return Array.isArray(saved) ? saved : []
  })

  useEffect(() => {
    saveJSON(USER_KEY, user)
  }, [user])

  useEffect(() => {
    saveJSON(ORDERS_KEY, orders)
  }, [orders])

  const signIn = useCallback(({ name, email }) => {
    setUser({ name: name.trim(), email: email.trim() })
  }, [])

  const signOut = useCallback(() => setUser(null), [])

  const placeOrder = useCallback((order) => {
    setOrders((prev) => [order, ...prev])
  }, [])

  const findOrder = useCallback(
    (id) => orders.find((o) => o.id === String(id).trim().toUpperCase()) || null,
    [orders]
  )

  const value = useMemo(
    () => ({ user, signIn, signOut, orders, placeOrder, findOrder }),
    [user, signIn, signOut, orders, placeOrder, findOrder]
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  return useContext(StoreContext)
}
