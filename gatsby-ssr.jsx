/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Layout from './src/components/layout/Layout';

export const wrapPageElement = ({ element, props }) => (
  /* eslint-disable react/jsx-props-no-spreading */
  <Layout {...props}>{element}</Layout>
);
