import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import theme from 'react-syntax-highlighter/dist/esm/styles/prism/vs-dark';
import { PortableText } from '@portabletext/react';
import { getImage, getImageDimensions } from '@sanity/asset-utils';

import sanityConfig from '../../../sanity.config';
import { getSanityImageData } from '../../utils/getSanityImageData';
import ParagraphText from './ParagraphText';
import QuoteText from './QuoteText';
import HeadingText from './HeadingText';
import BulletList from './BulletList';
import BulletListItem from './BulletList';
import NumberedList from './NumberedList';

const richTextComponents = {
  block: {
    normal: ({ children }) => (
      <ParagraphText className="text-xl font-warnock py-4">
        {children}
      </ParagraphText>
    ),
    h2: ({ children }) => (
      <HeadingText className="font-warnockdisp text-4xl lg:text-5xl font-bold pt-10 pb-2">
        {children}
      </HeadingText>
    ),
    h3: ({ children }) => (
      <HeadingText className="font-warnockdisp text-3xl lg:text-4xl font-semibold pt-8 pb-2">
        {children}
      </HeadingText>
    ),
    h4: ({ children }) => (
      <HeadingText className="font-warnockdisp text-2xl lg:text-3xl font-medium pt-6 pb-2">
        {children}
      </HeadingText>
    ),
    blockquote: ({ children }) => (
      <QuoteText className="">{children}</QuoteText>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <BulletList
        className="py-4 px-6 lg:px-10 font-warnock text-lg md:text-xl"
        // style={{ listStyleType: "circle" }}
      >
        {children}
      </BulletList>
    ),

    number: ({ children }) => (
      <NumberedList className="py-4 px-6 lg:px-10 font-warnock text-lg md:text-xl">
        {children}
      </NumberedList>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-2">{children}</li>,
    number: ({ children }) => <li className="pl-2">{children}</li>,
  },
  types: {
    // URL is still remaining
    customCode: ({ value }) => (
      <div className="py-2 lg:py-4">
        <SyntaxHighlighter style={theme} language={value.code.language}>
          {String(value.code.code).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    ),
    customImage: ({ value }) => {
      const imageData = getImage(value.asset, sanityConfig).asset;
      const { width, height } = getImageDimensions(value);

      const image = {
        url: imageData.url,
        height,
        width,
      };
      const gatsbyImageData = getSanityImageData({
        image,
        layout: 'constrained',
      });

      return (
        <div className="flex flex-col gap-1 md:gap-1.5 py-4 sm:py-8">
          <GatsbyImage image={gatsbyImageData} alt={value.alt} />
          <p className="text-center font-worksans text-xs md:text-sm text-gray-500">
            {value.caption}
          </p>
        </div>
      );
    },
  },
};

function RichText({ value }) {
  return <PortableText value={value} components={richTextComponents} />;
}

export default RichText;
