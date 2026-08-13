// T12: relocated unchanged from repo-root netlify/functions/subscribe-user/
// subscribe-user.js — the working Beehiiv handler. Moved here (rather than
// left at repo root) because T1's netlify.toml sets `base = "astro"` for
// this branch context, so Netlify resolves Functions relative to that base;
// living under astro/netlify/functions keeps the app self-contained. Only
// relocation — no logic changes. Reads BEEHIIV_API_URL/BEEHIIV_API_KEY/
// BEEHIIV_PUBLICATION_ID from process.env, all server-side only (never
// PUBLIC_-prefixed).
const { default: axios } = require("axios");

const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method not allowed",
    };
  }
  // const beehiivApiUrl = Netlify.env.get("BEEHIIV_API_URL");
  // const beehiivApiKey = Netlify.env.get("BEEHIIV_API_KEY");
  // const beehiivPublicationId = Netlify.env.get("BEEHIIV_PUBLICATION_ID");

  const beehiivApiUrl = process.env.BEEHIIV_API_URL;
  const beehiivApiKey = process.env.BEEHIIV_API_KEY;
  const beehiivPublicationId = process.env.BEEHIIV_PUBLICATION_ID;

  const postUrl = `${beehiivApiUrl}/publications/${beehiivPublicationId}/subscriptions`;

  const requestBody = JSON.parse(event.body);

  try {
    const response = await axios.post(postUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${beehiivApiKey}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.log(error.response);
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify(
        error.response?.data.errors || {
          message: "Error occurred while subscribing",
        }
      ),
    };
  }
};

module.exports = { handler };
