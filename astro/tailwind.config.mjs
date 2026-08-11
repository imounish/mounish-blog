/** @type {import('tailwindcss').Config} */

// T3: ported from the Gatsby app's `tailwind.config.js` `theme` block as-is —
// fonts/colors are framework-agnostic and unaffected by the Gatsby->Astro move.
//
// Two differences from the Gatsby original, both required by Tailwind v4
// (this Astro app was scaffolded in T1 on Tailwind v4 + `@tailwindcss/vite`,
// not the v3/PostCSS setup Gatsby uses):
//   1. `darkMode: 'class'` is *not* set here — Tailwind v4 doesn't read that
//      key from a JS config at all (class-based dark mode is now a CSS-level
//      concern). The equivalent lives in `src/styles/global.css` as
//      `@custom-variant dark (&:where(.dark, .dark *));`, which reproduces
//      the same "ancestor with a literal `.dark` class" behavior.
//   2. `withMT()` is dropped — see the T3 report for the
//      keep-vs-drop decision on `@material-tailwind/react`. This file only
//      needs to carry the fonts/colors that were previously wrapped by it.
//
// This file is wired in via the `@config` directive in `global.css` so the
// custom-font-family/color tokens below still generate real utility classes
// (`font-worksans`, `text-custom-red`, etc.) under Tailwind v4's CSS-first
// engine, without duplicating them into a `@theme` block.
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
  ],
  theme: {
    fontFamily: {
      worksans: ['work-sans', 'sans-serif'],
      warnock: ['warnock', 'serif'],
      warnockdisp: ['warnock-disp', 'serif'],
      warnockcapt: ['warnock-capt', 'serif'],
      warnocksubh: ['warnock-subh', 'serif'],
      lora: ['lora', 'serif'],
      courier: ['courier-prime', 'monospace'],
    },
    extend: {
      colors: {
        'custom-red': '#b83854',
      },
    },
  },
  plugins: [],
};
