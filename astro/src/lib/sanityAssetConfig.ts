/**
 * Project/dataset pair for @sanity/asset-utils's `getFileAsset`/`tryGetFileAsset`
 * (used by the `videoAnimation` Portable Text type in ./portableText.tsx to
 * resolve file (non-image) asset references, mirroring
 * ../../../src/utils/videoUrl.js's `videoAssetFor`).
 *
 * `sanity:client`'s config isn't reusable for this since @sanity/asset-utils
 * wants a plain `{ projectId, dataset }` object, not a client instance.
 */
export const sanityAssetConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
};
