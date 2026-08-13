// T12: ported from src/components/newsletter/FormContainer.jsx (Gatsby
// app), with two adaptations:
//   1. Env var renamed per the tracker's table: `GATSBY_NETLIFY_BEEHIIV_API_URL`
//      -> `PUBLIC_BEEHIIV_API_URL`, read via `import.meta.env` (Astro/Vite
//      convention) instead of `process.env` (Gatsby/webpack convention).
//      This is still just the Netlify Function's own URL (relative path to
//      astro/netlify/functions/subscribe-user), not a direct call to
//      Beehiiv — the three BEEHIIV_* secrets stay server-side, read only
//      inside that function.
//   2. `axios` isn't a dependency of the Astro app — replaced with native
//      `fetch` (no behavior change).
import React, { useState } from 'react';
import SignUpForm from './SignUpForm';

function FormContainer() {
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  // T14: PUBLIC_BEEHIIV_API_URL was found unset anywhere in this repo (no
  // `.env` entry, no netlify.toml branch-context value, no doc beyond the
  // tracker's own "get this wrong and the signup form fails silently"
  // warning) — meaning the client had no URL to POST to and would fail
  // silently exactly as warned, since nothing had exercised the real
  // browser->function fetch path before now (T12's sign-off only invoked
  // the function handler directly in Node, bypassing this entirely).
  // Netlify Functions are always reachable at `/.netlify/functions/<name>`
  // from the site root regardless of the `base = "astro"` build setting
  // (that only affects where Netlify looks for the function's source),
  // so this is a safe, non-secret default — the env var can still override
  // it if a deploy ever needs a different path.
  const postUrl =
    import.meta.env.PUBLIC_BEEHIIV_API_URL || '/.netlify/functions/subscribe-user';

  const handleFormSubmit = async (formData) => {
    const requestBody = {
      email: formData.email,
      reactivate_existing: false,
      send_welcome_email: true,
      utm_source: '',
      utm_campaign: '',
      utm_medium: '',
      referring_site: 'mounish.dev',
      custom_fields: [
        {
          name: 'first_name',
          value: formData.firstName,
        },
        {
          name: 'last_name',
          value: formData.lastName,
        },
      ],
    };

    try {
      setResponseStatus('sending');
      const response = await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json().catch(() => null);

      if (response.status === 200 || response.status === 201) {
        setResponseStatus('success');
        setResponseMessage('wohoo! you just joined my newsletter.');
      } else {
        setResponseStatus('error');
        setResponseMessage('failed to subscribe.');
        console.error('Error registering user:', data);
      }
    } catch (error) {
      setResponseStatus('error');
      setResponseMessage('failed to subscribe. please try again.');
      console.error('Error sending request: ', error);
    }
  };

  return (
    <div className="">
      <SignUpForm
        status={responseStatus}
        message={responseMessage}
        onValidated={handleFormSubmit}
      />
    </div>
  );
}

export default FormContainer;
