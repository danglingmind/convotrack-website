# ConvoTrack — Website

Public marketing + legal site for **ConvoTrack**, the live group-ride tracking app.
Deployed at **convotrack.in**. No auth, no database — every page is static and public.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (design tokens in `app/globals.css`: dark base matched to the product videos, the app's lime as a single accent)
- No animation libraries: one CSS entrance on the hero; motion comes from the real product videos
  in `public/video/` (encoded from `convoy/design/ride-walkthrough` and `convoy/design/app-store-header`),
  played by `AutoVideo.tsx` only while on screen and never under reduced motion
- SEO: `robots.ts`, `sitemap.ts`, `manifest.ts`, generated OG image, JSON-LD (Organization, WebSite,
  MobileApplication, FAQPage) and `public/llms.txt` for AI assistants
- Product facts live in `lib/site.ts`; FAQ copy in `lib/faq.ts` (shared by the page and its structured data).
  Set `NEXT_PUBLIC_PLAY_LIVE=true` once the Play listing is public to turn on the Android button.

## Develop

```bash
npm run dev     # http://localhost:3000
npm run build   # production build (all pages prerender static)
npm start       # serve the production build
```

## Structure

```
app/
  layout.tsx            Root layout, fonts (Archivo + JetBrains Mono), metadata
  globals.css           Theme tokens + reusable utilities (mirrors ConvoTrackTheme.swift)
  page.tsx              Landing page (hero, features, how-it-works, roles, download)
  privacy/page.tsx      Privacy policy
  terms/page.tsx        Terms of service
  support/page.tsx      Support / FAQ
  components/
    Nav.tsx             Sticky nav + mobile drawer
    Footer.tsx          Site footer
    StoreButtons.tsx    App Store / Google Play buttons
    Phone.tsx           Phone frame around real app screenshots (public/screens)
    LinkFallback.tsx    Shared layout for /join and /route deep-link fallbacks
    PageShell.tsx       Shared shell for content pages
public/brand/mark.svg   Vector road mark (favicon source: app/icon.svg, app/favicon.ico)
```

## Theme

Colors and type mirror the app's `ConvoTrackTheme.swift`: dark-only, lime-green
(`#caf300`) brand accent, `#131313`/`#0e0e0e` surfaces, monospaced telemetry
labels. Tokens are defined once in `globals.css` under `@theme` and consumed as
Tailwind utilities (`bg-lime`, `text-on-surface`, `border-outline-variant`, …).

All motion respects `prefers-reduced-motion`.
