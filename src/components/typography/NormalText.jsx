import React from 'react';

function NormalText({ children, className }) {
  return (
    <p className={`text-gray-900 dark:text-gray-100 ${className || ''}`}>
      {children}
    </p>
  );
}

export default NormalText;
