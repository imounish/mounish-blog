// T13: new wrapper, same self-contained-island pattern as
// NewsletterSignup.jsx (T12). Gatsby's Layout.jsx wraps every page in
// <SearchModalContextProvider> + a page-wide <Search />, with SearchButton
// living separately in Header.jsx and sharing context through it. Astro
// islands don't share React context across separate `client:*` roots, so
// this component bundles the trigger button, the context provider, and the
// modal into one island, rendered with `client:load` into Header.astro's
// `search-button` slot (see Layout.astro).
import React from 'react';
import { SearchModalContextProvider } from '../../context/searchModalContext';
import SearchButton from './SearchButton';
import SearchModal from './SearchModal';

function Search() {
  return (
    <SearchModalContextProvider>
      <SearchButton />
      <SearchModal />
    </SearchModalContextProvider>
  );
}

export default Search;
