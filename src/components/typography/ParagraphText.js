import React from 'react';

function ParagraphText({ children, className, ...props }) {
  return (
    <p
      className={`text-lg lg:text-xl font-warnock text-gray-900 dark:text-gray-100 ${className ? className : ''}`}
      {...props}
    >
      {children}
    </p>
  );
}

export default ParagraphText;
