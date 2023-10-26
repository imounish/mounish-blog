import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import InputField from '../input/InputField';
import useIsClient from '../../utils/useIsClient';

function SignUpForm({ status, message, onValidated }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const {isClient, key} = useIsClient();

  const clearFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  useEffect(() => {
    if (status === 'success') clearFields();
  }, [status]);

  const handleSubmit = e => {
    e.preventDefault();
    if (email && firstName && lastName && email.indexOf('@') > -1) {
      onValidated({
        EMAIL: email,
        MERGE1: firstName,
        MERGE2: lastName,
      });
    }
  };

  if (!isClient) return null;

  return (
    <form key={key} className="font-worksans" onSubmit={e => handleSubmit(e)}>
      {status === 'sending' && (
        <p className="mb-2 w-full text-center text-sm lowercase text-cyan-700 sm:text-base">
          sending...
        </p>
      )}
      {status === 'success' && (
        <p className="mb-2 w-full text-center text-sm lowercase text-green-600 sm:text-base">
          successfully sent
        </p>
      )}
      {status === 'error' && (
        <p className="mb-2 w-full text-center text-base text-red-600 sm:text-lg">
          {parse(message)}
        </p>
      )}
      {status === 'success' && (
        <p className="my-2 text-lg lowercase text-gray-900 dark:text-gray-50 sm:text-xl">
          {parse(message)}
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        {status !== 'success' ? (
          <>
            <InputField
              label="First Name"
              onChangeHandler={setFirstName}
              type="text"
              value={firstName}
              name="firstName"
              placeholder="James"
              className="my-0.5 px-4 py-2"
              isRequired

            />
            <InputField
              label="Last Name"
              onChangeHandler={setLastName}
              type="text"
              value={lastName}
              name="lastName"
              placeholder="Bond"
              className="my-0.5 px-4 py-2"
              isRequired
            />
            <InputField
              label="Email"
              onChangeHandler={setEmail}
              type="email"
              value={email}
              name="email"
              placeholder="jamesbond@mi6.com"
              className="my-0.5 px-4 py-2"
              isRequired
            />
          </>
        ) : null}
        {status === 'success' ? (
          <div className="flex w-full flex-col items-center">
            <div className="mt-4 w-full text-center sm:w-96">
              <p className="dark:shadow-blue-gray-500/10 dark:hover:shadow-blue-gray-500/20 rounded-lg bg-gray-900/80 py-2 px-4 text-lg lowercase text-gray-50 dark:bg-gray-100 dark:text-gray-900 ">
                submitted
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex w-full flex-col items-center ">
            <InputField
              label="subscribe"
              type="submit"
              className="w-full sm:w-96"
              formValues={[email, firstName, lastName]}
            />
          </div>
        )}
      </div>
    </form>
  );
}

export default SignUpForm