import { FaInstagram, FaTwitter, FaLinkedin, FaPinterest, FaWhatsapp } from "react-icons/fa6";
import { LinkedinShareButton, TwitterShareButton, WhatsappShareButton, PinterestShareButton } from "react-share";

import React from 'react'

function SocialShareButtons({ url, title }) {
  return (
    <div className="flex flex-row align-middle justify-between text-gray-800 dark:text-gray-200  gap-4">
      <WhatsappShareButton url={url} title={title}>
        <FaWhatsapp className="h-6 w-6 lg:h-7 lg:w-7 hover:text-gray-600 dark:hover:text-gray-400" />
      </WhatsappShareButton>

      <TwitterShareButton url={url} title={title}>
        <FaTwitter className="h-6 w-6 lg:h-7 lg:w-7 hover:text-gray-600 dark:hover:text-gray-400" />
      </TwitterShareButton>

      <LinkedinShareButton url={url} title={title}>
        <FaLinkedin className="h-6 w-6 lg:h-7 lg:w-7 hover:text-gray-600 dark:hover:text-gray-400" />
      </LinkedinShareButton>
    </div>
  );
}

export default SocialShareButtons