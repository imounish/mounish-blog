import * as React from 'react';

import {} from '@heroicons/react/24/outline';
import { FaInstagram, FaThreads, FaMedium } from 'react-icons/fa6';

export const socialLinks = [
  {
    name: 'instagram',
    url: 'https://instagram.com/mounish.musings',
    icon: <FaInstagram className="w-6 h-6" />,
  },
  {
    name: 'threads',
    url: 'https://threads.net/imounish',
    icon: <FaThreads className="w-6 h-6" />,
  },
  {
    name: 'medium',
    url: 'https://medium.com/@mounishp',
    icon: <FaMedium className="w-6 h-6" />,
  },
];

export const websiteUrl = 'https://mounish.dev';
