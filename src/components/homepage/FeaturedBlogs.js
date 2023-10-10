import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import FeaturedBlogGrid from '../blogs/FeaturedBlogGrid';

function FeaturedBlogs() {
  const { allSanityFeatured } = useStaticQuery(graphql`
    {
      allSanityFeatured(filter: { _id: { eq: "featuredItems" } } ) {
        nodes {
          blogs {
            title
            id
            publishedAt
            coverImage {
              alt
              asset {
                gatsbyImageData(placeholder: BLURRED)
                altText
              }
            }
            categories {
              title
              color
              slug {
                current
              }
              
            }
            slug {
              current
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
    <div className="py-2 md:py-4 lg:py-8">
      {/* <h2 className="font-worksans text-2xl sm:text-2xl text-black dark:text-gray-50 px-4 sm:px-0">
        Featured
      </h2> */}
      {/* <BlogGrid blogs={featuredBlogs} /> */}
      <FeaturedBlogGrid blogs={featuredBlogs} />
    </div>
  );
}

export default FeaturedBlogs;
