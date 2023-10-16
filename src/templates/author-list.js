import AuthorGrid from '../components/authors/AuthorGrid';
import MarginedContainer from "../components/partials/MarginedContainer";
import PageSpace from "../components/partials/PageSpace";
import Pagination from "../components/partials/Pagination";
import React from 'react';
import SEO from "../components/seo/SEO";
import Section from "../components/partials/Section";
import SectionBottom from "../components/partials/SectionBottom";
import { graphql } from 'gatsby';

export const AuthorsListQuery = graphql`
  query AuthorsListQuery($limit: Int!, $offset: Int!) {
    allSanityAuthor(sort: { name: DESC }, limit: $limit, skip: $offset) {
      nodes {
        id
        name
        description
        slug {
          current
        }
        profileImage {
          alt
          asset {
            gatsbyImageData(placeholder: BLURRED, width: 256, height: 256)
          }
        }
      }
    }
  }
`;

function AuthorList({ data, pageContext }) {
  const { currentPage, numberOfPages } = pageContext;
  const authors = data.allSanityAuthor.nodes;

  return (
    <PageSpace>
      <MarginedContainer>
        <Section sectionHeading="all authors">
          <AuthorGrid authors={authors} />
          <SectionBottom>
            {numberOfPages > 1 && (
              <Pagination
                currentPage={currentPage}
                numberOfPages={numberOfPages}
                baseUrl="/authors"
              />
            )}
          </SectionBottom>
        </Section>
      </MarginedContainer>
    </PageSpace>
  );
}

export const Head = () => <SEO title="all authors" />;

export default AuthorList;
