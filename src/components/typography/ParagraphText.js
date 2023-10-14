import React from 'react';

function ParagraphText({ children, className, ...props }) {
  return (
    <p
      className={`text-lg font-warnock text-gray-900 dark:text-gray-100 ${
        className || ''
      }`}
      {...props}
    >
      {children}
    </p>
  );
}

export default ParagraphText;
