import {} from './QuoteText.module.css';

import React from 'react';

function QuoteText({ children, className }) {
  return (
    <div
      className={`font-warnockcapt text-xl text-center font-light text-gray-600 dark:text-gray-400 my-5 py-6 px-12 border-y-blue-gray-300 dark:border-y-blue-gray-700 border-y-[1px] ${
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