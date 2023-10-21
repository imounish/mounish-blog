import {
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaShare,
} from 'react-icons/fa6';
import {
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

import React from 'react';

const socialShareLinks = [
  {
    name: "email",
    component: ({ url, title }) => (
      <a
        aria-label='email'
        href={`mailto:?to=&subject=${title.toString()}&body=${url.toString()}`}
      >
        <FaShare className="h-5 w-5 lg:h-6 lg:w-6 hover:text-gray-900 dark:hover:text-gray-200" />
      </a>
    ),
  },
  {
    name: "whatsapp",
    component: ({ url, title }) => (
      <WhatsappShareButton url={url} title={title}>
        <FaWhatsapp className="h-5 w-5 lg:h-6 lg:w-6 hover:text-gray-900 dark:hover:text-gray-200" />
      </WhatsappShareButton>
    ),
  },
  {
    name: "twitter",
    component: ({ url, title }) => (
      <TwitterShareButton url={url} title={title}>
        <FaTwitter className="h-5 w-5 lg:h-6 lg:w-6 hover:text-gray-900 dark:hover:text-gray-200" />
      </TwitterShareButton>
    ),
  },
  {
    name: "linkedin",
    component: ({ url, title }) => (
      <LinkedinShareButton url={url} title={title}>
        <FaLinkedin className="h-5 w-5 lg:h-6 lg:w-6 hover:text-gray-900 dark:hover:text-gray-200" />
      </LinkedinShareButton>
    ),
  },
];

export default socialShareLinks;
