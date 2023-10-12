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
            categories {
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
    // <div className="pt-2 pb-2 md:pt-4 lg:pt-8 md:pb-4">
    //   {/* <h2 className="font-worksans text-2xl sm:text-2xl text-black dark:text-gray-50 px-4 sm:px-0">
    //     Featured
    //   </h2> */}
    //   {/* <BlogGrid blogs={featuredBlogs} /> */}
    //   <SectionHeading className="mx-auto px-4 lg:px-12">
    //     top posts
    //   </SectionHeading>
    //   <FeaturedBlogGrid blogs={featuredBlogs} />
    // </div>
    <Section sectionHeading='top posts'>
      <FeaturedBlogGrid blogs={featuredBlogs} />
    </Section>
  );
}

export default FeaturedBlogs;
