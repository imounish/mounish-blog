import React from 'react';
import { graphql } from 'gatsby';
import FeaturedCategoriesGrid from '../components/categories/FeaturedCategoriesGrid';
import MarginedContainer from '../components/partials/MarginedContainer';
import PageSpace from '../components/partials/PageSpace';
import Pagination from '../components/partials/Pagination';
import SEO from '../components/seo/SEO';
import Section from '../components/partials/Section';
import SectionBottom from '../components/partials/SectionBottom';

export const CategoriesListQuery = graphql`
  query CategoriesListQuery($limit: Int!, $offset: Int!) {
    allSanityCategory(
      sort: { _createdAt: DESC }
      limit: $limit
      skip: $offset
    ) {
      nodes {
        id
        title
        slug {
          current
        }
        _rawDescription
        coverImage {
          alt
          asset {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
  }
`;

function CategoryList({ data, pageContext }) {
  const { currentPage, numberOfPages } = pageContext;
  const categories = data.allSanityCategory.nodes;
  return (
    <PageSpace>
      <MarginedContainer>
        <Section sectionHeading="all categories">
          <FeaturedCategoriesGrid categories={categories} />
          <SectionBottom>
            {numberOfPages > 1 && (
              <Pagination
                currentPage={currentPage}
                numberOfPages={numberOfPages}
                baseUrl="/categories"
              />
            )}
          </SectionBottom>
        </Section>
      </MarginedContainer>
    </PageSpace>
  );
}

export function Head() {
  return (
    <SEO
      title="all categories"
      description="Explore all the categories in which articles have been written on this website."
    />
  );
}

export default CategoryList;
