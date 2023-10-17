import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from 'gatsby';
import React from 'react'

function AuthorDisplay({ author }) {
  return (
    <Link
      className="flex items-center text-sm text-gray-800 dark:text-gray-400"
      to={`/author/${author.slug.current}`}
    >
      <GatsbyImage
        alt={
          author.profileImage.asset.altText
            ? author.profileImage.asset.altText
            : ""
        }
        className="block rounded-full"
        image={author.profileImage.asset.gatsbyImageData}
      />
      <p className="ml-2">{author.name}</p>
    </Link>
  );
}

export default AuthorDisplay