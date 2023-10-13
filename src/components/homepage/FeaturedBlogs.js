import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import FeaturedBlogGrid from '../blogs/FeaturedBlogGrid';
import Section from '../partials/Section';

function FeaturedBlogs() {
  const { allSanityFeatured } = useStaticQuery(graphql`
    {
      allSanityFeatured(filter: { _id: { eq: "featuredItems" } }) {
        nodes {
          blogs {
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
    }
  `);

  const featuredBlogs = allSanityFeatured.nodes[0].blogs;

  return (
    <Section sectionHeading="top posts">
      <FeaturedBlogGrid blogs={featuredBlogs} />
    </Section>
  );
}

export default FeaturedBlogs;
