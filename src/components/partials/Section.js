import React from 'react'
import SectionHeading from '../typography/SectionHeading'

function Section({children, sectionHeading, ...props}) {
  return (
    <div className="py-2 px-4" {...props}>
      <SectionHeading className='pt-2 lg:pt-4'>
        {/* section heading classname - mx-auto px-4 lg:px-12 */}
        {sectionHeading}
      </SectionHeading>
      {children}
    </div>
  );
}

export default Section