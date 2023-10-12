import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import Title from '../typography/Title';

function BlogItem({ title, path, author, categories, image, publishedAt }) {
  return (
    <div className="flex flex-wrap">
      <article className="overflow-hidden font-worksans">
        <Link to={`/posts/${path}`}>
          <GatsbyImage
            image={image.imageData}
            alt={image.altText ? image.altText : ''}
            className="block h-auto w-full rounded-md scale-100 hover:scale-105"
            loading="lazy"
            style={{
              height: '258px',
              transition: '0.3s ease-in-out transform',
            }}
          />
        </Link>
        <header className="flex flex-col items-start leading-tight">
          <ul className="flex flex-row items-center w-full pt-2 pb-1 text-base">
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
          <Title path={`/posts/${path}`} highLightColor="green">
            {title}
          </Title>
        </header>

        <footer className="flex items-center justify-start leading-none py-1">
          {/* 
          // commenting the author section
          <Link
            className="flex items-center text-sm text-gray-800 dark:text-gray-400"
            to={`/author/${author.slug.current}`}
          >
            <GatsbyImage
              alt={
                author.profileImage.asset.altText
                  ? author.profileImage.asset.altText
                  : ''
              }
              className="block rounded-full"
              image={author.profileImage.asset.gatsbyImageData}
            />
            <p className="ml-2">{author.name}</p>
          </Link>
          <p className="mx-2 text-gray-700 dark:text-gray-400 text-xs">
            {' '}
            &#9679;{' '}
          </p> */}
          <p className="text-sm text-gray-600">
            <span className='italic font-warnockcapt font-bold text-base'>On </span>
            {new Date(publishedAt).toLocaleDateString('en-us', {
              // weekday: 'short',
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
