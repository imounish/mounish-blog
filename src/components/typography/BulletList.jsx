import React from 'react';

function BulletList({ children, className }) {
  return (
    <ul
      className={`list-outside list-disc text-justify text-gray-900 dark:text-gray-200 ${
        className || ''
      }`}
    >
      {children}
    </ul>
  );
}

export default BulletList;
