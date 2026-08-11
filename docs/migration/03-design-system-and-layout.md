# T3 — Design system & shared layout

**Priority:** P0
**Depends on:** T1
**Tracker:** [00-tracker.md](00-tracker.md)

## Goal

Port the shared visual foundation — Tailwind config, fonts, global CSS, the page layout wrapper, dark-mode handling, and analytics — so every page/template built afterward has consistent chrome and styling to sit inside.

## Current state

- `tailwind.config.js` (repo root): `darkMode: 'class'`, custom font families (`worksans`, `warnock` + variants, `lora`, `courier`, served from local `@fontsource`/static font files), custom brand colors (`custom-red`, `brand`, `brand-teal`), wrapped in `withMT()` for Material Tailwind.
- `src/styles/global.css`: global styles, imported in `gatsby-browser.jsx`.
- `src/components/layout/Layout.jsx` (+ `Layout.module.css`): wraps every page via `wrapPageElement` in both `gatsby-browser.jsx` and `gatsby-ssr.jsx` — this is where header/footer/global chrome lives.
- `gatsby-ssr.jsx`: injects an inline pre-body `<script>` that reads `localStorage.theme`, falling back to `prefers-color-scheme`, and adds `.light`/`.dark` to `<body>` **before** hydration — this is what avoids a flash of the wrong theme. `src/utils/themeLocalStorage.js` holds the persistence helpers.
- `src/components/theme/ThemeToggle.jsx` (+ `.module.css`): the toggle UI — this is one of the few components that genuinely needs client-side interactivity.
- `gatsby-config.js`'s `gatsby-plugin-google-gtag` block: GA4 tracking IDs, `head: true`, `respectDNT: true`, and an `exclude` list (`/preview/**`, `/do-not-track/me/too/`). A `public/~partytown/` directory in the current build output indicates the plugin already offloads GA to a web worker via Partytown.
- `src/components/header/`, `src/components/footer/`, `src/components/logo/`, `src/constants/menu.js`, `src/constants/social.jsx` — the nav/footer content Layout assembles.

## Steps

1. Copy `tailwind.config.js`'s `theme` block (fonts, colors) into `/astro/tailwind.config.mjs` as-is — it's framework-agnostic. Decide here whether to keep `@material-tailwind/react` (`withMT()`) or drop it per the earlier analysis's suggestion to hand-roll the handful of primitives actually used — this decision affects every later component task, so make it once, here, not per-component later.
2. Copy the font files (`@fontsource` imports or the static font files under `static/fonts`) and `src/styles/global.css` into the Astro project, importing global CSS in a root layout.
3. Build `/astro/src/layouts/Layout.astro` as the equivalent of `src/components/layout/Layout.jsx` — header, footer, and the `<slot />` for page content. Port `src/components/header/`, `src/components/footer/`, `src/components/logo/`, `menu.js`, and `social.jsx` as needed; these are presentational and should port with light adaptation.
4. Port the dark-mode pre-hydration script into `Layout.astro`'s `<head>` as an inline `<script is:inline>` — Astro supports the exact same "block before paint" pattern `gatsby-ssr.jsx` uses today. Port `themeLocalStorage.js`'s logic unchanged.
5. Build `ThemeToggle` as a hydrated island (`client:load` or `client:idle`) — it's genuinely interactive and needs to run in the browser.
6. Add the Google Analytics script tag to `Layout.astro`'s head, preserving the `respectDNT` and `exclude` behavior as closely as makes sense for Astro's routing (there's no direct plugin equivalent, so this is likely a small custom script + conditional). If keeping GA off the main thread matters, add `@astrojs/partytown` as the direct equivalent of the current Partytown-backed setup.

## Netlify / config notes

None specific to this task — no new env vars or Netlify config beyond what T1 already set up.

## Definition of done

- [ ] `/astro`'s Tailwind config matches the current fonts/colors/dark-mode strategy.
- [ ] A shared `Layout.astro` renders header/footer/nav consistently across pages.
- [ ] Loading the branch-preview site in dark mode (OS-level or via the toggle) shows no flash of the wrong theme on load.
- [ ] `ThemeToggle` works as an island and persists the choice the same way `themeLocalStorage.js` does today.
- [ ] GA fires on the branch-preview site (verify via GA's realtime view or browser network tab), respecting DNT the same way as before.
- [ ] No automated tests required — verify visually against the live Gatsby site, side by side, in both light and dark mode.
