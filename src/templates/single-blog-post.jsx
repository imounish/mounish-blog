import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { blogImage } from './single-blog-post.module.css';

import Break from '../components/partials/Break';
import CategoryCatalogue from '../components/categories/CategoryCatalogue';
import Container from '../components/partials/Container';
import ExcerptText from '../components/typography/ExcerptText';
import MarginedContainer from '../components/partials/MarginedContainer';
import NewsletterSection from '../components/homepage/NewsletterSection';
import PostHeadingSection from '../components/blogs/PostHeadingSection';
import ProgressBar from '../components/partials/ProgressBar';
import RichText from '../components/typography/RichText';
import SEO from '../components/seo/SEO';
import ScrollToTop from '../components/partials/ScrollToTop';
import Section from '../components/partials/Section';
import SectionBottom from '../components/partials/SectionBottom';
import SectionMiddle from '../components/partials/SectionMiddle';
import SectionTop from '../components/partials/SectionTop';
import TagsArray from '../components/tags/TagsArray';
import socialShareButtons from '../components/social/SocialShareButtons';
import ReadNext from '../components/blogs/ReadNext';
import SocialSharePane from '../components/social/SocialSharePane';

export const postQuery = graphql`
  query SingleBlogQuery($id: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    sanityBlog(id: { eq: $id }) {
      title
      subTitle
      publishedAt
      timeToRead
      readNext {
        current
      }
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
        description
        slug {
          current
        }
      }
    }
    allSanityBlog {
      nodes {
        id
        title
        slug {
          current
        }
        category {
          title
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

function SingleBlogPost({ data, location }) {
  const blog = data.sanityBlog;

  return (
    <>
      <SEO title={blog.title} />
      <ProgressBar height="2" duration="0.4" bgColor="#E76161" />
      <SocialSharePane
        blogURL={data.site.siteMetadata.siteUrl + location.pathname}
        blogTitle={blog.title}
      />
      <Container>
        <MarginedContainer>
          <ScrollToTop showBelow={800} />
          <PostHeadingSection
            postTitle={blog.title}
            postSubHeading={blog.subTitle}
            postPublishedAt={blog.publishedAt}
            timeToRead={blog.timeToRead}
            postURL={{
              siteUrl: data.site.siteMetadata.siteUrl,
              path: location.pathname,
            }}
          />
        </MarginedContainer>
        <GatsbyImage
          image={blog.coverImage.asset.gatsbyImageData}
          alt={blog.coverImage.alt || ''}
          loading="lazy"
          className={`block w-full ${blogImage}`}
        />
        <MarginedContainer>
          <Section>
            <SectionTop>
              {blog.category && (
                <>
                  <CategoryCatalogue
                    category={blog.category}
                    pagePath={location.pathname}
                  />
                  <Break />
                </>
              )}
            </SectionTop>
            <SectionMiddle className="gap-4 lg:grid lg:grid-cols-4">
              <div className="lg:col-span-3">
                <ExcerptText value={blog._rawExcerpt} />
                <RichText value={blog._rawBody} />
                <div className="grid grid-flow-col gap-8 pb-0 pt-6 sm:grid-cols-2 md:pb-2">
                  {blog.tags && (
                    <TagsArray
                      tags={blog.tags}
                      className="flex flex-row items-center justify-start gap-2 sm:col-span-1"
                    />
                  )}
                  <ul className="flex flex-row justify-end gap-4 sm:col-span-1">
                    {socialShareButtons.map(item => (
                      <li key={item.name} className="">
                        <item.component
                          url={
                            data.site.siteMetadata.siteUrl + location.pathname
                          }
                          title={blog.title}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {blog.readNext.length !== 0 && (
                <div className="hidden lg:col-span-1 lg:grid">
                  <ReadNext readNext={blog.readNext} />
                </div>
              )}
            </SectionMiddle>
            <SectionBottom>
              {blog.author && (
                <div className="flex flex-col gap-1">
                  <p className="font-lora text-base text-gray-700 dark:text-gray-300 md:text-lg ">
                    This post was written by{' '}
                    <Link
                      className="text-gray-900 hover:underline dark:text-gray-100"
                      to={`/authors/${blog.author.slug.current}`}
                    >
                      {blog.author.name}
                    </Link>
                  </p>
                  <p className="font-warnockcapt text-base font-light italic text-gray-500 md:text-lg">
                    {blog.author.description}
                  </p>
                </div>
              )}
            </SectionBottom>
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

export function Head({ data }) {
  return (
    <SEO
      title={data.sanityBlog.title}
      description={data.sanityBlog.subTitle}
      featuredImage={data.sanityBlog.coverImage.asset.gatsbyImageData}
    />
  );
}

export default SingleBlogPost;
