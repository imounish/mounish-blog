import React from 'react';

function SectionHeading({ children, className }) {
  return (
    <h2
      className={`font-warnockdisp text-3xl md:text-4xl font-semibold tracking-wide text-black dark:text-gray-50 lowercase ${className ? className : ''}`}
    >
      {children}
    </h2>
  );
}

export default SectionHeading;
