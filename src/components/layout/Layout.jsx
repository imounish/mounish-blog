import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Search from '../search/SearchModal';
import { SearchModalContextProvider } from '../../context/searchModalContext';

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
