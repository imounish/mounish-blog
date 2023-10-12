import React from "react";

function H1Text({ children, className, ...props }) {
  return (
    <h1
      className={`text-xl font-warnock text-black dark:text-gray-100 ${className ? className : ''}`}
      {...props}
    >
      {children}
    </h1>
  );
}

export default H1Text;
