import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useContext } from 'react';
import { SearchModalContext } from '../../context/searchModalContext';

function BlogSearchResultItem({ blog }) {
  const { closeSearchModal } = useContext(SearchModalContext);
  return (
    <li>
      <Link
        to={`/posts/${blog.slug.current}`}
        onClick={closeSearchModal}
        className="flex flex-row items-start gap-2"
      >
        <GatsbyImage
          image={blog.coverImage.asset.gatsbyImageData}
          alt={blog.coverImage.alt}
          className="block w-2/12 rounded-lg"
        />
        <div className="flex w-10/12 flex-col gap-0.5">
          <h2 className="font-lora text-sm text-gray-900  dark:text-gray-100 md:text-base">
            {blog.category && (
              <span className="font-warnockdisp pr-1 text-xs font-light md:text-sm">
                {blog.category.title}
              </span>
            )}
            {blog.title}
          </h2>
          <p className="font-worksans text-xs text-gray-600 dark:text-gray-400">
            <span className="font-warnockcapt font-bold italic">On </span>
            {new Date(blog.publishedAt).toLocaleDateString('en-us', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
      </Link>
    </li>
  );
}

function CategorySearchResultItem({ category }) {
  const { closeSearchModal } = useContext(SearchModalContext);
  return (
    <li className="w-fit">
      <Link
        to={`/categories/${category.slug.current}`}
        onClick={closeSearchModal}
      >
        <h2 className="font-warnockdisp text-base font-semibold text-gray-900 dark:text-gray-100 md:text-lg">
          {category.title}
        </h2>
      </Link>
    </li>
  );
}

function TagSearchResultItem({ tag }) {
  const { closeSearchModal } = useContext(SearchModalContext);
  return (
    <li>
      <Link
        to={`/tags/?search=${tag.slug.current}`}
        onClick={closeSearchModal}
        className=" font-worksans rounded-md bg-gray-700 px-2 py-1.5 text-sm font-light uppercase text-gray-200 hover:bg-gray-600 dark:bg-gray-400 dark:text-black dark:hover:bg-gray-200"
      >
        {tag.title}
      </Link>
    </li>
  );
}

function AuthorSearchResultItem({ author }) {
  const { closeSearchModal } = useContext(SearchModalContext);
  return (
    <li>
      <Link
        to={`/authors/${author.slug.current}`}
        onClick={closeSearchModal}
        className="flex flex-row items-start gap-2"
      >
        <GatsbyImage
          image={author.profileImage.asset.gatsbyImageData}
          alt={author.profileImage.alt}
          className="block w-1/6 rounded-full"
        />
        <div className="flex w-5/6 flex-col justify-around">
          <h2 className="font-warnockdisp text-sm text-gray-900 dark:text-gray-100 sm:text-base">
            {author.name}
          </h2>
          {author.description && (
            <p className="font-worksans text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
              <span className="font-warnockcapt font-bold italic">
                {author.description}
              </span>
            </p>
          )}
        </div>
      </Link>
    </li>
  );
}

export {
  BlogSearchResultItem,
  CategorySearchResultItem,
  TagSearchResultItem,
  AuthorSearchResultItem,
};
