import React from "react";

function SectionBottom({ children, className, ...props }) {
  return (
    <div
      className={`mb-3 lg:mb-4 mt-8 ${className ? className : ''}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default SectionBottom;
