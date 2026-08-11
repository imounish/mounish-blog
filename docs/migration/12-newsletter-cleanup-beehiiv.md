# T12 — Newsletter cleanup: drop dead Mailchimp code, port working Beehiiv function

**Priority:** P2
**Depends on:** T1, T3
**Tracker:** [00-tracker.md](00-tracker.md)

## Goal

**This is not a provider migration.** The newsletter backend is already Beehiiv and already works — confirmed by reading `netlify/functions/subscribe-user/subscribe-user.js`, which posts to `BEEHIIV_API_URL`/`BEEHIIV_PUBLICATION_ID` using `BEEHIIV_API_KEY`. The task here is (1) delete dead Mailchimp code left over from before that switch, and (2) carry the working Beehiiv integration into the new `/astro` app, including relocating the Netlify Function so its path resolves correctly once the site's `base` is `/astro`.

## Current state

- `netlify/functions/subscribe-user/subscribe-user.js`: the working handler — reads `BEEHIIV_API_URL`, `BEEHIIV_API_KEY`, `BEEHIIV_PUBLICATION_ID` from `process.env`, POSTs to `${BEEHIIV_API_URL}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`. This function is framework-agnostic and needs no logic changes — only relocation.
- `src/components/newsletter/FormContainer.jsx`: the actually-used frontend form, posts via axios to `process.env.GATSBY_NETLIFY_BEEHIIV_API_URL` (i.e. the Netlify Function's own URL, not Beehiiv directly) — this is the component wired into `SignUpModal.jsx`.
- `src/components/newsletter/MailchimpFormContainer.jsx`: **dead code** — imports `react-mailchimp-subscribe`, but nothing in the app imports this component. Delete it.
- `react-mailchimp-subscribe` in `package.json`: dead dependency, remove it.
- Any stale Mailchimp-related env vars (e.g. `GATSBY_APP_MAILCHIMP_U`/`_ID`-style vars, if present) — remove, don't port.
- `src/components/newsletter/SignUpForm.jsx`/`SignUpModal.jsx` and `src/context/signUpModalContext.jsx`: the modal/trigger UI wrapping the form — presentational + a small amount of open/close state, straightforward to port as a lightly-hydrated island.

## Steps

1. In the Gatsby codebase (or directly during this Astro task — either is fine since this file itself isn't shipped, only its logic), confirm `MailchimpFormContainer.jsx` truly has zero imports before deleting anything, then remove it and the `react-mailchimp-subscribe` dependency.
2. Move `netlify/functions/subscribe-user/` into `astro/netlify/functions/subscribe-user/` — since T1's `netlify.toml` sets `base = "astro"` for the migration branch context, Netlify will look for functions relative to that base. Moving the function under `/astro` keeps the whole app self-contained and avoids needing a `functions = "../netlify/functions"` relative override.
3. Port `FormContainer.jsx`, `SignUpForm.jsx`, `SignUpModal.jsx`, and `signUpModalContext.jsx` into the Astro app as a lightly-hydrated island (the form needs `onSubmit` handling and the modal needs open/close state — both genuinely interactive).
4. Rename the client-read env var per the tracker's table: `GATSBY_NETLIFY_BEEHIIV_API_URL` → `PUBLIC_BEEHIIV_API_URL` (or similar `PUBLIC_`-prefixed name) in both the component and the Netlify branch context — this is the one var in this task that actually needs the prefix, since it's read client-side; the three `BEEHIIV_*` vars used inside the function itself stay unprefixed and server-only.
5. Test an actual signup submission against the branch-preview deploy and confirm it lands in Beehiiv (check the Beehiiv dashboard for the test subscriber, then remove/unsubscribe it afterward if you don't want test data lingering in the real list).

## Netlify / config notes

- This is the task where the "functions path resolves relative to `base`" gotcha (flagged in the tracker) actually gets resolved, by relocating the function rather than fighting the default resolution.
- Make sure the four Beehiiv-related env vars (three server-side + the one `PUBLIC_` client var) are added to the `astro-migration` branch's Netlify context before testing — a missing var here fails silently as a broken form submission, not a build error.

## Definition of done

- [ ] `MailchimpFormContainer.jsx` and `react-mailchimp-subscribe` are deleted from the codebase (from wherever they currently live, Gatsby-side or ported-and-then-deleted Astro-side — either way, they shouldn't exist in the final state).
- [ ] Any stale Mailchimp env vars are removed, not carried forward.
- [ ] `netlify/functions/subscribe-user` lives under `/astro/netlify/functions/` and is reachable from the branch-preview deploy.
- [ ] A real end-to-end signup test on the branch-preview site successfully creates a subscriber in Beehiiv.
- [ ] No automated tests required — this task's verification is inherently a live, manual API round-trip test.
