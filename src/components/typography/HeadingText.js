import React from "react";

function HeadingText({ children, className, ...props }) {
  return (
    <h2
      className={`text-gray-900 dark:text-gray-100 ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </h2>
  );
}

export default HeadingText;
