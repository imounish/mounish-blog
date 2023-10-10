import React from 'react';
import BlogItem from './BlogItem';

function BlogGrid({ blogs }) {
  return (
    <div className="flex flex-row items-center justify-start">
      {blogs &&
        blogs.map((blog) => (
          <BlogItem
            title={blog.title}
            path={blog.slug.current}
            categories={blog.categories}
            image={{
              imageData: blog.coverImage.asset.gatsbyImageData,
              altText: blog.coverImage.alt,
            }}
            publishedAt={blog.publishedAt}
          />
        ))}
    </div>
  );
}

export default BlogGrid;
