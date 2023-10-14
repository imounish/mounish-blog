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
import RichText from '../components/typography/RichText';
import TagsArray from '../components/tags/TagsArray';
import NewsletterSection from "../components/homepage/NewsletterSection";
import { socialShareLinks } from "../components/social/SocialShareButtons";

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
        caption
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
          alt={blog.coverImage.alt || ""}
          loading="lazy"
          className="block w-full"
          style={{
            height: "65vh",
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
              <RichText value={blog._rawBody} />
              <div className="grid grid-flow-col sm:grid-cols-2 gap-8 pt-6 pb-0 md:pb-2">
                <TagsArray
                  tags={blog.tags}
                  className="sm:col-span-1 flex flex-row gap-2 items-center justify-start"
                />
                <ul className="sm:col-span-1 flex flex-row justify-end sm:justify-between gap-4 text-gray-700 dark:text-gray-400">
                  {socialShareLinks.map((item) => (
                    <li key={item.name} className="">
                      <item.component
                        url={data.site.siteMetadata.siteURL + location.pathname}
                        title={blog.title}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </SectionMiddle>
            <Break />
          </Section>
          <NewsletterSection
            className="pb-8"
            heading="want to stay in touch?"
          />
        </MarginedContainer>
      </Container>
    </>
  );
}

export default SingleBlogPost;
