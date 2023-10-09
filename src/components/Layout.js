/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import Header from './Header';

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
