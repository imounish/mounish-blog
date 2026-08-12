/**
 * Social share row (T6) — Astro equivalent of
 * src/components/social/SocialShareButtons.jsx.
 *
 * The Gatsby version wraps `react-share`'s ShareButton components, which
 * render a plain <button> and call `window.open(shareUrl)` on click purely
 * for cosmetic popup-window behavior — no state, no data they couldn't
 * already express as a direct link. Per the task brief ("only add client:*
 * if react-share's components require actual click handlers beyond
 * navigation"), this builds the same share URLs directly and renders them as
 * plain `<a target="_blank">` links instead — equivalent behavior (opens the
 * share flow in a new tab), zero client JS.
 *
 * Icons: still sourced from `react-icons/fa6` (same icons Gatsby uses via
 * SocialShareButtons.jsx/ScrollToTop.jsx) for visual parity, but rendered to
 * a static SVG string at build time via ReactDOMServer — same
 * build-time-render trick as ./portableText.tsx — instead of shipping
 * react-icons/React to the browser.
 */
import { renderToStaticMarkup } from 'react-dom/server';
import { FaShare, FaWhatsapp, FaTwitter, FaLinkedin } from 'react-icons/fa6';

const ICON_CLASS =
  'h-5 w-5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 lg:h-6 lg:w-6';

export interface SocialShareLink {
  name: string;
  href: string;
  target?: '_blank';
  rel?: string;
  iconSvg: string;
}

export function buildSocialShareLinks({
  url,
  title,
}: {
  url: string;
  title: string;
}): SocialShareLink[] {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return [
    {
      name: 'email',
      href: `mailto:?to=&subject=${encodedTitle}&body=${encodedUrl}`,
      iconSvg: renderToStaticMarkup(<FaShare className={ICON_CLASS} />),
    },
    {
      name: 'whatsapp',
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      target: '_blank',
      rel: 'noopener noreferrer',
      iconSvg: renderToStaticMarkup(<FaWhatsapp className={ICON_CLASS} />),
    },
    {
      name: 'twitter',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      target: '_blank',
      rel: 'noopener noreferrer',
      iconSvg: renderToStaticMarkup(<FaTwitter className={ICON_CLASS} />),
    },
    {
      name: 'linkedin',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      target: '_blank',
      rel: 'noopener noreferrer',
      iconSvg: renderToStaticMarkup(<FaLinkedin className={ICON_CLASS} />),
    },
  ];
}
