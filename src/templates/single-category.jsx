import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { graphql } from 'gatsby';
import BlogGrid from '../components/blogs/BlogGrid';
import Break from '../components/partials/Break';
import DescriptionText from '../components/typography/DescriptionText';
import MarginedContainer from '../components/partials/MarginedContainer';
import PageSpace from '../components/partials/PageSpace';
import SEO from '../components/seo/SEO';
import Section from '../components/partials/Section';
import SectionHeading from '../components/typography/SectionHeading';
import SectionMiddle from '../components/partials/SectionMiddle';
import SectionTop from '../components/partials/SectionTop';
import { categoryImage } from './single-category.module.css';


export const query = graphql`
  query SingleCategoryQuery($id: String!) {
    sanityCategory(id: { eq: $id }) {
      title
      _rawDescription
      color
      coverImage {
        alt
        asset {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
    allSanityBlog(filter: { category: { id: { eq: $id } } }) {
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

function SingleCategory({ data }) {
  const category = data.sanityCategory;
  const blogs = data.allSanityBlog.nodes;
  return (
    <PageSpace>
      <GatsbyImage
        image={category.coverImage.asset.gatsbyImageData}
        alt={category.coverImage.alt || ''}
        loading="lazy"
        className={`block w-full ${categoryImage}`}
      />
      <MarginedContainer>
        <Section>
          <SectionHeading className="pt-2 lg:pt-4 font-medium">
            {category.title}
          </SectionHeading>
          <SectionTop>
            <div className='italic'>
              <DescriptionText value={category._rawDescription} />
            </div>
          </SectionTop>
          <Break />
          <SectionMiddle>
            {blogs && <BlogGrid blogs={blogs} />}
            {blogs.length === 0 && (
              <p className="font-warnockcapt text-xl sm:text-2xl font-light text-gray-700 dark:text-gray-300 flex justify-center">
                The brains are at work writing new posts !!!
              </p>
            )}
          </SectionMiddle>
        </Section>
      </MarginedContainer>
    </PageSpace>
  );
}

export function Head({ data }) {
  return <SEO title={data.sanityCategory.title} description={`Explore all the articles written in the category ${data.sanityCategory.title} on this website.`} />
}

export default SingleCategory;
