@AGENTS.md

# IndoNepal Rudraksha website

Production shop for IndoNepal Rudraksha (Indian market): genuine Nepali Rudraksha 1–16 Mukhi, rare beads,
malas and bracelets, and paid horoscope consultations with Dr. Panduranga Rao Garu.
Domain: https://indonepalrudrakshaorganisation.in. Maintained by Rado for IndoNepal.

## Stack (decided — see TECH-DECISIONS.md in the claude.ai Project)

- Next.js 16 App Router, **static export** (`output: "export"`), React 19, TypeScript, Tailwind CSS 4.
- Hosting: Cloudflare Pages free plan, built from this GitHub repo. Build command `npm run build`, output folder `out`.
- **No backend, no database, no server code.** Everything is HTML/CSS/JS files. That rules out: API routes that
  read requests, server actions, cookies, `next/image` optimisation, redirects/rewrites/headers in next.config,
  `dynamicParams: true`. Dynamic routes need `generateStaticParams`. Route params are a Promise (`await params`).
- Fonts are self-hosted with @fontsource (Marcellus, Mukta, Tiro Devanagari Sanskrit, Kalam, Noto Sans Tamil).
- This Next.js version differs from older docs: read `node_modules/next/dist/docs/` before using an API.

## How selling works (no checkout on the site)

- **Beads** (1–16 Mukhi) have prices in two sizes, Normal and Collector (Collector = a bigger bead).
  The cart lives in localStorage (`inr-cart-v2`). "Place order on WhatsApp" builds a message with an order number
  like `IR-261114-4821` and opens wa.me. Assistants reply with a Razorpay Payment Link (Reference ID = order no.).
- **Rare beads, malas and bracelets** show no price: "Ask for price" opens WhatsApp with a pre-filled message.
- **Consultations** (₹500, 30 min, 10 slots a day): the visitor picks a _preferred_ slot (IST), then pays through an
  embedded Razorpay Payment Button. Until `consultation.razorpayButtonId` is set in `src/data/site.ts`, the
  booking card shows "Book on WhatsApp" instead. Razorpay redirects to `/consultation/thank-you/`.
  The site cannot see real bookings, so there are no "N slots left" counts.

## Where things live

- `src/data/site.ts` — business details, WhatsApp number, address, consultation slots, Razorpay button id.
- `src/data/beads.ts` — beads, prices (from products.xlsx), deities, planets, mantras.
- `src/data/malas.ts` — malas and bracelets. `null` details are hidden on the page.
- `src/data/founder.ts` — founder slides. Only `published: true` slides appear.
- `src/components/home/hero.tsx` — scroll-driven hero, a port of design/source/Hero.dc.html. Keep the timing maths.
- `src/components/art/` — drawn Rudraksha (rotating), mala, Shivalinga (generated `lingam-markup.ts`).
- `public/images/` — web-sized photos made by `npm run images -- <content folder>` (sharp → WebP).
- Design source: `~/Desktop/IndoNepal-Website/design/` (DESIGN-BRIEF.md, `source/*.dc.html`, `screens/`).

## Rules

- **Founder photos:** all 17 are published at Rado's request (2026-11-14), each with its caption and lawyer review
  group in `src/data/founder.ts`. To hide one, set `published: false` and delete its file from
  `public/images/founder/` (anything in `public/` can be downloaded). The bio leaves out the book release by the
  Indian Prime Minister and the list of named leaders from business-info.txt; add them only if Rado asks.
- **Product photos** are the main picture on bead and mala pages; the drawn bead/mala only shows where there is
  no photo yet (Garbha Gauri Shankar, bracelets). Bead photos are padded to white squares by the image script.
- Name format on the site: **Dr. Panduranga Rao Garu** (short: Panduranga Rao Garu).
- WhatsApp: +91 91777 78852 (`919177778852` in links). Email: info@indonepalrudrakshaorganisation.in.
- Use the design tokens in `src/app/globals.css` (`text-heading`, `bg-ground`, `bg-saffron`, `font-display` …),
  not raw hex, for anything new.
- Accessibility: touch targets ≥ 44px, visible focus, `prefers-reduced-motion` respected (hero shows its final frame,
  the bead stops spinning, the Shivalinga's animations pause).
- Text in [square brackets] is a placeholder waiting for the business. `npm run check:placeholders` lists them.
- Prices: INR with Indian grouping via `inr()` in `src/lib/format.ts`. Times: IST via `src/lib/slots.ts`.

## Commands

```bash
npm install
npm run dev                 # http://localhost:3000
npm run build               # static site in out/
npm start                   # serve out/ locally
npm run lint && npm run typecheck
npm run format
npm run check:placeholders  # after build
npm run images -- ~/Desktop/IndoNepal-Website   # regenerate public/images
```
