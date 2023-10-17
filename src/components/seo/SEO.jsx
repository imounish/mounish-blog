import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';


function SEO({ title, description, featuredImage }) {
  const { defaultFeaturedImage, site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          siteURL
          og {
            siteName
            twitterCreator
          }
        }
      }
      defaultFeaturedImage: file(
        absolutePath: { glob: "**/src/images/banner.png" }
      ) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `);

  const ogImage =
    featuredImage ?? defaultFeaturedImage?.childImageSharp?.gatsbyImageData;

  const seoTitle = title
      ? `${title} | ${site.siteMetadata.title}`
      : site.siteMetadata.title

  const location = useLocation();

  const metas = [
    // basic seo
    {
      name: 'description',
      content: description || site.siteMetadata.description,
    },
    {
      name: 'og:image',
      content: ogImage.images.fallback.src,
    },
    {
      name: 'og:image:width',
      content: `${ogImage.width}`,
    },
    {
      name: 'og:image:height',
      content: `${ogImage.height}`,
    },
    {
      name: 'og:type',
      content: 'website',
    },
    {
      name: 'og:title',
      content: title,
    },
    {
      name: 'og:description',
      content: description,
    },
    {
      name: 'og:site_name',
      content: site.siteMetadata.og.siteName,
    },
    {
      name: 'og:url',
      content: `${site.siteMetadata.siteURL}${location.pathname}`,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:image',
      content: ogImage.images.fallback.src,
    },
    {
      name: 'twitter:creator',
      content: site.siteMetadata.og.twitterCreator,
    },
  ];

  const iconLinks = (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#b83854" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000000" />
    </>
  );

  return (
    <>
      <html lang="en" />
      <meta charSet='utf-8' />
      <title>
        {seoTitle}
      </title>
      {iconLinks}
      <meta name='robots' content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
      {metas.map(meta => (
        <meta key={meta.name} name={meta.name} content={meta.content} />
      ))}
    </>
  );
}

export default SEO;

/**
 *   const og = {
    title: title || site.siteMetadata.title,
    type: 'website',
    url: site.siteMetadata.siteURL + path,
    image: '' || image
  }

  // <meta property="og:type" content="video.movie" />
<meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
<meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" />

 */