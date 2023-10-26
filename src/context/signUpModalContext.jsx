import React, { createContext, useMemo, useState } from 'react'

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
