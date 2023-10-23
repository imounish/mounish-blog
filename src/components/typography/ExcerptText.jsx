import React from 'react';
import { PortableText } from '@portabletext/react';
import NormalText from './NormalText';

const excerptTextComponents = {
  block: {
    normal: ({ children }) => (
      <NormalText className="font-warnocksubh first-letter:dark py-2 text-2xl font-normal first-letter:float-left first-letter:-mb-2 first-letter:mr-3 first-letter:mt-1.5 first-letter:text-6xl first-letter:font-bold md:first-letter:text-7xl">
        {children}
      </NormalText>
    ),
  },
};

function ExcerptText({ value }) {
  return <PortableText value={value} components={excerptTextComponents} />;
}

export default ExcerptText;
