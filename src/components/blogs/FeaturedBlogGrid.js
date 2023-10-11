import React from 'react';
import BlogItem from './BlogItem';

function FeaturedBlogGrid({ blogs }) {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-8 my-8 sm:my-10 lg:my-12 mx-auto px-4 lg:px-12">
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8 sm:my-10 lg:my-12 mx-auto px-4 lg:px-12">
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
