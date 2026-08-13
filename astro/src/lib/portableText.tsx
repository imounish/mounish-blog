/**
 * Portable Text rendering (T6) — Astro equivalent of:
 *   - src/components/typography/RichText.jsx  (renders `_rawBody`)
 *   - src/components/typography/ExcerptText.jsx (renders `_rawExcerpt`)
 *   - src/components/typography/DescriptionText.jsx (renders category
 *     `_rawDescription`, used by CategoryCatalogue)
 *
 * Rendering strategy: reuse `@portabletext/react`'s component-override API
 * (same shape Gatsby already uses, so the custom mark/block/type renderers
 * below are near-verbatim ports) but call `ReactDOMServer.renderToStaticMarkup`
 * on it *inside Astro frontmatter* (which runs in Node at build time) instead
 * of rendering it as a React tree in the browser. The result is a plain HTML
 * string dropped in with `<Fragment set:html={...} />` — no `client:*`
 * directive anywhere, so zero JS ships to the browser for this content,
 * matching the task's "build-time, zero client JS" requirement while still
 * reusing @portabletext/react per the task brief.
 */
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { tryGetImageDimensions, tryGetFileAsset } from '@sanity/asset-utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// eslint-disable-next-line import/no-unresolved -- deep import matches RichText.jsx
import vsDark from 'react-syntax-highlighter/dist/esm/styles/prism/vs-dark';
import { buildInlineImageUrl } from './sanityImage';
import { sanityAssetConfig } from './sanityAssetConfig';

function tryGetVideoUrl(assetRef: unknown): { url: string; extension: string } | null {
  const asset = tryGetFileAsset(assetRef as never, sanityAssetConfig);
  if (!asset?.url) return null;
  return { url: asset.url, extension: asset.extension ?? 'webm' };
}

// ---------------------------------------------------------------------------
// Body renderer (_rawBody) — ports RichText.jsx's `richTextComponents`.
// ---------------------------------------------------------------------------

const richTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="font-warnock py-4 text-xl text-justify text-gray-900 dark:text-gray-200">
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-warnockdisp pb-2 pt-10 text-4xl font-bold text-gray-900 dark:text-gray-100 lg:text-5xl">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-warnockdisp pb-2 pt-8 text-3xl font-semibold text-gray-900 dark:text-gray-100 lg:text-4xl">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="font-warnockdisp pb-2 pt-6 text-2xl font-medium text-gray-900 dark:text-gray-100 lg:text-3xl">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <div className="font-warnockcapt border-y-blue-gray-300 dark:border-y-blue-gray-700 my-5 border-y-[1px] px-12 py-6 text-center text-xl font-light text-gray-600 dark:text-gray-400">
        <blockquote>{children}</blockquote>
      </div>
    ),
  },
  marks: {
    link: ({ value, children }: any) => {
      const href = value?.href || '';
      const isExternal = href.startsWith('http');
      return (
        <a
          className="underline underline-offset-2 hover:text-gray-800 dark:text-gray-300"
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noindex nofollow' : undefined}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="font-warnock list-outside list-disc px-6 py-4 text-lg text-justify text-gray-900 dark:text-gray-200 md:text-xl lg:px-10">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="font-warnock list-outside list-decimal px-6 py-4 text-lg text-justify text-gray-900 dark:text-gray-200 md:text-xl lg:px-10">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="pl-2">{children}</li>,
    number: ({ children }: any) => <li className="pl-2">{children}</li>,
  },
  types: {
    customBreak: ({ value }: any) => {
      if (!value?.break) return null;
      return (
        <p className="font-warnock py-2 text-center text-xl font-light text-gray-700 dark:text-gray-400 sm:font-normal">
          {'‸       ‸       ‸'}
        </p>
      );
    },
    customCode: ({ value }: any) => (
      <div className="py-2 lg:py-4">
        <SyntaxHighlighter style={vsDark} language={value?.code?.language}>
          {String(value?.code?.code ?? '').replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    ),
    customImage: ({ value }: any) => {
      const dims = tryGetImageDimensions(value);
      if (!dims) return null;
      const image = buildInlineImageUrl(value, { width: Math.min(dims.width, 1200) });
      return (
        <div className="flex flex-col gap-1 py-4 sm:py-8 md:gap-1.5">
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from CMS data below */}
          <img
            src={image.src}
            width={image.width}
            height={image.height}
            alt={value?.alt || ''}
            loading="lazy"
            className="block w-full rounded-md"
          />
          {value?.caption && (
            <p className="font-worksans text-center text-xs text-gray-500 md:text-sm">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    videoAnimation: ({ value }: any) => {
      if (!value?.webm?.asset && !value?.fallback?.asset) return null;
      // Best-effort port of VideoAnimation.jsx: resolves file asset refs via
      // @sanity/asset-utils the same way the Gatsby component does via
      // videoUrl.js's `videoAssetFor`. The Gatsby version also lazy-loads
      // sources via `lozad` (a client-side IntersectionObserver library) —
      // dropped here in favor of the browser's own `preload="metadata"`,
      // since pulling in a lazy-load library would reintroduce client JS for
      // what should stay a zero-JS render of body content.
      const webm = value.webm?.asset ? tryGetVideoUrl(value.webm.asset) : null;
      const fallback = value.fallback?.asset ? tryGetVideoUrl(value.fallback.asset) : null;
      if (!webm && !fallback) return null;
      return (
        <figure className="flex flex-col gap-1 py-4 md:gap-1.5">
          <video title={value.alt} loop muted autoPlay playsInline preload="metadata">
            {webm && <source src={webm.url} type={`video/${webm.extension}`} />}
            {fallback && <source src={fallback.url} type={`video/${fallback.extension}`} />}
          </video>
          {value.caption && (
            <figcaption className="font-worksans text-center text-xs text-gray-500 md:text-sm">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function renderPortableTextBody(value: unknown): string {
  if (!value) return '';
  return renderToStaticMarkup(<PortableText value={value as any} components={richTextComponents} />);
}

// ---------------------------------------------------------------------------
// Excerpt renderer (_rawExcerpt) — ports ExcerptText.jsx.
// ---------------------------------------------------------------------------

const excerptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="font-warnocksubh py-2 text-2xl font-normal text-gray-900 dark:text-gray-100 first-letter:float-left first-letter:-mb-2 first-letter:mr-3 first-letter:mt-1.5 first-letter:text-6xl first-letter:font-bold md:first-letter:text-7xl">
        {children}
      </p>
    ),
  },
};

export function renderExcerpt(value: unknown): string {
  if (!value) return '';
  return renderToStaticMarkup(<PortableText value={value as any} components={excerptComponents} />);
}

/**
 * Plain-text excerpt for contexts that can't carry markup (RSS feed
 * `<description>`, meta tags). Walks the raw Portable Text block JSON and
 * concatenates span text directly — deliberately *not* implemented as
 * `renderToStaticMarkup(...).replace(/<[^>]+>/g, '')`: React's HTML
 * serializer escapes quote/apostrophe characters in text nodes to
 * `&quot;`/`&#x27;` entities, which `@astrojs/rss` would then escape a
 * *second* time (`&amp;quot;`) when it XML-escapes the description string
 * it's given — reading the raw text straight from the Portable Text JSON
 * avoids that double-escaping entirely.
 */
export function renderExcerptPlainText(value: unknown): string {
  if (!Array.isArray(value)) return '';
  return value
    .map((block: any) => {
      if (!block || !Array.isArray(block.children)) return '';
      return block.children.map((span: any) => span?.text ?? '').join('');
    })
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ---------------------------------------------------------------------------
// Category description renderer (_rawDescription) — ports DescriptionText.jsx.
// Used by CategoryCatalogue.
// ---------------------------------------------------------------------------

const descriptionComponents: PortableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="font-warnockcapt text-base text-gray-900 dark:text-gray-100 md:text-lg">
        {children}
      </p>
    ),
  },
};

export function renderDescription(value: unknown): string {
  if (!value) return '';
  return renderToStaticMarkup(<PortableText value={value as any} components={descriptionComponents} />);
}
