// T13: ported unchanged from src/context/searchModalContext.jsx (Gatsby
// app). Scoped locally to the search island (see
// ../components/search/Search.jsx) rather than wrapped around the whole
// page the way Layout.jsx did — Astro's islands don't share React context
// across separate `client:*` roots, and this modal's only trigger
// (SearchButton) lives inside the same island. See NewsletterSignup.jsx
// (T12) for the identical pattern applied to the sign-up modal.
import React, { createContext, useMemo, useState } from 'react';

const SearchModalContext = createContext();

function SearchModalContextProvider({ children }) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState();

  const initialValue = useMemo(
    () => ({
      isSearchModalOpen,
      openSearchModal: () => {
        setIsSearchModalOpen(true);
      },
      closeSearchModal: () => {
        setIsSearchModalOpen(false);
      },
    }),
    [isSearchModalOpen]
  );

  return (
    <SearchModalContext.Provider value={initialValue}>
      {children}
    </SearchModalContext.Provider>
  );
}

export { SearchModalContext, SearchModalContextProvider };
