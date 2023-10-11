import React from 'react';
import CategoryItem from './CategoryItem';

function FeaturedCategoriesGrid({ categories }) {
  console.log(categories);
  return (
    <div className="mx-auto px-4 lg:px-12">
      {categories &&
        categories.map((category) => (
          <CategoryItem
            key={category.id}
            title={category.title}
            path={category.slug.current}
            description={category._rawDescription}
          />
        ))}
    </div>
  );
}

export default FeaturedCategoriesGrid;
