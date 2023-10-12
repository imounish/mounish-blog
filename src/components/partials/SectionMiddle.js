import React from "react";

function SectionMiddle({ children, className, ...props }) {
  return (
    <div className={`my-8 ${className ? className : ''}`} {...props}>
      {children}
    </div>
  );
}

export default SectionMiddle;
