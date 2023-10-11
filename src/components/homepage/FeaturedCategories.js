import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import FeaturedCategoriesGrid from '../categories/FeaturedCategoriesGrid';
import SectionHeading from '../typography/SectionHeading';

function FeaturedCategories() {
  const { allSanityFeatured } = useStaticQuery(graphql`
    {
      allSanityFeatured(filter: { _id: { eq: "featuredItems" } }) {
        nodes {
          categories {
            id
            title
            slug {
              current
            }
            _rawDescription
          }
        }
      }
    }
  `);

  const featuredCategories = allSanityFeatured.nodes[0].categories;

  return (
    <div className="pt-2 pb-2 md:pb-4 lg:pb-8">
      <SectionHeading className="mx-auto px-4 lg:px-12">
        top categories
      </SectionHeading>
      <FeaturedCategoriesGrid categories={featuredCategories} />
    </div>
  );
}

export default FeaturedCategories;
