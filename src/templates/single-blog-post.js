import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import Seo from '../components/seo/Seo';
import MyPortableText from "../components/typography/MyPortableText";

export const postQuery = graphql`
  query SingleBlogQuery($id: String!) {
    sanityBlog(id: { eq: $id }) {
      title
      publishedAt
      _rawBody
      coverImage {
        alt
        asset {
          gatsbyImageData
        }
      }
      categories {
        title
        slug {
          current
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
`;

function SingleBlogPost({ data }) {
  const blog = data.sanityBlog;
  return (
    <article>
      <section>
        <Seo title={blog.title} />
        <GatsbyImage
          image={blog.coverImage.asset.gatsbyImageData}
          alt={blog.coverImage.alt}
          className="h-40"
        />
        <h1>{blog.title}</h1>
        <p>
          {new Date(blog.publishedAt).toLocaleDateString("en-us", {
            // weekday: 'short',
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <ul>
          {blog.categories.map((category) => (
            <li key={category.slug.current}>
              <Link to={`/categories/${category.slug.current}`}>
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
        {/* <p>
          <Link to={`/author/${blog.author.slug.current}`}>
            {blog.author.name}
          </Link>
        </p> */}
      </section>
      <section>
        <MyPortableText value={blog._rawBody}></MyPortableText>
      </section>
    </article>
  );
}

export default SingleBlogPost;
