import React from 'react';
import { graphql } from 'gatsby';
import Seo from '../components/seo/Seo';
import BlogGrid from '../components/blogs/BlogGrid';
import Pagination from '../components/Pagination';
import Section from '../components/partials/Section';
import SectionBottom from '../components/partials/SectionBottom';
import PageSpace from '../components/PageSpace';
import MarginedContainer from '../components/partials/MarginedContainer';

export const BlogsQuery = graphql`
  query blogListQuery($limit: Int!, $offset: Int!) {
    allSanityBlog(sort: { publishedAt: DESC }, limit: $limit, skip: $offset) {
      nodes {
        id
        title
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
        tags {
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
    <>
      <Seo title="All Posts" />
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
    </>
  );
}

export default BlogPostsList;
