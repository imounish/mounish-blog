import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import Title from '../typography/Title';
import TagsArray from '../tags/TagsArray';
import CategoryText from '../categories/CategoryText';
import TimeToRead from '../typography/TimeToRead';

function BlogItem({
  title,
  path,
  author,
  tags,
  timeToRead,
  category,
  image,
  imageHeight,
  publishedAt,
}) {
  return (
    <article className="overflow-hidden font-worksans">
      <Link to={`/posts/${path}`}>
        <GatsbyImage
          image={image.imageData}
          alt={image.altText ? image.altText : ""}
          className="block h-auto w-full rounded-md scale-100 hover:scale-105"
          loading="lazy"
          style={{
            height: imageHeight,
            transition: "0.3s ease-in-out transform",
          }}
        />
      </Link>
      <header className="flex flex-col items-start pt-3 pb-1">
        {/* <CategoryText
            category={category}
            colored={true}
            className="pt-2 pb-1 text-base"
          /> */}
        {/* <TagsArray
            tags={tags}
            className="flex flex-row items-center justify-start w-full text-sm gap-2 text-end pt-1 pb-1.5"
          /> */}
        <Title
          path={`/posts/${path}`}
          className="font-lora font-semibold text-xl md:text-2xl "
          highLightColor="green"
          leadingText={category.title}
        >
          {title}
        </Title>
      </header>
      {publishedAt && (
        <footer className="flex flex-row gap-2 py-1">
          <p className="text-sm text-gray-600 w-full leading-4">
            <span className="italic font-warnockcapt font-bold text-base">
              On{" "}
            </span>
            {new Date(publishedAt).toLocaleDateString("en-us", {
              // weekday: 'short',
              year: "numeric",
              month: "short",
              day: "numeric",
            })}

            {timeToRead && <TimeToRead separator={true} timeToRead={timeToRead} />}
          </p>
        </footer>
      )}
    </article>
  );
}

export default BlogItem;
