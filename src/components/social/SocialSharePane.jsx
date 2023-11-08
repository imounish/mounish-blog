import React from 'react';
// import { FaChevronLeft } from 'react-icons/fa6';
import { HiShare } from 'react-icons/hi2';
import { pane, slide, toggle } from './SocialSharePane.module.css';
import socialShareButtons from './SocialShareButtons';

function SocialSharePane({ blogURL, blogTitle}) {
  return (
    <div
      className={`fixed right-0 top-[50%] z-10 flex -translate-y-[50%] flex-row gap-3 py-3 mr-1 ${pane} ${slide}`}
    >
      <button
        type="button"
        className={`my-2 top-[34%] px-2 py-3 hover:cursor-pointer ${pane} ${toggle}`}
      >
        <HiShare className="h-4 w-4 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 lg:h-5 lg:w-5" />
      </button>
      <ul className="flex flex-col gap-2.5 lg:gap-3.5">
        {socialShareButtons.map(item => (
          <li key={item.name}>
            <item.component url={blogURL} title={blogTitle} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SocialSharePane;

