#!/usr/bin/env node
// Pagefind indexes the *built* HTML in dist/ (see docs/migration/13-search-pagefind.md)
// — it has nothing to serve during `astro dev`, so SearchModal.jsx's
// `import('/pagefind/pagefind.js')` 404s there by design. Pagefind's own docs
// recommend copying the generated dist/pagefind directory into public/ so the
// dev server serves it as a static asset (https://pagefind.app/docs/ci/).
//
// Usage:
//   node scripts/sync-pagefind-dev.mjs          # skip if public/pagefind already exists
//   node scripts/sync-pagefind-dev.mjs --force  # always rebuild + resync (e.g. after content changes)
import { existsSync, rmSync, cpSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const distPagefind = path.join(root, 'dist', 'pagefind');
const publicPagefind = path.join(root, 'public', 'pagefind');
const force = process.argv.includes('--force');

if (existsSync(publicPagefind) && !force) {
  console.log(
    '[pagefind:sync] public/pagefind already exists, skipping. Run `npm run pagefind:sync` to refresh it after content changes.'
  );
  process.exit(0);
}

if (!existsSync(distPagefind) || force) {
  console.log('[pagefind:sync] Building the site so Pagefind has something to index...');
  // Invoked directly (not via `npm run build`) so this can never trigger an
  // npm lifecycle hook — this script must stay unreachable from any hook
  // npm's `build` script fires, or a predev/postbuild wire-up would recurse.
  execFileSync('npx', ['astro', 'build'], { cwd: root, stdio: 'inherit' });
  execFileSync('npx', ['pagefind', '--site', 'dist'], { cwd: root, stdio: 'inherit' });
}

console.log('[pagefind:sync] Copying dist/pagefind -> public/pagefind for the dev server...');
rmSync(publicPagefind, { recursive: true, force: true });
cpSync(distPagefind, publicPagefind, { recursive: true });
console.log(
  '[pagefind:sync] Done. Search now works under `astro dev`. This copy is a snapshot — rerun `npm run pagefind:sync` after content changes to refresh it.'
);
