import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import SEO from '../components/seo/SEO';
import BlogGrid from '../components/blogs/BlogGrid';
import Section from '../components/partials/Section';
import SectionTop from '../components/partials/SectionTop';
import Break from '../components/partials/Break';
import PageSpace from '../components/partials/PageSpace';
import MarginedContainer from '../components/partials/MarginedContainer';
import SectionHeading from '../components/typography/SectionHeading';
import DescriptionText from '../components/typography/DescriptionText';
import SectionMiddle from '../components/partials/SectionMiddle';
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
        tags {
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

  console.log(category);

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
            <DescriptionText value={category._rawDescription} />
          </SectionTop>
          <Break />
          <SectionMiddle>
            <BlogGrid blogs={blogs} />
          </SectionMiddle>
        </Section>
      </MarginedContainer>
    </PageSpace>
  );
}

export const Head = ({ data }) => <SEO title={data.sanityCategory.title} />;

export default SingleCategory;
