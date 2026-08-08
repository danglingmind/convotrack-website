# ConvoTrack — Website

Public marketing + legal site for **ConvoTrack**, the live group-ride tracking app.
Deployed at **convotrack.in**. No auth, no database — every page is static and public.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (theme tokens in `app/globals.css` mirror the iOS app palette)
- **three.js** — animated hero route/convoy scene (`app/components/RouteScene.tsx`)
- **GSAP + ScrollTrigger** — scroll reveals, count-ups, split headlines (`app/components/ScrollFX.tsx`)

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
    RouteScene.tsx      three.js hero background (raw WebGL, no R3F)
    ScrollFX.tsx        GSAP scroll controller
    PageShell.tsx       Shared shell for content pages
public/brand/           Logo + app icon (copied from the iOS app assets)
```

## Theme

Colors and type mirror the app's `ConvoTrackTheme.swift`: dark-only, lime-green
(`#caf300`) brand accent, `#131313`/`#0e0e0e` surfaces, monospaced telemetry
labels. Tokens are defined once in `globals.css` under `@theme` and consumed as
Tailwind utilities (`bg-lime`, `text-on-surface`, `border-outline-variant`, …).

All motion respects `prefers-reduced-motion`.
