import React from "react";

function HeadingText({ children, className }) {
  return (
    <h2
      className={`text-gray-900 dark:text-gray-100 ${
        className || ""
      }`}
    >
      {children}
    </h2>
  );
}

export default HeadingText;
