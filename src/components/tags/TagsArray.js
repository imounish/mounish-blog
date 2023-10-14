import React from 'react';
import { Link } from 'gatsby';

function TagsArray({ tags, className, ...props }) {
  return (
    <ul className={className} {...props}>
      {tags.map((tag, idx, arr) => (
        <li key={tag.title}>
          <Link
            to={`/tags/${tag.slug.current}`}
            style={{ color: `${tag.color}` }}
          >
            #{tag.title}
            {idx === arr.length - 1 ? '' : ','}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default TagsArray;

// <Link
//   to={`/tags/${tag.slug.current}`}
//   style={{ backgroundColor: `${tag.color}` }}
//   className="rounded-3xl text-gray-900 py-1.5 px-2"
// >
//   #{tag.title}
//   {/* {idx === arr.length -1 ? '' : ','} */}
// </Link>;
