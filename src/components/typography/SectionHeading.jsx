import React from 'react';

function SectionHeading({ children, className }) {
  return (
    <h2
      className={`font-warnockdisp text-3xl md:text-4xl tracking-wide text-black dark:text-gray-50 ${
        className || ''
      }`}
    >
      {children}
    </h2>
  );
}

export default SectionHeading;
