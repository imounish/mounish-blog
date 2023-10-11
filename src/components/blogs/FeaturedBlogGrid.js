import React from 'react';
import BlogItem from './BlogItem';

function FeaturedBlogGrid({ blogs }) {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-8 mb-8 sm:mb-10 lg:mb-12 mt-3 lg:mt-4 mx-auto px-4 lg:px-12">
        {blogs &&
          blogs.slice(0, 2).map((blog) => (
            <BlogItem
              key={blog.title}
              title={blog.title}
              path={blog.slug.current}
              categories={blog.categories}
              image={{
                imageData: blog.coverImage.asset.gatsbyImageData,
                altText: blog.coverImage.alt,
              }}
              publishedAt={blog.publishedAt}
              author={blog.author}
            />
          ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 sm:mt-10 lg:mt-12 mb-2 lg:mb-4 mx-auto px-4 lg:px-12">
        {blogs &&
          blogs.slice(2).map((blog) => (
            <BlogItem
              key={blog.title}
              title={blog.title}
              path={blog.slug.current}
              categories={blog.categories}
              image={{
                imageData: blog.coverImage.asset.gatsbyImageData,
                altText: blog.coverImage.alt,
              }}
              publishedAt={blog.publishedAt}
              author={blog.author}
            />
          ))}
      </div>
    </>
  );
}

export default FeaturedBlogGrid;
