# T5 — SEO component port + JSON-LD structured data

**Priority:** P1
**Depends on:** T2, T3
**Tracker:** [00-tracker.md](00-tracker.md)

## Goal

Port the existing meta-tag logic to Astro, and add the JSON-LD structured data (`Article`/`BlogPosting`) that's currently missing entirely — this is a real, currently-open SEO gap identified in the tech-stack analysis, and cheap to close while every page's head is being rebuilt anyway.

## Current state

- `src/components/seo/SEO.jsx`: builds `<title>`, `description`, OG tags (`og:image`, `og:image:width/height`, `og:type`, `og:title`, `og:description`, `og:site_name`, `og:url`), Twitter tags (`twitter:card`, `twitter:description`, `twitter:title`, `twitter:image`, `twitter:creator`), a `robots` meta tag, and the favicon/manifest links (covered separately in T4). It takes `title`, `description`, `featuredImage` props, falls back to `site.siteMetadata` (from `gatsby-config.js`) and a default OG image (`src/images/banner.png`) when not provided.
- `src/templates/single-blog-post.jsx`'s `Head` export shows the calling convention: `<SEO title={data.sanityBlog.title} description={data.sanityBlog.subTitle} featuredImage={data.sanityBlog.coverImage.asset.gatsbyImageData} />`.
- `gatsby-config.js`'s `siteMetadata` block holds the site-wide defaults: `title`, `siteUrl`, `description`, `og.siteName`, `og.twitterCreator`.
- No JSON-LD exists anywhere in the current codebase.

## Steps

1. Build an Astro equivalent of `SEO.jsx` — likely a `.astro` component or a shared partial included in `Layout.astro`'s `<head>`, taking the same `title`/`description`/`featuredImage` inputs. Move the `siteMetadata` defaults (title, siteUrl, description, OG site name, Twitter creator) into an Astro config/constants file as the equivalent of `gatsby-config.js`'s `siteMetadata`.
2. Reproduce every meta tag from the current component exactly — this is a direct port, not a redesign; nothing about the current OG/Twitter setup is broken, it just needs a new host component.
3. Add JSON-LD: for single blog posts, emit a `BlogPosting` (or `Article`) schema block with `headline`, `datePublished` (from `publishedAt`), `image`, `author` (`name`), and the canonical URL. Use `<script type="application/ld+json">` with `set:html` (Astro's escape-safe way to inject a JSON string into the DOM) rather than string-interpolating raw HTML.
4. For non-post pages (homepage, category/author listing pages), a simpler `WebSite`/`CollectionPage` schema is optional — prioritize getting `BlogPosting` right on post pages first, since that's where rich-result eligibility actually matters for a blog.

## Netlify / config notes

None specific to this task.

## Definition of done

- [ ] Every page on the branch-preview site has the same `<title>`/meta/OG/Twitter tags it has today (spot-check a few pages' rendered `<head>` against the live site).
- [ ] Blog post pages emit valid JSON-LD `BlogPosting` structured data.
- [ ] Google's [Rich Results Test](https://search.google.com/test/rich-results) (or an equivalent JSON-LD validator) passes with no errors against a branch-preview post URL once one exists (T6) — this check can be deferred until T6 is done, but the JSON-LD template itself should be finished here.
- [ ] No automated tests required.
