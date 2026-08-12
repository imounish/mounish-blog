/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

// T6: client-exposed Sanity project/dataset, used by ./lib/sanityAssetConfig.ts
// (@sanity/asset-utils needs a plain {projectId, dataset} object, separate
// from sanity:client's own config, to resolve file/video asset references
// inline in Portable Text bodies).
interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
}

// T6: @types/react-syntax-highlighter only ships types for the package's
// top-level export, not its per-theme deep imports (same
// `react-syntax-highlighter/dist/esm/styles/prism/vs-dark` path RichText.jsx
// already imports in the Gatsby app, just untyped there since Gatsby's build
// doesn't type-check .jsx). Declared here so `astro check` doesn't fail on
// the deep import in src/lib/portableText.tsx.
declare module 'react-syntax-highlighter/dist/esm/styles/prism/vs-dark' {
  const style: Record<string, Record<string, string>>;
  export default style;
}
