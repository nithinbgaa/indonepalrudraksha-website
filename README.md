# IndoNepal Rudraksha — website

Static Next.js site for [indonepalrudrakshaorganisation.in](https://indonepalrudrakshaorganisation.in):
Nepali Rudraksha 1–16 Mukhi, rare beads, malas and bracelets, and horoscope consultations.
Orders go through WhatsApp and Razorpay Payment Links; consultations through a Razorpay Payment Button.

## Run it

Needs Node 22 (`nvm use`).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes the static site to out/
npm start          # serves out/ at http://localhost:3000
```

## Everyday changes

| To change…                                                 | Edit                                                                                     |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| A price, a bead's text, availability                       | `src/data/beads.ts`                                                                      |
| Malas and bracelets                                        | `src/data/malas.ts`                                                                      |
| WhatsApp number, address, announcement, consultation slots | `src/data/site.ts`                                                                       |
| Razorpay consultation button                               | `consultation.razorpayButtonId` in `src/data/site.ts`                                    |
| Founder photos and text                                    | `src/data/founder.ts` and `scripts/prepare-images.mjs`                                   |
| Photos                                                     | replace them in the content folder, then `npm run images -- ~/Desktop/IndoNepal-Website` |
| Policies                                                   | `src/app/{terms,privacy,shipping-and-returns,cancellation-and-refunds}/page.tsx`         |

Push to `main` and Cloudflare Pages rebuilds the site.

## Deploy on Cloudflare Pages

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → this repository.
2. Framework preset: Next.js (Static HTML Export). Build command `npm run build`. Output directory `out`.
3. Environment variable `NODE_VERSION` = `22`.
4. Custom domains → add `indonepalrudrakshaorganisation.in` and `www`. If DNS moves to Cloudflare, copy every
   Google Workspace record (MX, SPF, DKIM, verification TXT) first, or email stops.

See `CLAUDE.md` for how the site is built and the rules to keep.
