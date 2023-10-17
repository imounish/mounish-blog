import React from 'react';
import { graphql } from 'gatsby';
import BlogGrid from '../components/blogs/BlogGrid';
import MarginedContainer from '../components/partials/MarginedContainer';
import PageSpace from '../components/partials/PageSpace';
import Pagination from '../components/partials/Pagination';
import SEO from '../components/seo/SEO';
import Section from '../components/partials/Section';
import SectionBottom from '../components/partials/SectionBottom';

export const BlogsListQuery = graphql`
  query BlogListQuery($limit: Int!, $offset: Int!) {
    allSanityBlog(sort: { publishedAt: DESC }, limit: $limit, skip: $offset) {
      nodes {
        id
        title
        timeToRead
        publishedAt
        slug {
          current
        }
        category {
          title
          color
          slug {
            current
          }
        }
        coverImage {
          alt
          asset {
            gatsbyImageData(placeholder: BLURRED)
            altText
          }
        }
        author {
          name
          profileImage {
            asset {
              gatsbyImageData(width: 24, height: 24, placeholder: BLURRED)
              altText
            }
          }
          slug {
            current
          }
        }
      }
    }
  }
`;

function BlogPostsList({ data, pageContext }) {
  const { currentPage, numberOfPages } = pageContext;
  const blogs = data.allSanityBlog.nodes;

  return (
    <PageSpace>
      <MarginedContainer>
        <Section sectionHeading="all posts">
          <BlogGrid blogs={blogs} />
          <SectionBottom>
            {numberOfPages > 1 && (
              <Pagination
                currentPage={currentPage}
                numberOfPages={numberOfPages}
                baseUrl="/posts"
              />
            )}
          </SectionBottom>
        </Section>
      </MarginedContainer>
    </PageSpace>
  );
}

export function Head() {
  return <SEO title="all posts" />
}

export default BlogPostsList;
