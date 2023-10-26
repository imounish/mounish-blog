import React from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import SignUpForm from './SignUpForm';

function MailchimpFormContainer() {
  const mailchimpURL = 'https://dev.us17.list-manage.com/subscribe/post';
  const mailchimpU = process.env.GATSBY_APP_MAILCHIMP_U;
  const mailchimpID = process.env.GATSBY_APP_MAILCHIMP_ID;
  const postUrl = `${mailchimpURL}?u=${mailchimpU}&id=${mailchimpID}`;
  
  return (
    <div>
      <MailchimpSubscribe
        url={postUrl}
        render={({ subscribe, status, message }) => (
          <SignUpForm
            status={status}
            message={message}
            onValidated={formData => subscribe(formData)}
          />
        )}
      />
    </div>
  );
}

export default MailchimpFormContainer