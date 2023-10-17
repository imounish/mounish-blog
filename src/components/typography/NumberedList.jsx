import React from 'react'

function NumberedList({ children, className }) {
    return (
    <ol
      className={`list-decimal list-outside text-gray-900 dark:text-gray-200 text-justify ${
        className || ""
      }`}
    >
      {children}
    </ol>
  );
}

export default NumberedList