# Bloom & Co. — Say It Better With Flowers

Frontend-only flower shop website, built same-to-same as the reference design.
Svelte 5 + SvelteKit 3 + Tailwind CSS 4, static prerendered, mock data only.

## Pages (32 prerendered URLs)

- `/` — hero, shop by occasion, bestsellers, same-day delivery banner, testimonials
- `/shop` — all 12 bouquets with search, occasion + flower filters, sorting
- `/shop/[slug]` — 12 product pages: qty, card message, delivery promises, related bouquets
- `/occasions` + `/occasions/[slug]` — 6 occasion pages (Birthday, Anniversary, Congratulations, Love & Romance, Sympathy, Just Because)
- `/checkout` — 3-step mock checkout (review → delivery + payment → confirmation with order ref)
- `/subscriptions` — Petal / Bloom / Grand Bloom monthly plans
- `/gift-cards` — ₹500–₹5,000, mock email delivery
- `/about`, `/delivery`, `/care`, `/reviews`, `/faq`, `/contact`, `/privacy`, `/terms`
- `sitemap.xml`, `robots.txt`, custom 404

## Stack & rules

- Svelte 5 runes only, `#lib` imports, `prerender = true`, SSR on
- All content in `src/lib/data/site.ts` (mock — swap in real data after client approval)
- Every image generated, served via `Picture.svelte` (AVIF → WebP → JPG → PNG fallback, 480/800/1200/1600)
- Fonts self-hosted: Playfair Display (headings), Inter (body), Great Vibes (handwritten accents)
- GSAP + Lenis smooth scroll, View Transitions off (kept simple), `prefers-reduced-motion` respected
- WCAG 2.2 AA: 48px tap targets, visible focus, skip link, aria labels
- SEO: Florist JSON-LD (no self-published aggregateRating, no FAQPage schema — per Google 2026 rules), sitemap, robots, `_headers`

## Commands

```bash
npm install
npm run images   # convert PNG masters in static/images/original/ → AVIF/WebP/JPG
npm run check    # svelte-check, must be 0 errors
npm run build    # static output in build/
npm run preview  # serve build/ locally
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`): push to `main` → build → Cloudflare Pages.
Live: https://bloom-and-co-bfk.pages.dev
