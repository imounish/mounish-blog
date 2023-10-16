import { Link, graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import { blogImageContainer, disabled } from './CategoryCatalogue.module.css';

import DescriptionText from '../typography/DescriptionText';
import { GatsbyImage } from 'gatsby-plugin-image';
import Title from '../typography/Title';

const CustomBlogItem = ({ blog, category, pageSlug }) => (
  <div className="font-worksans">
    <Link
      to={blog.slug.current !== pageSlug ? `/posts/${blog.slug.current}` : ''}
      className={`${blog.slug.current === pageSlug && disabled} `}
    >
      <GatsbyImage
        image={blog.coverImage.asset.gatsbyImageData}
        alt={blog.coverImage.alt || ''}
        className={`block h-auto w-full rounded-md scale-100 hover:scale-105 ${blogImageContainer}`}
        loading="lazy"
        style={{
          transition: '0.3s ease-in-out transform',
        }}
      />
      <h2 className="pt-2 pb-1 w-full no-underline text-gray-800 dark:text-gray-200 font-lora font-normal text-base xl:text-lg">
        <span className="font-warnockdisp text-sm xl:text-base font-light no-underline text-gray-800 dark:text-gray-200 pr-2">
          {category.title}
        </span>
        {blog.title}
      </h2>
    </Link>
  </div>
);

function CategoryCatalogue({ category, pagePath, className }) {
  const [toggleViewAll, setToggleViewAll] = useState(false);

  const toggleHandler = () => {
    setToggleViewAll((current) => !current);
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
  const cleanedBlogs = allSanityBlog.nodes.filter((blog) => blog.category);

  // selecting those blogs which match the given category
  const selectedBlogs = cleanedBlogs
    .filter((blog) => blog.category._id === category._id)
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
      className={`grid lg:grid-cols-4 gap-4 pb-6 lg:pb-8 ${className || ''}`}
    >
      {/* category pane */}
      <div className="lg:col-span-1">
        <div className="sm:col-span-2 sm:row-span-5 flex flex-col justify-between">
          <Title
            className="pb-1.5 pt-1 sm:pt-0 font-warnockdisp font-medium text-2xl sm:text-3xl"
            path={`/categories/${category.slug.current}`}
            highLightColor="maroon"
          >
            {category.title}
          </Title>
          <div className='italic'>
            <DescriptionText value={category._rawDescription} />
          </div>
          <button
            type="button"
            onClick={toggleHandler}
            className="pt-2 sm:pt-3 w-fit font-worksans text-md text-start capitalize text-gray-800 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300"
          >
            SEE {toggleViewAll ? 'LESS' : 'ALL'}
          </button>
        </div>
      </div>
      {/* posts pane */}
      <div className="lg:col-span-3">
        <div className="hidden lg:grid grid-cols-3 gap-4">
          {selectedBlogs &&
            selectedBlogs
              .slice(0, 3)
              .map((blog) => (
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
              .map((blog) => (
                <CustomBlogItem
                  key={blog.title}
                  blog={blog}
                  category={category}
                  pageSlug={pageSlug}
                />
              ))}
        </div>
        <div className="grid lg:hidden grid-cols-2 gap-4">
          {selectedBlogs &&
            selectedBlogs
              .slice(0, 2)
              .map((blog) => (
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
              .map((blog) => (
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
