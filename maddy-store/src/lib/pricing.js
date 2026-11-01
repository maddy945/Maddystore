export const FREE_SHIPPING_THRESHOLD = 35
export const FLAT_SHIPPING = 5.99

export function shippingFor(subtotal) {
  if (subtotal <= 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0
  return FLAT_SHIPPING
}

export const money = (n) => `$${n.toFixed(2)}`
