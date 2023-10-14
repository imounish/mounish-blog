import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import Seo from '../components/seo/Seo';
import MyPortableText from '../components/typography/MyPortableText';
import Container from '../components/partials/Container';
import Section from '../components/partials/Section';
import SectionTop from '../components/partials/SectionTop';
import SectionMiddle from '../components/partials/SectionMiddle';
import SectionBottom from '../components/partials/SectionBottom';
import MarginedContainer from '../components/partials/MarginedContainer';
import PostHeadingSection from '../components/blogposts/PostHeadingSection';
import CategoryCatalogue from '../components/categories/CategoryCatalogue';
import Break from '../components/partials/Break';
import ExcerptText from '../components/typography/ExcerptText';
import { textContainer } from './single-blog-post.module.css';

export const postQuery = graphql`
  query SingleBlogQuery($id: String!) {
    site {
      siteMetadata {
        siteURL
      }
    }
    sanityBlog(id: { eq: $id }) {
      title
      subTitle
      publishedAt
      _rawBody
      _rawExcerpt
      coverImage {
        alt
        asset {
          gatsbyImageData
        }
      }
      category {
        _id
        title
        color
        _rawDescription
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
        slug {
          current
        }
      }
    }
  }
`;

function SingleBlogPost({ data, location }) {
  const blog = data.sanityBlog;
  return (
    <>
      <Seo title={blog.title} />
      <Container>
        <MarginedContainer>
          <PostHeadingSection
            postTitle={blog.title}
            postSubHeading={blog.subTitle}
            postPublishedAt={blog.publishedAt}
            tags={blog.tags}
            postURL={{
              siteURL: data.site.siteMetadata.siteURL,
              path: location.pathname,
            }}
          />
        </MarginedContainer>
        <GatsbyImage
          image={blog.coverImage.asset.gatsbyImageData}
          alt={blog.coverImage.alt || ''}
          loading="lazy"
          className="block w-full"
          style={{
            height: '65vh',
          }}
        />
        <MarginedContainer>
          <Section>
            <SectionTop>
              <CategoryCatalogue
                category={blog.category}
                pagePath={location.pathname}
              />
              <Break />
            </SectionTop>
            <SectionMiddle className={textContainer}>
              <ExcerptText value={blog._rawExcerpt} />
              <MyPortableText value={blog._rawBody} />
            </SectionMiddle>
            {/* <MyPortableText value={blog._rawExcerpt} /> */}
            <SectionBottom />
          </Section>
        </MarginedContainer>
      </Container>
    </>
  );
}

export default SingleBlogPost;
