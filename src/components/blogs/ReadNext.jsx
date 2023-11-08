import { Link, graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { blogImageContainer } from "./ReadNext.module.css";

function CustomBlogItem({ blog }) {
  return (
    <li className="font-worksans">
      <Link to={`/posts/${blog.slug.current}`} title={blog.title}>
        <GatsbyImage
          image={blog.coverImage.asset.gatsbyImageData}
          alt={blog.coverImage.alt || ''}
          className={`block h-auto w-full scale-100 rounded-md hover:scale-105 ${blogImageContainer}`}
          loading="lazy"
          style={{
            transition: '0.3s ease-in-out transform',
          }}
        />
        <h2 className="font-lora w-full pb-1 pt-2 font-normal text-gray-800 no-underline dark:text-gray-200 xl:text-lg">
          <span className="font-warnockdisp pr-2 text-sm font-light text-gray-800 no-underline dark:text-gray-200 xl:text-base">
            {blog.category.title}
          </span>
          {blog.title}
        </h2>
      </Link>
    </li>
  );
}

function ReadNext({ readNext }) {
  const { allSanityBlog } = useStaticQuery(graphql`
    {
      allSanityBlog {
        nodes {
          id
          title
          slug {
            current
          }
          category {
            title
          }
          coverImage {
            alt
            asset {
              gatsbyImageData(placeholder: BLURRED)
              altText
            }
          }
        }
      }
    }
  `);

  const allBlogs = allSanityBlog.nodes;
  const readNextBlogs = [];

  if (readNext.length !== 0) {
    /* eslint-disable-next-line no-plusplus */
    for (let i = 0; i < readNext.length; i++) {
      readNextBlogs.push(
        allBlogs.find(
          currentBlog => currentBlog.slug.current === readNext[i].current
        )
      );
    }
  }

  return (
    <div className="py-2 ml-8">
      <h2
        className="font-warnockdisp pt-1 text-2xl sm:pt-0 sm:text-3xl lowercase font-semibold dark:text-gray-50 text-black tracking-wide"
      >
        read next
      </h2>
      <ul className="flex flex-col gap-4 mt-2">
        {readNextBlogs.map(blog => (
          <CustomBlogItem key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  );
}

export default ReadNext