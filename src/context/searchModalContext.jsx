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
