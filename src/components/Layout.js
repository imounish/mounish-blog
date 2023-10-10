/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { SearchModalContextProvider } from '../context/searchModalContext';
import Search from './search/SearchModal';

function Layout({ children }) {
  return (
    <SearchModalContextProvider>
      <Search />
      <Header />
      {children}
      <Footer />
    </SearchModalContextProvider>
  );
}

export default Layout;
