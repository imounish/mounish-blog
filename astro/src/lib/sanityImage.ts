/**
 * Sanity image URL helper (T2).
 *
 * The current Gatsby app resolves cover images via
 * ../../../src/utils/getSanityImageData.js, which builds URLs directly
 * against Sanity's own image CDN (`?w=&h=&fmt=&q=` query params) rather than
 * running images through local Sharp transforms — `gatsby-plugin-image`'s
 * `getImageData()` is only used there as a wrapper to produce a
 * `gatsbyImageData`-shaped object around that CDN URL.
 *
 * `@sanity/image-url` is the direct Astro equivalent: it builds the same
 * kind of CDN URL from a GROQ-fetched `coverImage.asset` reference, without
 * needing `astro:assets`/Sharp at all.
 */
import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityClient } from 'sanity:client';
import type { SanityImageAssetRef } from './sanity';

const builder = createImageUrlBuilder(sanityClient);

export interface SanityImageDimensions {
  src: string;
  width: number;
  height: number;
}

/**
 * Build a CDN URL + intrinsic width/height pair for a `coverImage.asset`
 * reference fetched via GROQ (see `getBlogPostBySlug` in ./sanity.ts).
 *
 * Mirrors getSanityImageData.js's `?w=&h=&fmt=&q=` URL shape via
 * @sanity/image-url's fluent builder (`.width()`, `.height()`, `.auto('format')`,
 * `.quality()`).
 *
 * The returned `width`/`height` describe the actual rendered output size
 * (not just the source asset's dimensions): if only one of `width`/`height`
 * is requested, the other is derived from the source aspect ratio, matching
 * how Sanity's CDN itself scales the image when only one dimension is given.
 */
export function buildSanityImageUrl(
  asset: SanityImageAssetRef,
  { width, height, quality = 80 }: { width?: number; height?: number; quality?: number } = {}
): SanityImageDimensions {
  const sourceWidth = asset.metadata?.dimensions?.width ?? 0;
  const sourceHeight = asset.metadata?.dimensions?.height ?? 0;
  const aspect = sourceWidth && sourceHeight ? sourceWidth / sourceHeight : 1;

  let img = builder.image(asset).auto('format').quality(quality);
  if (width) img = img.width(width);
  if (height) img = img.height(height);

  let outWidth = width ?? sourceWidth;
  let outHeight = height ?? sourceHeight;
  if (width && !height) outHeight = Math.round(width / aspect);
  if (height && !width) outWidth = Math.round(height * aspect);

  return {
    src: img.url(),
    width: outWidth,
    height: outHeight,
  };
}
