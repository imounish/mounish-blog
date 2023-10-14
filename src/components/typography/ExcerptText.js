import React from 'react';
import { PortableText } from '@portabletext/react';
import NormalText from './NormalText';

const excerptTextComponents = {
  block: {
    normal: ({ children }) => (
      <NormalText className="py-2 font-warnocksubh font-normal text-xl md:text-2xl first-letter:dark first-letter:text-6xl md:first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:-mb-2 first-letter:float-left">
        {children}
      </NormalText>
    ),
  },
};

function ExcerptText({ value }) {
  return <PortableText value={value} components={excerptTextComponents} />;
}

export default ExcerptText;
