# Tech stack assessment & migration analysis

**Date:** 2026-08-11
**Scope:** Gatsby 5 + Sanity + Netlify + Mailchimp, evaluated for speed, weight, writing UX, SEO, cost, and email/subscriber reach.

## Executive summary

The current stack (Gatsby 5, Sanity, Netlify, Netlify Function → Mailchimp) is competently built — image optimization, dark-mode handling, and OG/Twitter meta are all done correctly — but it's built on a framework that is now effectively in maintenance mode, and it's leaving real distribution/SEO value on the table for free (RSS is installed but disabled; there's no structured data; Mailchimp's free tier no longer fits a growing list). **Recommended target: Astro + Sanity (kept as-is, via Astro's official native integration) + Kit for email, with RSS and JSON-LD turned on.** This keeps the highest-risk, highest-effort part of the stack — the content model and editorial workflow in Sanity — completely untouched, while replacing the framework layer that is actually the source of the maintenance risk and JS-weight problem. Hosting (Netlify vs Cloudflare Pages) and CMS (Sanity vs git-based) are separable decisions with lower stakes, covered below. A handful of "quick wins" are worth doing this week regardless of any migration timeline.

## Current stack scorecard

Grounded in this repo, not generic framework claims:

| Axis | Assessment | Evidence |
|---|---|---|
| **Speed (built site)** | Good baseline, undermined by client JS | `gatsby-plugin-image` gives responsive/lazy images; but Material Tailwind, 4 separate `flexsearch` indices, and Google Analytics all ship as client JS on a content site that could be near-static |
| **Lightweight** | Middling | Same as above — `@material-tailwind/react`, `lozad` (redundant with `gatsby-plugin-image`'s own lazy loading), and 4 bundled search indices add up |
| **Writing experience** | Genuinely good today | Sanity Studio gives a real-time, structured editing UI with references between blog/author/category/tag — not something to give up lightly |
| **SEO** | Solid meta, missing structured data | `SEO.jsx` correctly sets OG/Twitter tags, canonical-ish `robots` meta, and a sitemap ships via `gatsby-plugin-sitemap` — but there's no JSON-LD `Article`/`BlogPosting` schema, so the site isn't eligible for rich results |
| **Cost** | Currently $0 | Netlify free tier + Sanity free tier + Mailchimp free tier |
| **Email/subscriber reach** | Functional but capped, and RSS is silently off | Signup form → first-party Netlify Function → Mailchimp is a clean, portable pattern, but Mailchimp's free plan now caps at 250 contacts/500 sends per month. Separately, `gatsby-plugin-feed` is installed in `package.json` but **commented out** in `gatsby-config.js` — no RSS/Atom feed ships today at all |
| **Maintenance risk** | Real, already experienced | `300b173 Fix Node 24 compatibility: override msgpackr and ordered-binary` — this is not a hypothetical risk, it already happened |

## Framework alternatives

| | Gatsby (current) | Astro | Next.js (static export) | Eleventy |
|---|---|---|---|---|
| Shipped JS by default | Full React hydration | ~0 KB — islands hydrate only where opted in | ~70–90 KB hydration runtime before app code | ~0 KB — no framework runtime |
| Build model | GraphQL data layer + plugins | Content Collections/Loaders | React Server Components / static export | Template engine, no data layer |
| Maintenance trajectory | Core team largely gone since the 2023 Netlify acquisition; plugin ecosystem widely unmaintained; "maintenance mode at best" | Fastest-growing SSG for content sites; actively developed | Actively developed, but optimized for app-shaped products, not blogs | Actively developed, minimal-surface tool |
| Fit for this repo | — | React components port over almost as-is as islands; Tailwind config is framework-agnostic | Would still need most components rewritten for App Router conventions | Would require rewriting every React component (`BlogGrid`, `SearchModal`, `ThemeToggle`, etc.) in a template language |

Gatsby's maintenance status isn't a vague worry — it's the consensus read of its post-acquisition trajectory, and this repo already hit a real symptom of it (the Node 24 compatibility patch). For a blog whose stated priorities are speed and low weight, Astro is the standout: it ships zero JS by default and only hydrates the handful of components that actually need interactivity (theme toggle, search modal, newsletter form), which is a direct, structural fix for the current bundle-weight problem — not just a tuning exercise.

Eleventy is technically leaner still and builds faster, but it means rewriting the entire component layer in a template language instead of JSX, which is a substantially bigger rewrite for no proportional gain given this codebase is already React/Tailwind. Next.js static export is the wrong tool here — its strengths (Server Components, dynamic rendering, app-shaped routing) aren't needed by a content blog and it ships more JS by default than Astro for the same content.

**What survives a Gatsby → Astro migration from this repo:** Tailwind config and design tokens as-is; almost all presentational components (`src/components/blogs/*`, `src/components/typography/*`, `src/components/partials/*`, etc.) with light adaptation; the Sanity content model and schema entirely unchanged.
**What has to be rewritten:** `gatsby-node.js`'s programmatic `createPage` logic → Astro Content Collections/loaders with `getStaticPaths`; GraphQL queries → GROQ or the Sanity client; `SEO.jsx`'s `useStaticQuery`/Head pattern → Astro's `<head>`/frontmatter pattern; the 4-index `flexsearch` setup is worth replacing outright with [Pagefind](https://pagefind.app) (a build-time static search index built for exactly this use case, with effectively zero runtime JS cost) rather than porting it as-is.

## CMS / authoring alternatives

| | Sanity (current) | Keystatic / TinaCMS / Decap (git-based) | Payload (self-hosted) |
|---|---|---|---|
| Editing UI | Polished, real-time, structured references | Keystatic has the cleanest Astro integration; TinaCMS adds true in-context visual editing (via a paid Tina Cloud tier); Decap is most battle-tested but its UI has aged | Full admin UI, self-hosted |
| Cost at this scale | Free (100K API requests/mo, 10 GB bandwidth, 2 datasets) | Free (content lives in the git repo) | Free software; you pay for hosting/DB |
| Fits current content model | Yes — author/category/tag relations are already Sanity references | Would require re-modeling relational content (author/category/tag) as flat frontmatter/markdown | Would require full schema + data migration |
| Astro compatibility | Official native integration (`@sanity/astro`), including real-time preview | Keystatic built specifically for this; Tina/Decap also supported | Works, more setup |

Sanity's free tier (100K requests/mo, 10 GB bandwidth) is not something this blog is close to outgrowing, and Astro has an official, actively-maintained Sanity integration — so **keeping Sanity is the pragmatic choice**, not just inertia. It avoids a real content-migration project (exporting existing Portable Text posts and re-modeling author/category/tag relationships as flat files) in exchange for a "simplification" that mostly trades a good editing UI for a code-editor workflow. If the priority shifts later toward eliminating all third-party dependencies entirely, **Keystatic** is the correct git-based pick given the Astro direction — it has the most polished editing UI of the git-based options and the tightest Astro integration, though it is the smallest community of the three.

## Hosting comparison

| | Netlify (current) | Cloudflare Pages | Vercel |
|---|---|---|---|
| Free bandwidth | 100 GB/mo | **Unlimited** | 100 GB/mo |
| Free build allowance | 300 min/mo | 500 builds/mo | — |
| Serverless functions on free tier | Yes (already in use for newsletter signup) | Via Workers runtime — free allowance reported as 100K requests/day, but sources disagreed on whether Pages Functions are bundled into the free tier or gated to paid plans; **verify current terms directly before committing**, since this affects the newsletter-signup function specifically | Yes |
| Migration effort from current setup | None | Low — static output deploys the same way; only the one serverless function needs porting | Low |

Cloudflare's unlimited free bandwidth is a genuine structural advantage for an image-heavy blog and the strongest "stay free forever" bet of the three. That said, at this blog's current traffic, Netlify's 100 GB/mo free cap is very unlikely to bind — hosting can be treated as a separable decision from the framework migration. **Practical recommendation:** don't couple the hosting move to the Astro migration; ship Astro on Netlify first (zero hosting-layer change, lowest total migration risk), then evaluate Cloudflare Pages once real traffic/bandwidth numbers exist, confirming Pages Functions' free-tier terms hands-on before relying on them for the signup function.

## Email / subscriber reach

| | Mailchimp (current) | Kit (formerly ConvertKit) | beehiiv | Buttondown | Resend | listmonk (self-hosted) |
|---|---|---|---|---|---|---|
| Free tier | 250 contacts / 500 sends per month | **10,000 subscribers**, full features | 2,500 subscribers, unlimited sends | 100 subscribers | Not a broadcast tool — $49/mo at 1,000 subscribers | Free software; ~$8/mo infra (Fly.io + AWS SES) |
| Fit | Already cramped, and shrinking | Best free ceiling by a wide margin | Also very generous, includes its own publishing platform (out of scope here since the custom blog stays) | Worse than Mailchimp now | Priced for transactional/product email, not newsletters | Most control, but breaks the "stay free" requirement and adds real ops burden |
| Migration effort | — | Low — swap the Mailchimp API call inside the existing `netlify/functions/subscribe-user` function for Kit's API; the frontend form and serverless-function architecture don't change | Same pattern, low effort | Same pattern, but free tier too small to be worth it | Not a fit at any list size for a broadcast newsletter | Meaningfully higher effort (server, SMTP relay, ops) |

Mailchimp's free plan has been cut to 250 contacts, which is a real ceiling for a growing blog. **Kit's free tier (10,000 subscribers, full features)** is the clear replacement — and because the signup flow already goes through a first-party serverless function rather than a vendor embed, switching providers means rewriting one function, not the frontend or the architecture. This is worth doing independent of any framework decision.

Separately: **RSS is a zero-cost second reach channel that's already half-wired.** `gatsby-plugin-feed` is an installed dependency, just commented out in `gatsby-config.js`. Re-enabling it (or, post-Astro-migration, using `@astrojs/rss`) costs nothing and reaches readers who prefer feed readers over email/algorithmic discovery.

## Recommended target stack

**Primary recommendation: Astro + Sanity (unchanged) + Kit + RSS + JSON-LD, hosted on Netlify initially.**

- **Migration effort: Medium.** The content layer (the highest-risk, highest-effort part of any CMS-attached blog migration) doesn't move at all. The actual work is: rewriting `gatsby-node.js`'s page-generation as Astro Content Collections/`getStaticPaths`; converting GraphQL queries to GROQ/Sanity-client calls; converting components to Astro components, deciding per-component whether it needs to be a hydrated island (theme toggle, search, newsletter form, mobile nav) or can ship as zero-JS static markup (most blog-listing, typography, and layout components); replacing the 4-index `flexsearch` setup with Pagefind; and porting `SEO.jsx` to Astro's head pattern. For a site of this size (6 templates, ~15 component groups), this is realistically a solo weekend-to-two-weeks effort depending on how much visual polish is preserved exactly vs. rebuilt.
- **Risk:** Low on the content/CMS side (nothing changes), medium on the "does the new site look and behave identically" side (normal for any framework swap) — mitigated by porting templates one at a time and diffing against the live site.

**Lower-effort alternative if a full migration isn't the right move right now:** stay on Gatsby, but do the Quick Wins below, and treat this as a deliberate stopgap rather than a destination — it doesn't address the underlying maintenance-risk or JS-weight ceiling, both of which are structural to Gatsby, not tunable.

## Quick wins (do regardless of any migration decision)

1. **Re-enable `gatsby-plugin-feed`** in `gatsby-config.js` — it's already a dependency, just commented out. Near-zero effort, immediate second distribution channel.
2. **Switch the newsletter backend from Mailchimp to Kit** inside `netlify/functions/subscribe-user` — the free-tier ceiling (250 vs. 10,000 contacts) makes this urgent regardless of framework plans; the frontend and function architecture don't need to change.
3. **Add JSON-LD `Article`/`BlogPosting` structured data** to `SEO.jsx` — closes a real, currently-missing SEO gap for very little code.
4. **Evaluate dropping `@material-tailwind/react`** in favor of hand-rolled Tailwind components for the handful of UI primitives actually used (modals, buttons) — cuts a full component-library dependency from the bundle.
5. **Consider Pagefind over the 4 bundled `flexsearch` indices** even if staying on Gatsby — it moves search indexing to build time and out of the client bundle entirely.

## References

- [Netlify Announces the Evolution of Cloud Platform](https://www.netlify.com/blog/gatsby-cloud-evolution/)
- [Is Gatsby.js dead and is this the end for them?](https://ikius.com/blog/end-of-gatsbyjs)
- [Is Gatsby.js Still Worth Using in 2026? — Robin Wieruch](https://www.robinwieruch.de/react-gatsby-js/)
- [Is GatsbyJS Officially Dead? — gatsbyjs/gatsby Discussion #39062](https://github.com/gatsbyjs/gatsby/discussions/39062)
- [Astro vs Next.js vs Eleventy: Framework Comparison 2026](https://www.index.dev/skill-vs-skill/astro-vs-nextjs-vs-eleventy)
- [Static Site Generators in 2026: Astro vs Hugo vs Next.js vs Eleventy vs Gatsby](https://aileapers.com/articles/42-static-site-generators-2026-comparison.html)
- [Keystatic CMS Review 2026 — Lucky Media](https://www.luckymedia.dev/insights/keystatic)
- [Keystatic vs TinaCMS — Lucky Media](https://www.luckymedia.dev/compare/keystatic-vs-tina-cms)
- [Decap CMS vs TinaCMS — Lucky Media](https://www.luckymedia.dev/compare/decap-cms-vs-tina-cms)
- [Headless CMS 2026: Sanity vs Contentful vs Payload](https://www.digitalapplied.com/blog/headless-cms-2026-sanity-contentful-payload-comparison)
- [Sanity CMS Pricing 2026: Free Plan Limits, Growth Cost](https://nayankyada.com/blog/sanity-cms-pricing-in-2026-free-plan-growth-and-when-you-need-enterprise)
- [Vercel vs Netlify vs Cloudflare Pages, 2026 Real Test](https://blog.vibecoder.me/vercel-vs-netlify-vs-cloudflare-pages)
- [We Hosted the Same Site on All 4 Free Hosts in 2026 — Pressless](https://pressless.io/blog/host-website-free-2026)
- [Complete Guide to Cloudflare Free Tier Resources — AI Dev Hub](https://aidevhub.net/blog/cloudflare-free-tier-complete-guide)
- [Navigating Mailchimp's New Free Limits — beehiiv Blog](https://www.beehiiv.com/blog/navigating-mailchimp-s-new-free-limits-essential-updates-for-newsletter-owners)
- [Mailchimp's Free Plan Got Worse: 7 Better Options (2026)](https://blog.groupmail.io/mailchimp-free-plan-alternatives-2026/)
- [Plan types and subscriber plan tier pricing — beehiiv Help](https://www.beehiiv.com/support/article/23874462928663)
- [I Run My Newsletter for $8/mo — Suganthan](https://suganthan.com/blog/newsletter-cost-at-scale/)
- [Listmonk for Mail Campaigns: 2026 Review + Pricing](https://woodpecker.co/blog/listmonk/)
- [Enterprise Astro CMS — Sanity](https://www.sanity.io/astro-cms)
- [Best Headless CMS for Astro (2026) — StackPicker](https://www.stackpicker.dev/guides/astro/cms/)
