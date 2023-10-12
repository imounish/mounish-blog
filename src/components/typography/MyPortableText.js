import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import theme from 'react-syntax-highlighter/dist/esm/styles/prism/vs-dark';
import { PortableText } from '@portabletext/react';
import { getImage, getImageDimensions } from '@sanity/asset-utils';

import sanityConfig from '../../../sanity.config';
import { getSanityImageData } from '../../utils/getSanityImageData';
import ParagraphText from './ParagraphText';
import H1Text from './H1Text';

const myPortableTextComponents = {
  block: {
    normal: ({ children }) => <ParagraphText>{children}</ParagraphText>,
    h1: ({ children }) => <H1Text>{children}</H1Text>,
  },
  types: {
    customCode: ({ value }) => (
      <SyntaxHighlighter style={theme} language={value.code.language}>
        {String(value.code.code).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ),
    customImage: ({ value }) => {
      const imageData = getImage(value.asset, sanityConfig).asset;
      const { width, height } = getImageDimensions(value);

      const image = {
        url: imageData.url,
        height,
        width,
      }
      const gatsbyImageData = getSanityImageData({
        image,
        layout: 'constrained'
      });

      return (
        <GatsbyImage 
          image={gatsbyImageData}
          alt={value.alt}
        />
      )
    }
  },
};

function MyPortableText({ value }) {
  return <PortableText value={value} components={myPortableTextComponents} />;
}

export default MyPortableText;
