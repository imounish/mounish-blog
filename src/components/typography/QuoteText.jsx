import {} from './QuoteText.module.css';

import React from 'react';

function QuoteText({ children, className }) {
  return (
    <div
      className={` font-warnockcapt text-xl text-center font-light text-gray-600 dark:text-gray-400 my-5 py-6 px-12 border-y-blue-gray-300 dark:border-y-blue-gray-700 border-y-[1px] ${
        className || ''
      }`}
    >
      <blockquote
        // before="\0093"
        className=""
      >
        {children}
      </blockquote>
    </div>
  );
}

export default QuoteText;
// before:font-3xl before:block before:h-0 before:text-blue-gray-300 dark:before:text-blue-gray-700 before:relative before:-top-3 before:-left-
