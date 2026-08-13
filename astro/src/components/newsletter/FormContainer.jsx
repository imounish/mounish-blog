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

  const postUrl = import.meta.env.PUBLIC_BEEHIIV_API_URL;

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
