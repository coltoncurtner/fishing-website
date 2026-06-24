# Salt & Stream — Lead-Free Fishing Tackle Storefront

A premium, conversion-optimized e-commerce storefront for salt and freshwater
fishing tackle, built around a clear differentiator: **100% lead-free,
non-toxic weights and hooks** that are better for fish and water.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**. The store
runs on a typed **mock data layer** so the full shopping experience works
end-to-end today, and is structured to swap in real products and payments
(Stripe) later without touching the UI.

## Highlights

- **Conversion-first UX** — punchy hero, sticky high-contrast Add to Cart
  (desktop + mobile bar), slide-in cart drawer, free-shipping progress meter,
  trust signals, ratings, and urgency cues.
- **Full catalog** — lures, baits, weights, hooks, apparel (~36 products) with
  fast filters (water type, lead-free only), sorting, and quick-add.
- **Pro Club membership** — tiered plans (Shorebound / Angler / Pro Captain).
  Activating a plan applies member pricing live across the entire store.
- **Eco mission** throughout — lead-free badges, a dedicated mission page, and
  curated "Lead-Free Conversion" collection.
- **SEO/ads-ready** — per-page metadata, Open Graph, Product/Organization
  JSON-LD, `sitemap.xml`, `robots.txt`. Fully responsive and accessible.
- **Fast** — mostly Server Components; ~87–109 kB First Load JS per route.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Project structure

```
app/                 # routes (App Router)
  page.tsx           # home
  shop/              # all products + /shop/[category]
  product/[slug]/    # product detail (PDP) + JSON-LD
  collections/[slug] # curated landing pages (great ad targets)
  pro-club/          # membership tiers
  eco/ about/ contact/ search/ cart/ checkout/
  legal/[doc]/       # shipping, returns, privacy, terms
  sitemap.ts robots.ts
components/
  ui/                # Button, Badge, StarRating, PriceTag, ProductImage, Logo…
  layout/            # Header, Footer
  commerce/          # ProductCard/Grid/Rail, CatalogView, ProductDetail,
                     # CartDrawer, AddToCartButton, QuantityStepper, meter
  marketing/         # Hero, EcoStrip, MembershipTiers, Testimonials, etc.
lib/
  brand.ts           # ⭐ single source of truth for brand (rename here)
  types.ts           # all domain types
  data/              # products, collections, membership (mock data)
  cart-store.ts      # Zustand cart + membership state (persisted)
  seo.ts utils.ts
```

## Customizing

- **Rebrand**: edit `lib/brand.ts` (name, tagline, colors live in
  `tailwind.config.ts`).
- **Products**: edit `lib/data/products.ts`. The shape in `lib/types.ts` mirrors
  a typical commerce API, so swapping the mock arrays for a `fetch` is direct.
- **Imagery**: product visuals use a branded gradient placeholder
  (`components/ui/ProductImage.tsx`). Replace its internals with `next/image`
  when real photography is available.

## Wiring up real payments / backend (next steps)

The data layer and cart are intentionally decoupled from the UI:

1. Replace `lib/data/*` with calls to your commerce backend (Shopify, Medusa, a
   custom API, etc.).
2. Add Stripe Checkout / Stripe Billing for the Pro Club in
   `app/checkout/page.tsx` (replace the mock `placeOrder`) and a webhook route
   under `app/api/`.
3. Connect `NewsletterSignup` / `ContactForm` to your ESP / CRM.

> Note: checkout is a demo — no real payments are processed.
