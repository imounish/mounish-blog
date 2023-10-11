import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { hoverUnderlineAnimation } from './BlogItem.module.css';

function BlogItem({ title, path, author, categories, image, publishedAt }) {
  return (
    <div className="flex flex-wrap">
      <article className="overflow-hidden">
        <Link to={`/posts/${path}`}>
          <GatsbyImage
            image={image.imageData}
            alt={image.altText}
            className="block h-auto w-full rounded-md scale-100 hover:scale-105"
            loading="lazy"
            style={{
              height: '258px',
              transition: '0.3s ease-in-out transform',
            }}
          />
        </Link>
        <header className="flex flex-col items-start leading-tight">
          <ul className="flex flex-row items-center w-full font-worksans pt-2 pb-1 text-base">
            {categories.map((category) => (
              <li key={category.title} className="pr-2">
                <Link
                  to={`/categories/${category.slug.current}`}
                  style={{ color: `${category.color}` }}
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>

          <h1 className="text-xl font-worksans tracking-tight font-semibold">
            <Link
              className={`no-underline text-gray-900 dark:text-gray-50 ${hoverUnderlineAnimation}`}
              to={`/posts/${path}`}
            >
              {title}
            </Link>
          </h1>
        </header>

        <footer className="flex items-center justify-start leading-none py-2 md:pt-3">
          <Link
            className="flex items-center text-sm text-gray-800 dark:text-gray-400 font-worksans"
            to={`/author/${author.slug.current}`}
          >
            <GatsbyImage
              alt={author.profileImage.asset.altText}
              className="block rounded-full"
              image={author.profileImage.asset.gatsbyImageData}
            />
            <p className="ml-2">{author.name}</p>
          </Link>
          <p className="mx-2 text-gray-700 dark:text-gray-400"> &#9679; </p>
          <p className="text-sm text-gray-600">
            {new Date(publishedAt).toLocaleDateString('en-us', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </footer>
      </article>
    </div>
  );
}

export default BlogItem;
