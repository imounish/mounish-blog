module.exports = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  watchMode: true,
  token: process.env.SANITY_TOKEN,
  overlayDrafts: true,
};
