import React from 'react';

function ParagraphText({ children, className }) {
  return (
    <p
      className={`text-justify text-gray-900 dark:text-gray-200 ${className || ''}`}
    >
      {children}
    </p>
  );
}

export default ParagraphText;
