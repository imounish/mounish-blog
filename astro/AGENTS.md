## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

### Search (Pagefind) in dev mode

Pagefind indexes the *built* HTML in `dist/`, not the live dev server — `astro dev` alone has nothing to serve at `/pagefind/pagefind.js`, so the search modal 404s until you run:

```
npm run pagefind:sync
```

once (builds the site and copies `dist/pagefind` into `public/pagefind`, which the dev server then serves as a static asset). This is a snapshot, not live — rerun `npm run pagefind:sync` (or plain `npm run dev`, which triggers the same sync via its `predev` hook) after Sanity content changes if you need search to reflect them locally. `astro dev --background` does not trigger `predev`, since it calls the `astro` binary directly rather than going through npm.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
