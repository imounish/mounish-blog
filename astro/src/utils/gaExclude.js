// T3: Astro has no direct equivalent of gatsby-plugin-google-gtag's
// `exclude` option (a list of glob-ish path patterns skipped from
// pageview tracking) — that plugin hooks into Gatsby's client-side router;
// this is a fully static multi-page Astro build with no client router, so
// the closest equivalent is deciding at *build time*, per page, whether to
// render the GA script at all. `matchesExcludedPath` reproduces just enough
// glob behavior for the two patterns actually configured in
// gatsby-config.js today: `/preview/**` (prefix match) and
// `/do-not-track/me/too/` (exact match).
export function matchesExcludedPath(pathname, patterns) {
  return patterns.some((pattern) => {
    if (pattern.endsWith('/**')) {
      const prefix = pattern.slice(0, -2); // keep the trailing "/"
      return pathname.startsWith(prefix);
    }
    return pathname === pattern;
  });
}
