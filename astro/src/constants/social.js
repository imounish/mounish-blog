// T3: adapted from src/constants/social.jsx (Gatsby app). Same links/order,
// but exports icon *components* instead of pre-built JSX elements — Astro
// templates can render a framework component referenced by a variable
// (`<Icon />`) directly to static HTML at build time (no client JS shipped),
// but can't render an already-constructed React element value the way a
// React tree can. Footer.astro applies the same Tailwind classes the
// original JSX had inline.
import { FaInstagram, FaThreads, FaMedium, FaGithub } from 'react-icons/fa6';

export const socialLinks = [
  {
    name: 'instagram',
    url: 'https://instagram.com/imounish',
    Icon: FaInstagram,
  },
  {
    name: 'threads',
    url: 'https://threads.net/imounish',
    Icon: FaThreads,
  },
  {
    name: 'medium',
    url: 'https://medium.com/@mounishp',
    Icon: FaMedium,
  },
  {
    name: 'github',
    url: 'https://github.com/imounish',
    Icon: FaGithub,
  },
];

export const websiteUrl = 'https://mounish.dev';
