import React from 'react';
import { Link } from 'gatsby';

function CategoryText({ category, colored, className }) {
  return (
    <Link
      to={`/categories/${category.slug.current}`}
      className={`${className || ''}`}
      style={{
        color: `${colored ? category.color : 'inherit'}`,
      }}
    >
      {category.title}
    </Link>
  );
}

export default CategoryText;
