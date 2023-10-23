import React from 'react';

function Break({ className }) {
  return (
    <hr className={`border-gray-300 dark:border-gray-800 ${className || ''}`} />
  );
}

export default Break;
