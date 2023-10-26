import React from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import SignUpForm from './SignUpForm';

function MailchimpFormContainer() {
  const postUrl = `https://dev.us17.list-manage.com/subscribe/post?u=${process.env.GATSBY_APP_MAILCHIMP_U}&id=${process.env.GATSBY_APP_MAILCHIMP_ID}`;
  
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