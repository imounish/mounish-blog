// T12: ported unchanged from src/context/signUpModalContext.jsx (Gatsby
// app). Scoped locally to the newsletter island (see
// ../components/newsletter/NewsletterSignup.jsx) rather than wrapped around
// the whole page the way Layout.jsx did — Astro's islands don't share
// React context across separate `client:*` roots, and this modal only ever
// has one trigger today (NewsletterSection), so a page-wide provider isn't
// needed. If a second trigger (e.g. a header CTA) is added later, promote
// this provider up to wrap both islands together.
import React, { createContext, useMemo, useState } from 'react';

const SignUpModalContext = createContext();

function SignUpModalContextProvider({ children }) {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState();

  const initialValue = useMemo(
    () => ({
      isSignUpModalOpen,
      openSignUpModal: () => {
        setIsSignUpModalOpen(true);
      },
      closeSignUpModal: () => {
        setIsSignUpModalOpen(false);
      },
    }),
    [isSignUpModalOpen]
  );

  return (
    <SignUpModalContext.Provider value={initialValue}>
      {children}
    </SignUpModalContext.Provider>
  );
}

export { SignUpModalContext, SignUpModalContextProvider };
