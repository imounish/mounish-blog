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
