import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import FeaturedCategoriesGrid from '../categories/FeaturedCategoriesGrid';
import Section from '../partials/Section';

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
            coverImage {
              alt
              asset {
                gatsbyImageData(placeholder: BLURRED, width: 128, height: 128)
              }
            }
          }
        }
      }
    }
  `);

  const featuredCategories = allSanityFeatured.nodes[0].categories;

  return (
    <Section sectionHeading="top categories">
      <FeaturedCategoriesGrid categories={featuredCategories} />
    </Section>
  );
}

export default FeaturedCategories;
