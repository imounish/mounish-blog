import React from 'react'

function SectionRest({ children, className, ...props }) {
  return (
    <div className={`my-3 lg:my-4 ${className ? className : ''}`} {...props}>
      {children}
    </div>
  );
}

export default SectionRest;