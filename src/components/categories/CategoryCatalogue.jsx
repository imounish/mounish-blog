import { Link, graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useState } from 'react';
import DescriptionText from '../typography/DescriptionText';
import Title from '../typography/Title';
import { blogImageContainer, disabled } from './CategoryCatalogue.module.css';

function CustomBlogItem({ blog, category, pageSlug }) {
  if (blog.slug.current === pageSlug) {
    return (
      <div className={disabled}>
        <GatsbyImage
          image={blog.coverImage.asset.gatsbyImageData}
          alt={blog.coverImage.alt || ''}
          className={`block h-auto w-full scale-100 rounded-md hover:scale-105 ${blogImageContainer}`}
          loading="lazy"
          style={{
            transition: '0.3s ease-in-out transform',
          }}
        />
        <h2 className="font-lora w-full pb-1 pt-2 text-base font-normal text-gray-800 no-underline dark:text-gray-200 xl:text-lg">
          <span className="font-warnockdisp pr-2 text-sm font-light text-gray-800 no-underline dark:text-gray-200 xl:text-base">
            {category.title}
          </span>
          {blog.title}
        </h2>
      </div>
    );
  }
  return (
    <div className="font-worksans">
      <Link to={`/posts/${blog.slug.current}`}>
        <GatsbyImage
          image={blog.coverImage.asset.gatsbyImageData}
          alt={blog.coverImage.alt || ''}
          className={`block h-auto w-full scale-100 rounded-md hover:scale-105 ${blogImageContainer}`}
          loading="lazy"
          style={{
            transition: '0.3s ease-in-out transform',
          }}
        />
        <h2 className="font-lora w-full pb-1 pt-2 text-base font-normal text-gray-800 no-underline dark:text-gray-200 xl:text-lg">
          <span className="font-warnockdisp pr-2 text-sm font-light text-gray-800 no-underline dark:text-gray-200 xl:text-base">
            {category.title}
          </span>
          {blog.title}
        </h2>
      </Link>
    </div>
  );
}

function CategoryCatalogue({ category, pagePath, className }) {
  const [toggleViewAll, setToggleViewAll] = useState(false);

  const toggleHandler = () => {
    setToggleViewAll(current => !current);
  };

  const { allSanityBlog } = useStaticQuery(graphql`
    {
      allSanityBlog {
        nodes {
          id
          title
          publishedAt
          slug {
            current
          }
          category {
            title
            _id
            color
            slug {
              current
            }
          }
          coverImage {
            alt
            asset {
              gatsbyImageData(placeholder: BLURRED)
              altText
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
    }
  `);

  // excluding blogs which do not have a category present
  const cleanedBlogs = allSanityBlog.nodes.filter(blog => blog.category);

  // selecting those blogs which match the given category
  const selectedBlogs = cleanedBlogs
    .filter(blog => blog.category._id === category._id)
    .sort((a, b) => {
      const da = new Date(a.publishedAt);
      const db = new Date(b.publishedAt);
      return db - da;
    });

  const pageSlug = String(pagePath.slice(pagePath.indexOf('/', 1))).replace(
    /\//g,
    ''
  );

  return (
    <div
      className={`grid gap-4 pb-6 lg:grid-cols-4 lg:pb-8 ${className || ''}`}
    >
      {/* category pane */}
      <div className="lg:col-span-1">
        <div className="flex flex-col justify-between sm:col-span-2 sm:row-span-5">
          <Title
            className="font-warnockdisp pb-1.5 pt-1 text-2xl font-medium sm:pt-0 sm:text-3xl"
            path={`/categories/${category.slug.current}`}
            highLightColor="maroon"
          >
            {category.title}
          </Title>
          <div className="italic sm:pr-2">
            <DescriptionText value={category._rawDescription} />
          </div>
          <button
            type="button"
            onClick={toggleHandler}
            className="font-worksans text-md w-fit pt-2 text-start capitalize text-gray-800 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300 sm:pt-3"
          >
            SEE {toggleViewAll ? 'LESS' : 'ALL'}
          </button>
        </div>
      </div>
      {/* posts pane */}
      <div className="lg:col-span-3">
        <div className="hidden grid-cols-3 gap-4 lg:grid">
          {selectedBlogs &&
            selectedBlogs
              .slice(0, 3)
              .map(blog => (
                <CustomBlogItem
                  blog={blog}
                  key={blog.title}
                  category={category}
                  pageSlug={pageSlug}
                />
              ))}
          {toggleViewAll &&
            selectedBlogs &&
            selectedBlogs
              .slice(3)
              .map(blog => (
                <CustomBlogItem
                  key={blog.title}
                  blog={blog}
                  category={category}
                  pageSlug={pageSlug}
                />
              ))}
        </div>
        <div className="grid grid-cols-2 gap-4 lg:hidden">
          {selectedBlogs &&
            selectedBlogs
              .slice(0, 2)
              .map(blog => (
                <CustomBlogItem
                  key={blog.title}
                  blog={blog}
                  category={category}
                  pageSlug={pageSlug}
                />
              ))}
          {toggleViewAll &&
            selectedBlogs &&
            selectedBlogs
              .slice(2)
              .map(blog => (
                <CustomBlogItem
                  key={blog.title}
                  blog={blog}
                  category={category}
                  pageSlug={pageSlug}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryCatalogue;
