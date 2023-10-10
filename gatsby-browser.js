// fonts
import './src/styles/global.css';

import React from 'react';
import Layout from './src/components/layout/Layout';

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);
