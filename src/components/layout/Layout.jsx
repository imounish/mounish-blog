import React, { useEffect } from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Search from '../search/SearchModal';
import { SearchModalContextProvider } from '../../context/searchModalContext';

function Layout({ children }) {
  useEffect(() => {
    const darkModeValue = localStorage.getItem('darkMode');
    if (!darkModeValue) {
      // darkMode setting doesn't exist in local storage
      console.log("inside");
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        localStorage.setItem('darkMode', true);
      } else {
        localStorage.setItem('darkMode', false);
      }
    }
  }, []);

  console.log("layout is executed");

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
