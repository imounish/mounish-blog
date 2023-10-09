require('dotenv').config('./.env');

module.exports = {
  siteMetadata: {
    title: `mounish-blog`,
    siteUrl: `https://blog.mounish.dev`,
    description: `A website where you can read articles, tutorials, and updates from Mounish as he dives into depths of imagination, weaves words into captivating stories.`,
  },
  plugins: ['gatsby-plugin-postcss', 'gatsby-plugin-dark-mode'],
};
