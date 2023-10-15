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
              tags={blog.tags}
              category={blog.category}
              timeToRead={blog.timeToRead}
              image={{
                imageData: blog.coverImage.asset.gatsbyImageData,
                altText: blog.coverImage.alt,
              }}
              imageHeight="256px"
              publishedAt={blog.publishedAt}
              author={blog.author}
            />
          ))}
      </SectionTop>
      {/* <div className="grid sm:grid-cols-2 gap-8 mb-8 sm:mb-10 lg:mb-12 mt-3 lg:mt-4 mx-auto px-4 lg:px-12">

      </div> */}
      <SectionBottom className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs &&
          blogs.slice(2).map((blog) => (
            <BlogItem
              key={blog.title}
              title={blog.title}
              path={blog.slug.current}
              tags={blog.tags}
              category={blog.category}
              image={{
                imageData: blog.coverImage.asset.gatsbyImageData,
                altText: blog.coverImage.alt,
              }}
              imageHeight="256px"
              publishedAt={blog.publishedAt}
              author={blog.author}
            />
          ))}
      </SectionBottom>
      {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 sm:mt-10 lg:mt-12 mb-2 lg:mb-4 mx-auto px-4 lg:px-12"></div> */}
    </>
  );
}

export default FeaturedBlogGrid;
