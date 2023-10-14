import React from 'react'

function NumberedList({ children, className, ...props }) {
    return (
    <ol
      className={`list-decimal list-outside text-gray-900 dark:text-gray-200 text-justify ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </ol>
  );
}

export default NumberedList