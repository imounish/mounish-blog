import { FaLinkedin, FaWhatsapp, FaShare, FaXTwitter } from 'react-icons/fa6';
import {
  EmailShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

import React from 'react';

const socialShareButtons = [
  {
    name: 'email-share',
    component: ({ url, title }) => (
      <EmailShareButton subject={title.toString()} body="Read this exciting article I came across at" url={url}>
        <FaShare className="h-5 w-5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 lg:h-6 lg:w-6" />
      </EmailShareButton>
    ),
  },
  {
    name: 'whatsapp',
    component: ({ url, title }) => (
      <WhatsappShareButton url={url} title={title}>
        <FaWhatsapp className="h-5 w-5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 lg:h-6 lg:w-6" />
      </WhatsappShareButton>
    ),
  },
  {
    name: 'twitter',
    component: ({ url, title }) => (
      <TwitterShareButton url={url} title={title}>
        <FaXTwitter className="h-5 w-5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 lg:h-6 lg:w-6" />
      </TwitterShareButton>
    ),
  },
  {
    name: 'linkedin',
    component: ({ url, title }) => (
      <LinkedinShareButton url={url} title={title}>
        <FaLinkedin className="h-5 w-5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 lg:h-6 lg:w-6" />
      </LinkedinShareButton>
    ),
  },
];

export default socialShareButtons;
