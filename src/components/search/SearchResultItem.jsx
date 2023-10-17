import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useContext } from 'react';
import { SearchModalContext } from '../../context/searchModalContext';


function BlogSearchResultItem({ blog }) {
  const { closeSearchModal } =
    useContext(SearchModalContext);
  return (
    <li>
      <Link to={`/posts/${blog.slug.current}`} onClick={closeSearchModal} className='flex flex-row items-start gap-2'>
        <GatsbyImage
          image={blog.coverImage.asset.gatsbyImageData}
          alt={blog.coverImage.alt}
          className="block w-2/12 rounded-lg"
        />
        <div className="flex flex-col w-10/12 gap-0.5">
          <h2 className="font-lora text-sm md:text-base  text-gray-900 dark:text-gray-100">
            {blog.category && (
              <span className="font-warnockdisp text-xs md:text-sm font-light pr-1">
                {blog.category.title}
              </span>
            )}
            {blog.title}
          </h2>
          <p className="font-worksans text-xs text-gray-600 dark:text-gray-400">
            <span className="italic font-warnockcapt font-bold">On </span>
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
    <li>
      <Link to={`/categories/${category.slug.current}`} onClick={closeSearchModal}>
        <h2 className="font-warnockdisp text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
          {category.title}
        </h2>
      </Link>
    </li>
  )
}

function AuthorSearchResultItem({ author }) {
  const { closeSearchModal } = useContext(SearchModalContext);
  return (
    <li>
      <Link to={`/authors/${author.slug.current}`} onClick={closeSearchModal} className='flex flex-row items-start gap-2'>
        <GatsbyImage
          image={author.profileImage.asset.gatsbyImageData}
          alt={author.profileImage.alt}
          className="block w-1/12 rounded-full h-[45.34px]"
        />
        <div className={`flex flex-col w-11/12 ${author.description ? '' : 'h-[45.34px] justify-around'}`}>
          <h2 className="font-warnockdisp text-base md:text-lg text-gray-900 dark:text-gray-100">
            {author.name}
          </h2>
          {author.description && <p className="font-worksans text-xs text-gray-600 dark:text-gray-400">
            <span className="italic font-warnockcapt font-bold">{author.description}</span>
          </p>}
        </div>
      </Link>
    </li>
  )
}

export {BlogSearchResultItem, CategorySearchResultItem, AuthorSearchResultItem};