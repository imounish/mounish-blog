import React from 'react';
import CategoryItem from './CategoryItem';
import SectionRest from '../partials/SectionRest';

function FeaturedCategoriesGrid({ categories }) {
  return (
    <SectionRest className="flex flex-col gap-8 pb-2">
      {categories &&
        categories.map((category) => (
          <CategoryItem
            key={category.id}
            title={category.title}
            path={category.slug.current}
            description={category._rawDescription}
            image={{
              imageData: category.coverImage.asset.gatsbyImageData,
              altText: category.coverImage.alt,
            }}
            exploreBtnDisplay
          />
        ))}
    </SectionRest>
  );
}

export default FeaturedCategoriesGrid;
