import React from 'react';
import BlogItem from './BlogItem';
import SectionTop from '../partials/SectionTop';
import SectionBottom from '../partials/SectionBottom';

function FeaturedBlogGrid({ blogs }) {
  return (
    <>
      <SectionTop className="grid sm:grid-cols-2 gap-8">
        {blogs &&
          blogs.slice(0, 2).map((blog) => (
            <BlogItem
              key={blog.title}
              title={blog.title}
              path={blog.slug.current}
              category={blog.category}
              timeToRead={blog.timeToRead}
              image={{
                imageData: blog.coverImage.asset.gatsbyImageData,
                altText: blog.coverImage.alt,
              }}
              imageHeight="256px"
              publishedAt={blog.publishedAt}
            />
          ))}
      </SectionTop>
      <SectionBottom className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs &&
          blogs.slice(2).map((blog) => (
            <BlogItem
              key={blog.title}
              title={blog.title}
              path={blog.slug.current}
              category={blog.category}
              image={{
                imageData: blog.coverImage.asset.gatsbyImageData,
                altText: blog.coverImage.alt,
              }}
              imageHeight="256px"
              publishedAt={blog.publishedAt}
            />
          ))}
      </SectionBottom>
    </>
  );
}

export default FeaturedBlogGrid;
