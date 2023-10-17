/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config('./.env');
const sanityConfig = require('./sanity.config');

module.exports = {
  siteMetadata: {
    title: `mounish's blog`,
    siteURL: `https://blog.mounish.dev`,
    description: `A website where you can read articles, tutorials, and updates from Mounish as he dives into depths of imagination, weaves words into captivating stories.`,
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-dark-mode',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...sanityConfig,
      },
    },
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-YF4936QF3P', // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        // gtagConfig: {
        //   optimize_id: "OPT_CONTAINER_ID",
        //   anonymize_ip: true,
        //   cookie_expires: 0,
        // },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ['/preview/**', '/do-not-track/me/too/'],
          // Defaults to https://www.googletagmanager.com
          // origin: "YOUR_SELF_HOSTED_ORIGIN",
          // Delays processing pageview events on route update (in milliseconds)
          // delayOnRouteUpdate: 0,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: `blogs`,
        engine: `flexsearch`,
        engineOptions: {
          tokenize: 'forward',
        },
        query: `
        {
          allSanityBlog {
            nodes {
              id
              title
              publishedAt
              slug {
                current
              }
              category {
                title
              }
              coverImage {
                alt
                asset {
                  gatsbyImageData(placeholder: BLURRED, width: 256, height: 256)
                }
              }
            }
          }
        }
        `,
        ref: 'id',
        index: ['title'],
        store: ['id', 'title', 'category', 'publishedAt', 'slug', 'coverImage'],
        normalizer: ({ data }) =>
          data.allSanityBlog.nodes.map(node => ({
            id: node.id,
            title: node.title,
            category: node.category,
            publishedAt: node.publishedAt,
            slug: node.slug,
            coverImage: node.coverImage,
          })),
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: `categories`,
        engine: `flexsearch`,
        engineOptions: {
          tokenize: 'forward',
        },
        query: `
        {
          allSanityCategory {
            nodes {
              id
              title
              slug {
                current
              }
            }
          }
        }
        `,
        ref: 'id',
        index: ['title'],
        store: ['id', 'title', 'slug'],
        normalizer: ({ data }) =>
          data.allSanityCategory.nodes.map(node => ({
            id: node.id,
            title: node.title,
            slug: node.slug,
          })),
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: `authors`,
        engine: `flexsearch`,
        engineOptions: {
          tokenize: 'forward',
        },
        query: `
        {
          allSanityAuthor {
            nodes{
              id
              name
              description
              slug {
                current
              }
              profileImage {
                alt
                asset{
                  gatsbyImageData
                }
              }
            }
          }
        }
        `,
        ref: 'id',
        index: ['name'],
        store: ['id', 'name', 'description', 'slug', 'profileImage'],
        normalizer: ({ data }) =>
          data.allSanityAuthor.nodes.map(node => ({
            id: node.id,
            name: node.name,
            description: node.description,
            slug: node.slug,
            profileImage: node.profileImage,
          })),
      },
    },
  ],
};
