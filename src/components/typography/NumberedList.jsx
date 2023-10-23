import React from 'react';

function NumberedList({ children, className }) {
  return (
    <ol
      className={`list-outside list-decimal text-justify text-gray-900 dark:text-gray-200 ${
        className || ''
      }`}
    >
      {children}
    </ol>
  );
}

export default NumberedList;
