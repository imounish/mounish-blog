import React from 'react';
import { Link } from 'gatsby';

function TagsArray({ tags, className }) {
  return (
    <ul className={className}>
      {tags.map(tag => (
        <li key={tag.title}>
          <Link
            to={`/tags/?search=${tag.slug.current}`}
            title={tag.title}
            className=" font-worksans rounded-md bg-gray-700 px-2 py-1.5 text-sm font-light uppercase text-gray-200 hover:bg-gray-900 dark:bg-gray-400 dark:text-black dark:hover:bg-gray-200"
          >
            {tag.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default TagsArray;
