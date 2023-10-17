import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

function SEO({ title, description }) {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  const seo = {
    title: title
      ? `${title} | ${site.siteMetadata.title}`
      : site.siteMetadata.title,
    description: description || site.siteMetadata.description,
  };

  return (
    <>
      <title>
        {seo.title}
      </title>
      <meta name="description" content={seo.description} />
    </>
  );
}

export default SEO;