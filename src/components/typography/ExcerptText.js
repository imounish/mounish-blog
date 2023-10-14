import React from 'react';
import { PortableText } from '@portabletext/react';
import NormalText from './NormalText';

const excerptTextComponents = {
  block: {
    normal: ({ children }) => (
      <NormalText className="font-warnockcapt text-xl md:text-2xl">
        {children}
      </NormalText>
    ),
  },
};

function ExcerptText({ value }) {
  return <PortableText value={value} components={excerptTextComponents} />;
}

export default ExcerptText;
