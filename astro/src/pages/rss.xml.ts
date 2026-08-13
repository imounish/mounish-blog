// T10: RSS feed. `gatsby-plugin-feed` was listed as a dependency in the
// Gatsby app's package.json but its config block in gatsby-config.js was
// always commented out — the live site has never actually shipped a feed.
// This is a net-new capability, not a port, so there's no prior Gatsby
// output shape to match beyond the site's own title/description
// (siteConfig.ts, ported from gatsby-config.js's siteMetadata) and the same
// post data T7's listing pages already query via lib/sanity.ts.
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getRssFeedItems } from '../lib/sanity';
import { renderExcerptPlainText } from '../lib/portableText';
import { siteConfig } from '../lib/siteConfig';

export async function GET(context: APIContext) {
  const posts = await getRssFeedItems();

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site ?? siteConfig.siteUrl,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.publishedAt),
      link: `/posts/${post.slug.current}/`,
      // Plain-text rendering of the same excerpt ExcerptText.astro shows on
      // the single-post page (lib/portableText.tsx) — feed readers vary in
      // how much HTML they render in <description>, so plain text is the
      // safest choice here.
      description: renderExcerptPlainText(post._rawExcerpt) || undefined,
    })),
    customData: `<language>en</language>`,
  });
}
