import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import axios from "axios";

function FormContainer() {
  const [responseStatus, setResponseStatus] = useState(null);
  const beehivApiUrl = process.env.GATSBY_BEEHIIV_API_URL;
  const beehivPublicationId = process.env.GATSBY_BEEHIIV_PUBLICATION_ID;
  const beehivApiKey = process.env.GATSBY_BEEHIIV_API_KEY;

  const postUrl = `${beehivApiUrl}/publications/${beehivPublicationId}/subscriptions`;

  console.log(postUrl);

  const handleFormSubmit = async (formData) => {
    const requestBody = {
      email: formData.email,
      reactivate_existing: false,
      send_welcome_email: true,
      utm_source: "",
      utm_campaign: "",
      utm_medium: "",
      referring_site: "mounish.dev",
      custom_fields: [
        {
          name: "first_name",
          value: formData.firstName,
        },
        {
          name: "last_name",
          value: formData.lastName,
        },
      ],
    };

    try {
      const response = await axios.post(postUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${beehivApiKey}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (response.status == 200) {
        setResponseStatus("success");
        console.log("User successfully registered:", response.data);
      } else {
        setResponseStatus("error");
        console.error("Error registering user:", response.data);
      }
    } catch (error) {
      setResponseStatus("error");
      console.error("Error sending request: ", error);
    }
  };

  return (
    <div className="">
      <SignUpForm status={responseStatus} onValidated={handleFormSubmit} />
    </div>
  );
}

export default FormContainer;
