/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import Layout  from "./src/components/layout/Layout";

const applyDarkModeClass = `
(function() {
  const savedTheme = localStorage.getItem('theme');
  savedTheme ? document.body.classList.add(savedTheme) : (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches) ? document.body.classList.add('dark') : document.body.classList.add('light')
})();
`;

export const onRenderBody = ({ setPreBodyComponents }) => {
  const script = React.createElement('script', {
    dangerouslySetInnerHTML: {
      __html: applyDarkModeClass,
    },
  });
  setPreBodyComponents([script]);
};

export const wrapPageElement = ({ element, props }) => (
  /* eslint-disable react/jsx-props-no-spreading */
  <Layout {...props}>{element}</Layout>
);
