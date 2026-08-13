// T12: new wrapper, not a direct port. Gatsby's Layout.jsx wraps every page
// in <SignUpModalContextProvider> + a page-wide <SignUpModal>, so any button
// anywhere could call `openSignUpModal()` via context. Astro islands don't
// share React context across separate `client:*` roots, and today the only
// trigger is the "subscribe" button inside NewsletterSection.astro — so this
// component bundles the trigger button, the context provider, and the modal
// into one self-contained island instead. Rendered with `client:load` from
// NewsletterSection.astro. If a second trigger is added elsewhere later,
// this is the seam to promote into a page/layout-level provider.
import React from 'react';
import { SignUpModalContextProvider, SignUpModalContext } from '../../context/signUpModalContext';
import SignUpModal from './SignUpModal';

function SubscribeButton() {
  const { openSignUpModal } = React.useContext(SignUpModalContext);

  return (
    <button
      type="button"
      onClick={openSignUpModal}
      className="font-worksans my-2 w-full rounded-lg bg-gray-900 px-4 py-2.5 text-lg font-medium lowercase text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300 sm:w-96"
    >
      subscribe
    </button>
  );
}

function NewsletterSignup() {
  return (
    <SignUpModalContextProvider>
      <SubscribeButton />
      <SignUpModal />
    </SignUpModalContextProvider>
  );
}

export default NewsletterSignup;
