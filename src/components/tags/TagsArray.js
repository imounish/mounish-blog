import React from 'react';
import { Link } from 'gatsby';

function TagsArray({ tags, className, ...props }) {
  return (
    <ul className={className} {...props}>
      {tags.map((tag) => (
        <li key={tag.title}>
          <Link
            to={`/tags/${tag.slug.current}`}
            className=" font-worksans font-light uppercase text-sm rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600 dark:bg-gray-300 dark:text-gray-800 dark:hover:bg-gray-200 py-1.5 px-2"
          >
            {tag.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default TagsArray;

// <Link
//  to={`/tags/${tag.slug.current}`}
//  style={{ backgroundColor: `${tag.color}` }}
//  className="rounded-3xl text-gray-900 py-1.5 px-2"
// >
//  #{tag.title}
//  {/* {idx === arr.length -1 ? '' : ','} */}
// </Link>
