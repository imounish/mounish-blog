/* eslint-disable import/prefer-default-export */

/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Layout from './src/components/layout/Layout';
// fonts
import './src/styles/global.css';

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);
