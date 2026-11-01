# 🎮 MaddyStore — GameStop-Style Store Front End

A React.js e-commerce front end styled after GameStop: red/black branding, search bar,
category nav, trade-in banners, pre-owned tags, weekly deals, real product images, and a full cart.

> ⚠️ Fan/demo project — not affiliated with GameStop Corp. Product images are for demo use only.

## Tech Stack
- React 18 + Hooks
- React Router (routing + query params for filters)
- Context API (cart state)
- Vite

## Run it
```bash
npm install
npm run dev
```

## Features (all working)
- 🔍 **Search** from any page: multi-word matching across name, platform, category and condition; results at `/products?q=...`
- 🗂️ **Category & condition filters** (New / Pre-Owned) driven by the URL, so navbar links, home tiles, search and bookmarks all land on the right results. Active filters can be removed individually or all at once.
- 🔴 Navbar links: Video Games, Consoles, Accessories, Pre-Owned, Trade-In, and Deals (scrolls to the deals section on any page)
- 🖼️ Hero banner, trade-in banner, category tiles, Top Deals / New Releases / Certified Pre-Owned sections
- 🏷️ Product cards with photos, platform, ratings, Sale and Pre-Owned badges, and an "Added to Cart" confirmation
- 🛒 **Cart**: quantity controls, remove, clear (with confirmation), subtotal, free-shipping progress ($35 threshold, otherwise $5.99), saved across page reloads
- 💳 **Checkout** with validation (required fields, email, postal code, Luhn-checked card number, expiry, CVC) and an order summary
- 📦 **Order confirmation** at `/orders/:id`; **Order Status** lookup by order number on the Account page
- 👤 **Account** (demo sign-in by name and email, no password) with order history; the navbar greets you by first name
- 💰 **Trade-in quote** form at `/trade-in`
- 📄 Footer links resolve to real pages (`/info/:slug`), with a 404 page for unknown routes

> Demo limitations: there is no backend. Cart, orders and sign-in are stored in the browser's localStorage. Checkout does not charge a card (only the last four digits are kept), and sign-in is not verified. Footer and info-page copy is placeholder text.

## Structure
```
src/
├── main.jsx / App.jsx / index.css
├── context/   CartContext.jsx (cart lines, totals), StoreContext.jsx (account, orders)
├── data/      products.js (catalog, search & filter), info.js (footer pages)
├── lib/       storage.js (safe localStorage), pricing.js (shipping rules, money)
├── components/ Navbar, SearchBar, Hero, ProductCard, ProductGrid, TradeInBanner,
│              CategoryTiles, Footer, ScrollToHash
└── pages/     HomePage, ProductsPage, CartPage, CheckoutPage, OrderPage,
               AccountPage, TradeInPage, InfoPage, NotFoundPage
public/
└── images/    product photos
```
