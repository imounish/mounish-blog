import React from 'react';

function ParagraphText({ children, className, ...props }) {
  return (
    <p
      className={`text-justify text-gray-900 dark:text-gray-200 ${className || ''}`}
      {...props}
    >
      {children}
    </p>
  );
}

export default ParagraphText;
