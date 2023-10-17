import React from 'react';
import { graphql } from 'gatsby';
import AuthorHero from '../components/authors/AuthorHero';
import BlogGrid from '../components/blogs/BlogGrid';
import Break from '../components/partials/Break';
import MarginedContainer from '../components/partials/MarginedContainer';
import PageSpace from '../components/partials/PageSpace';
import SEO from '../components/seo/SEO';
import Section from '../components/partials/Section';
import SectionTop from '../components/partials/SectionTop';

export const query = graphql`
query SingleAuthorQuery($id: String!) {
    sanityAuthor(id: { eq: $id }) {
      name
      description
      _rawBio
      profileImage {
        alt
        asset {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
    allSanityBlog(filter: { author: { id: { eq: $id } } }) {
      nodes {
        id
        title
        publishedAt
        timeToRead
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
      }
    }
  }
`;

function SingleAuthor({ data }) {
  const author = data.sanityAuthor;
  const blogs = data.allSanityBlog.nodes;

  return (
    <PageSpace>
      <MarginedContainer>
        <AuthorHero author={author} />
        <Break />
        <Section sectionHeading="recent posts">
          <SectionTop>
            {
              blogs && <BlogGrid blogs={blogs} />
            }
            {
              blogs.length === 0 && (
                <p className="font-warnockcapt text-xl sm:text-2xl font-light text-gray-700 dark:text-gray-300 flex justify-center">
                {author.name} is at work writing new posts !!!
              </p>
              )
            }
          </SectionTop>
        </Section>
      </MarginedContainer>
    </PageSpace>
  )
}

export function Head({ data }) {
  return <SEO title={data.sanityAuthor.name} />
}

export default SingleAuthor