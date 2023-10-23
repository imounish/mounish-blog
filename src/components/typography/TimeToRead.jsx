import React from 'react';

function TimeToRead({ timeToRead, separator }) {
  return (
    <>
      {separator && (
        <span className="px-2 text-sm font-bold text-gray-800 dark:text-gray-400">
          &#124;
        </span>
      )}
      <span className="font-courier text-base font-light uppercase">
        {timeToRead} MIN READ
      </span>
    </>
  );
}

export default TimeToRead;
