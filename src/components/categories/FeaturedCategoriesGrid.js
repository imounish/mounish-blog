import React from 'react';
import CategoryItem from './CategoryItem';
import SectionRest from '../partials/SectionRest';
import SectionBottom from '../partials/SectionBottom';

function FeaturedCategoriesGrid({ categories }) {
  return (
    <SectionRest className="flex flex-col gap-8">
      {categories &&
        categories.map((category) => (
          <CategoryItem
            key={category.id}
            title={category.title}
            path={category.slug.current}
            color={category.color}
            description={category._rawDescription}
            image={{
              imageData: category.coverImage.asset.gatsbyImageData,
              altText: category.coverImage.alt,
            }}
          />
        ))}
    </SectionRest>
  );
}

export default FeaturedCategoriesGrid;
