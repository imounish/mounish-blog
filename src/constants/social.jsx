import * as React from 'react';

import { FaInstagram, FaThreads, FaMedium, FaGithub } from 'react-icons/fa6';

export const socialLinks = [
  {
    name: 'instagram',
    url: 'https://instagram.com/mounish.musings',
    icon: (
      <FaInstagram className="h-6 w-6 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200" />
    ),
  },
  {
    name: 'threads',
    url: 'https://threads.net/imounish',
    icon: (
      <FaThreads className="h-6 w-6 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200" />
    ),
  },
  {
    name: 'medium',
    url: 'https://medium.com/@mounishp',
    icon: (
      <FaMedium className="h-6 w-6 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200" />
    ),
  },
  {
    name: 'github',
    url: 'https://github.com/imounish',
    icon: (
      <FaGithub className="h-6 w-6 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200" />
    ),
  },
];

export const websiteUrl = 'https://mounish.dev';
