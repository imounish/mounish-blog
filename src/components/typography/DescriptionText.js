import React from 'react';
import { PortableText } from '@portabletext/react';
import NormalText from './NormalText';

const descriptionTextComponents = {
  block: {
    normal: ({ children }) => (
      <NormalText className="font-warnockcapt italic text-base md:text-lg">
        {children}
      </NormalText>
    ),
  },
};

function DescriptionText({ value }) {
  return <PortableText value={value} components={descriptionTextComponents} />;
}

export default DescriptionText;
