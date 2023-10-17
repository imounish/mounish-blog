import React from 'react'

function SearchResultHolder({children, className}) {
  return (
    <div className={`px-11 block w-full rounded-b-lg text-lg bg-gray-100 dark:bg-gray-800 ${className || ''}`}>
        {children}
    </div>
  )
}

export default SearchResultHolder