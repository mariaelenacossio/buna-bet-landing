# Buna Bet

Landing page for Buna Bet (ቡና ቤት, "the coffee place"), an Ethiopian coffee brand
launching in Vancouver, BC.

Two live services: **wholesale beans** (signature roast: Abol) and a **mobile
coffee cart** for events, markets, and offices. A café is not part of this phase
and the page says so explicitly.

## Tech stack

| | |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| Motion | Framer Motion 11 |
| Forms | Web3Forms (no backend) |
| Hosting | Vercel (not yet configured) |

## Local setup

```bash
npm install
cp .env.example .env.local   # then paste your Web3Forms key in
npm run dev
```

Runs on http://localhost:3000.

The page renders fine without the env var. Only form submission needs it: with
no key set, the form validates normally and then tells the visitor to use the
mailto link instead of failing silently.

## Environment variables

| Variable | Required | What it is |
|---|---|---|
| `NEXT_PUBLIC_FORM_ENDPOINT` | For form submission | Web3Forms access key |

Get a key at [web3forms.com](https://web3forms.com): enter the destination inbox
(`hello@bunabet.com`), and the key arrives by email. No account needed.

Despite the name, this holds an access **key**, not a URL. The POST target is a
constant in `components/BookingForm.tsx`. The variable is named this way to match
the project spec. `NEXT_PUBLIC_` exposure is correct here: the key is a
submission token, not a secret.

## Brand system

Tokens are defined in two places that must stay in sync:

- `tailwind.config.ts` for utility classes (`bg-basalt`, `text-cherry`)
- `app/globals.css` for CSS custom properties (`var(--cherry)`)

| Token | Hex | Use |
|---|---|---|
| `basalt` | `#1A1512` | Primary dark background |
| `cherry` | `#A23B2E` | Primary accent |
| `qibe` | `#C89B3C` | Secondary accent |
| `forest` | `#2F4A3C` | Tertiary accent |
| `sand` | `#EDE3D0` | Light background |
| `charcoal` | `#241C16` | Body text on light |
| `paper` | `#F7F1E4` | Off-white background |

**Two pairings fail WCAG AA and must not be used.** Measured ratios and the full
matrix are commented at the top of `app/globals.css`.

- `cherry` on `basalt` is 2.8:1, so never use cherry for text on dark
- `qibe` on `sand` is 2.0:1, so never use qibe for text on light

Type: **Fraunces** (display, italic), **IBM Plex Sans** (body), **IBM Plex Mono**
(eyebrows, labels, origin details). **Noto Sans Ethiopic** carries the Amharic
strings, because neither Fraunces nor IBM Plex ships Ethiopic glyphs.

## Swapping in real assets

Everything below is a marked placeholder. Each is a single-point change.

| What | Where |
|---|---|
| Logo mark | `components/BunaBadge.tsx`, an SVG interlace approximation. Replace the internals and every usage updates at once. |
| Gallery photos | `components/Gallery.tsx`, tinted blocks. Alt text is already written for the real photos and carries over. |
| Abol product shot | `components/MeetAbol.tsx` |
| Abol origin data | `components/MeetAbol.tsx`, in `ABOL_SPECS` and `TASTING_NOTES`. Yirgacheffe, process, altitude, and notes are all placeholders. |
| Social links | `components/Footer.tsx`, in `SOCIALS`, all `href: "#"` |
| Contact email | `hello@bunabet.com` in `BookingForm.tsx` and `Footer.tsx` |

## Deployment

Vercel-ready as-is, with no configuration needed beyond the env var.

1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Add `NEXT_PUBLIC_FORM_ENDPOINT` under Settings > Environment Variables
3. Deploy

A custom domain will be attached later and is deliberately not configured yet.
Add `metadataBase` and an OG image in `app/layout.tsx` once the domain is known.

## Notes

Booking review is manual, so there is no scheduling tool wired in. Every cart
request needs a person to check the date anyway. If that stops scaling, there is
a marked slot in `components/BookingForm.tsx` where a Cal.com or Calendly embed
drops in as a third option, alongside the form and the mailto link rather than
replacing them.
