import {} from './QuoteText.module.css';

import React from 'react';

function QuoteText({ children, className }) {
  return (
    <div
      className={`font-warnockcapt border-y-blue-gray-300 dark:border-y-blue-gray-700 my-5 border-y-[1px] px-12 py-6 text-center text-xl font-light text-gray-600 dark:text-gray-400 ${
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
