import NormalText from './NormalText';
import { PortableText } from '@portabletext/react';
import React from 'react';

const descriptionTextComponents = {
  block: {
    normal: ({ children }) => (
      <NormalText className="font-warnockcapt text-base md:text-lg">
        {children}
      </NormalText>
    ),
  },
};

function DescriptionText({ value }) {
  return <PortableText value={value} components={descriptionTextComponents} />;
}

export default DescriptionText;
