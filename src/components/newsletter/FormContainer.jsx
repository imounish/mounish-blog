import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import axios from "axios";

function FormContainer() {
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  const postUrl = process.env.GATSBY_NETLIFY_BEEHIIV_API_URL;

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
      setResponseStatus("sending");
      const response = await axios.post(postUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (response.status == 200 || response.status == 201) {
        setResponseStatus("success");
        setResponseMessage("wohoo! you just joined my newsletter.");
        console.log("User successfully registered:", response.data);
      } else {
        setResponseStatus("error");
        setResponseMessage("failed to subscribe.");
        console.error("Error registering user:", response.data);
      }
    } catch (error) {
      setResponseStatus("error");
      setResponseMessage("failed to subscribe. please try again.");
      console.error("Error sending request: ", error);
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
