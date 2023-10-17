import React from 'react';

function BulletList({ children, className }) {
  return (
    <ul
      className={`list-disc list-outside text-gray-900 dark:text-gray-200 text-justify ${
        className || ""
      }`}
    >
      {children}
    </ul>
  );
}

export default BulletList;