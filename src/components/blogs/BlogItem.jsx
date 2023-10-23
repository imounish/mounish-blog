import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import Title from '../typography/Title';
import TimeToRead from '../typography/TimeToRead';

function BlogItem({
  title,
  path,
  timeToRead,
  category,
  image,
  imageHeight,
  publishedAt,
}) {
  return (
    <article className="font-worksans overflow-hidden">
      <Link to={`/posts/${path}`}>
        <GatsbyImage
          image={image.imageData}
          alt={image.altText ? image.altText : ''}
          className="block h-auto w-full scale-100 rounded-md hover:scale-105"
          loading="lazy"
          style={{
            height: imageHeight,
            transition: '0.3s ease-in-out transform',
          }}
        />
      </Link>
      <header className="flex flex-col items-start pb-1 pt-3">
        <Title
          path={`/posts/${path}`}
          className="font-lora text-xl font-semibold md:text-2xl "
          highLightColor="green"
          leadingText={category ? category.title : ''}
        >
          {title}
        </Title>
      </header>
      {publishedAt && (
        <footer className="flex flex-row gap-2 py-1">
          <p className="w-full text-sm leading-4 text-gray-600">
            <span className="font-warnockcapt text-base font-bold italic">
              On{' '}
            </span>
            {new Date(publishedAt).toLocaleDateString('en-us', {
              // weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}

            {timeToRead && <TimeToRead separator timeToRead={timeToRead} />}
          </p>
        </footer>
      )}
    </article>
  );
}

export default BlogItem;
