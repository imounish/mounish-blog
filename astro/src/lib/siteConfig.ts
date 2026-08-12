/**
 * Site configuration — ported from gatsby-config.js's siteMetadata block.
 * Used by SEO.astro to provide defaults for meta tags and structured data.
 */

export const siteConfig = {
  title: "mounish's blog",
  siteUrl: 'https://blog.mounish.dev',
  description:
    'A website where you can read articles, tutorials, and updates from Mounish as he dives into depths of imagination, weaves words into captivating stories.',
  og: {
    siteName: "mounish's blog - A personal blog",
    twitterCreator: '@imounish',
  },
} as const;
