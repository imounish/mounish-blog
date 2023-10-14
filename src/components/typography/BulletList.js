import React from 'react';

function BulletList({ children, className, ...props }) {
  return (
    <ul
      className={`list-disc list-outside text-gray-900 dark:text-gray-200 text-justify ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </ul>
  );
}

export default BulletList;