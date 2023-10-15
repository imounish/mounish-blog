import React from 'react';
import BlogItem from './BlogItem';
import SectionTop from '../partials/SectionTop';

function BlogGrid({ blogs }) {
  return (
    <SectionTop className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs &&
        blogs.map((blog) => (
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
    // <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 sm:mt-10 lg:mt-12 mb-2 lg:mb-4 mx-auto px-4 lg:px-12">
    // </div>
  );
}

export default BlogGrid;
