import React from 'react'

function TimeToRead({timeToRead, separator, ...props}) {
  return (
    <>
      {separator && <span className="px-2 font-bold text-sm text-gray-800 dark:text-gray-400">
        &#124;
      </span>}
      <span className="font-courier font-light text-base uppercase">
        {timeToRead} MIN READ
      </span>
    </>
  );
}

export default TimeToRead