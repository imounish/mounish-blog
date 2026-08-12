# T6 — Single blog post template

**Priority:** P1
**Depends on:** T2, T3, T5
**Tracker:** [00-tracker.md](00-tracker.md)

## Goal

Build the `/posts/:slug` page. This is deliberately the **first** real content template tackled (before the listing pages in T7) because it's the highest-risk page in the whole migration — it's where the Portable Text rendering strategy and the Sanity image pipeline get proven for the first time. Once this works, T7/T8/T9 are largely repeating a pattern that already works rather than solving new problems.

## Current state

- `src/templates/single-blog-post.jsx` (+ `single-blog-post.module.css`): the full current implementation. Renders, in order: `SEO` (title only in the body query, full SEO via the separate `Head` export), a `ProgressBar`, `PostHeadingSection` (title/subtitle/publishedAt/timeToRead), a `GatsbyImage` cover image, `CategoryCatalogue`, `ExcerptText` (renders `_rawExcerpt`), `RichText` (renders `_rawBody` via `@portabletext/react`), a tags/social-share row (`TagsArray`, `socialShareLinks` from `src/components/social/SocialShareButtons`), an author byline, and a `NewsletterSection` at the bottom.
- `src/components/typography/RichText.jsx`: wraps `@portabletext/react`'s `PortableText` component — this is pure render-to-markup with no interactivity, and should render at Astro build time with **zero client JS** (no `client:*` directive), same for any syntax-highlighting block type it renders via `react-syntax-highlighter`.
- Image handling: per T2, cover images resolve via `@sanity/image-url` (not `astro:assets`), building on the same CDN-URL approach `src/utils/getSanityImageData.js` uses today. Explicit `width`/`height` should be set on the rendered `<img>` to prevent layout shift, matching what the current `GatsbyImage` component does implicitly.
- Other components used: `Break`, `Container`, `MarginedContainer`, `ScrollToTop`, `Section`/`SectionTop`/`SectionMiddle`/`SectionBottom` (`src/components/partials/`), `ExcerptText` (`src/components/typography/`).

## Steps

1. Build `/astro/src/pages/posts/[slug].astro` using `getStaticPaths` sourced from the GROQ blog-list query from T2 (mirrors `gatsby-node.js`'s `blogs.forEach` → `createPage({ path: '/posts/${slug}' ... })` loop).
2. Fetch the single-post GROQ query (built in T2) for the matched slug and pass its fields into the template.
3. Port `PostHeadingSection`, `CategoryCatalogue`, `ExcerptText`, `TagsArray`, the author byline block, and the layout partials (`Container`, `MarginedContainer`, `Section*`) as Astro components — these are presentational, no interactivity, straightforward ports.
4. Render the cover image via `@sanity/image-url`, with explicit `width`/`height` attributes.
5. Render `_rawBody`/`_rawExcerpt` through Portable Text at build time — port `RichText.jsx`'s custom mark/block renderers (if any beyond the default) to Astro's version of the same component library, keeping code-block syntax highlighting build-time as well.
6. Decide what, if anything, in the social-share row needs to be a hydrated island — plain `<a href="...">` share links need no JS at all; only add `client:*` if `react-share`'s components require actual click handlers beyond navigation.
7. Wire the `NewsletterSection` in as a static include for now; its actual form behavior is finished in T12 — don't block this task on that.
8. Confirm T5's JSON-LD renders correctly on a real post now that real data exists, and run it through a structured-data validator.

## Netlify / config notes

None specific beyond what T1–T3 already established.

## Definition of done

- [x] A real blog post renders at `/posts/:slug` on the branch-preview site with visual/structural parity to the same post on the live Gatsby site (heading, cover image, category, tags, author byline, body content, social share row).
- [x] Portable Text (including any code blocks) renders correctly with zero added client JS for that content (verify via browser dev tools — no JS bundle should be attributable to the rendered body content itself).
- [x] Cover image loads with correct dimensions and no visible layout shift.
- [x] JSON-LD from T5 validates against a real post.
- [x] No automated tests required — verify by comparing 2–3 real posts (including at least one with a code block, if any exist) side by side with the live site.
