import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING } from '../lib/pricing'

// Static pages linked from the footer. Copy is placeholder text for this demo store.
export const INFO_PAGES = {
  help: {
    title: 'Help Center',
    body: [
      'Find answers about orders, shipping, returns and trade-ins here. For order-specific questions, use Order Status with your order number.',
      'Still need help? Email support@maddystore.com and our team will get back to you.',
    ],
    action: { label: 'Check Order Status', to: '/account' },
  },
  shipping: {
    title: 'Shipping Info',
    body: [
      `Orders of $${FREE_SHIPPING_THRESHOLD} or more ship free. Orders under $${FREE_SHIPPING_THRESHOLD} have a flat $${FLAT_SHIPPING.toFixed(2)} shipping fee.`,
      'You can see the shipping cost and free-shipping progress in your cart before checkout.',
    ],
    action: { label: 'Go to Cart', to: '/cart' },
  },
  returns: {
    title: 'Returns & Exchanges',
    body: [
      'Placeholder policy for this demo: unopened items can be returned within 30 days for a refund to the original payment method. Pre-owned items follow the same window.',
      'For returns, email support@maddystore.com with your order number.',
    ],
  },
  'weekly-ad': {
    title: 'Weekly Ad',
    body: ['This week’s featured deals are highlighted on the home page under Top Deals.'],
    action: { label: 'See Top Deals', to: '/#deals' },
  },
  'gift-cards': {
    title: 'Gift Cards',
    body: ['Gift cards are not available in this demo store yet.'],
  },
  powerup: {
    title: 'PowerUp Rewards',
    body: ['PowerUp Rewards membership is not available in this demo store yet.'],
  },
  about: {
    title: 'About MaddyStore',
    body: [
      'MaddyStore is a fan-made demo storefront inspired by GameStop’s shopping experience. It is not affiliated with GameStop Corp.',
    ],
  },
  careers: {
    title: 'Careers',
    body: ['There are no open positions at this demo store.'],
  },
  'store-locator': {
    title: 'Store Locator',
    body: ['This demo store has no physical locations to show.'],
  },
  newsroom: {
    title: 'Newsroom',
    body: ['No announcements yet.'],
  },
  'live-chat': {
    title: 'Live Chat',
    body: ['Live chat is not connected in this demo. Email support@maddystore.com and we will reply.'],
  },
}
