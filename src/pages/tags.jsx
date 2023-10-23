import { Link, graphql } from 'gatsby';
import React from 'react';
import BlogGrid from '../components/blogs/BlogGrid';
import Break from '../components/partials/Break';
import MarginedContainer from '../components/partials/MarginedContainer';
import PageSpace from '../components/partials/PageSpace';
import Section from '../components/partials/Section';
import SectionMiddle from '../components/partials/SectionMiddle';
import SectionTop from '../components/partials/SectionTop';
import SEO from '../components/seo/SEO';

import { disabled } from '../components/tags/tags.module.css';

export const TagsListQuery = graphql`
  query TagsListQuery {
    allSanityTag {
      nodes {
        id
        title
        slug {
          current
        }
      }
    }
    allSanityBlog {
      nodes {
        id
        title
        publishedAt
        slug {
          current
        }
        tags {
          id
          title
          slug {
            current
          }
        }
        category {
          title
          slug {
            current
          }
        }
        coverImage {
          alt
          asset {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

function TagsPage({ data, location }) {
  const tags = data.allSanityTag.nodes;
  const allBlogs = data.allSanityBlog.nodes;
  const activeTag = location.search
    ? location.search.replace('?', '').split('=')[1]
    : null;

  const activeTagBlogs = allBlogs.filter(blog =>
    blog.tags.find(tag => tag.slug.current === activeTag)
  );

  return (
    <PageSpace>
      <MarginedContainer>
        <Section sectionHeading="all tags">
          <SectionTop>
            <ul className="flex flex-wrap gap-2.5">
              {tags.map(tag => (
                <li key={tag.title}>
                  <Link
                    to={
                      tag.slug.current === activeTag
                        ? '/tags/'
                        : `/tags/?search=${tag.slug.current}`
                    }
                    className={`${
                      tag.slug.current === activeTag && disabled
                    } font-worksans rounded-md bg-gray-700 px-2 py-1.5 text-sm font-light uppercase text-gray-200 hover:bg-gray-900 dark:bg-gray-400 dark:text-black dark:hover:bg-gray-200`}
                  >
                    {tag.title}
                  </Link>
                </li>
              ))}
            </ul>
          </SectionTop>
          <Break />
          <SectionMiddle>
            {activeTagBlogs.length > 0 && <BlogGrid blogs={activeTagBlogs} />}
            {activeTag && activeTagBlogs.length === 0 && (
              <p className="font-warnockcapt flex justify-center text-xl font-light text-gray-700 dark:text-gray-300 sm:text-2xl">
                The brains are at work writing new posts for{' '}
                {tags.find(tag => tag.slug.current === activeTag).title} tag !!!
              </p>
            )}
            {!activeTag && (
              <p className="font-warnockcapt flex justify-center text-xl font-light lowercase text-gray-700 dark:text-gray-300 sm:text-2xl">
                select a tag to view posts
              </p>
            )}
          </SectionMiddle>
        </Section>
      </MarginedContainer>
    </PageSpace>
  );
}

export function Head() {
  return (
    <SEO
      title="tags"
      description="Explore the articles on this website through the tags that are used on this website."
    />
  );
}

export default TagsPage;
