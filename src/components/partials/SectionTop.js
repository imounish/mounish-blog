import React from 'react'

function SectionTop({ children, className, ...props }) {
  return (
    <div className={`mt-3 lg:mt-4 mb-8 ${className ? className : ''}`} {...props}>{children}</div>
  )
}

export default SectionTop