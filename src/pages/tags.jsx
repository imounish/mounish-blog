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

import { disabled } from '../components/tags/tags.module.css'

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

function TagsPage({data, location}) {
  const tags = data.allSanityTag.nodes;
  const allBlogs = data.allSanityBlog.nodes;
  const activeTag = location.search ? location.search.replace('?', '').split('=')[1] : null;

  const activeTagBlogs = allBlogs.filter(blog => (
    blog.tags.find(tag => tag.slug.current === activeTag)
  ));
  
  return (
    <PageSpace>
      <MarginedContainer>
        <Section sectionHeading="all tags">
          <SectionTop>
            <ul className='flex flex-wrap gap-2.5'>
              {tags.map((tag) => (
                <li key={tag.title}>
                  <Link
                    to={tag.slug.current === activeTag ? '/tags/' : `/tags/?search=${tag.slug.current}`}
                    className={`${tag.slug.current === activeTag && disabled} font-worksans font-light uppercase text-sm rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600 dark:bg-gray-300 dark:text-gray-800 dark:hover:bg-gray-200 py-1.5 px-2`}
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
          </SectionMiddle>
        </Section>
      </MarginedContainer>
    </PageSpace>
  )
}

export function Head() {
  return <SEO title="tags" />
}

export default TagsPage;