import React from 'react';
import SectionHeading from '../typography/SectionHeading';

function Section({ children, className, sectionHeading, ...props }) {
  return (
    <div className={`py-2 px-4 ${className || ''}`} {...props}>
      {sectionHeading && (
        <SectionHeading className="pt-2 lg:pt-4 lowercase font-semibold">
          {/* section heading classname - mx-auto px-4 lg:px-12 */}
          {sectionHeading}
        </SectionHeading>
      )}
      {children}
    </div>
  );
}

export default Section;
