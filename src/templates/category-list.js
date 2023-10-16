import FeaturedCategoriesGrid from '../components/categories/FeaturedCategoriesGrid';
import MarginedContainer from '../components/partials/MarginedContainer';
import PageSpace from '../components/partials/PageSpace';
import Pagination from '../components/partials/Pagination';
import React from 'react';
import SEO from '../components/seo/SEO';
import Section from '../components/partials/Section';
import SectionBottom from '../components/partials/SectionBottom';
import { graphql } from 'gatsby';

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
            gatsbyImageData(placeholder: BLURRED, width: 128, height: 128)
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

export const Head = () => <SEO title="all categories" />;

export default CategoryList;
