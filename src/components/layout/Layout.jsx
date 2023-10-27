import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Search from '../search/SearchModal';
import { SearchModalContextProvider } from '../../context/searchModalContext';
import { SignUpModalContextProvider } from '../../context/signUpModalContext';
import SignUp from '../newsletter/SignUpModal';

function Layout({ children }) {

  return (
    <SearchModalContextProvider>
      <SignUpModalContextProvider>
        <Search />
        <SignUp />
        <Header />
        {children}
        <Footer />
      </SignUpModalContextProvider>
    </SearchModalContextProvider>
  );
}

export default Layout;
