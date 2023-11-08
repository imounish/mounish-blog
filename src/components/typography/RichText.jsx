import { PortableText } from '@portabletext/react';
import { getImage, getImageDimensions } from '@sanity/asset-utils';
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from 'html-react-parser';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import theme from 'react-syntax-highlighter/dist/esm/styles/prism/vs-dark';
import ReactPlayer from 'react-player';
import sanityConfig from '../../../sanity.config';
import getSanityImageData from '../../utils/getSanityImageData';
import VideoAnimation from '../partials/VideoAnimation';
import BulletList from './BulletList';
import HeadingText from './HeadingText';
import NumberedList from './NumberedList';
import ParagraphText from './ParagraphText';
import QuoteText from './QuoteText';

const richTextComponents = {
  block: {
    normal: ({ children }) => (
      <ParagraphText className="font-warnock py-4 text-xl">
        {children}
      </ParagraphText>
    ),
    h2: ({ children }) => (
      <HeadingText className="font-warnockdisp pb-2 pt-10 text-4xl font-bold lg:text-5xl">
        {children}
      </HeadingText>
    ),
    h3: ({ children }) => (
      <HeadingText className="font-warnockdisp pb-2 pt-8 text-3xl font-semibold lg:text-4xl">
        {children}
      </HeadingText>
    ),
    h4: ({ children }) => (
      <HeadingText className="font-warnockdisp pb-2 pt-6 text-2xl font-medium lg:text-3xl">
        {children}
      </HeadingText>
    ),
    blockquote: ({ children }) => <QuoteText>{children}</QuoteText>,
  },
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined;
      return (
        <a
          className="underline underline-offset-2 hover:text-gray-800 dark:text-gray-300"
          href={value?.href}
          target={target}
          rel={target === '_blank' && 'noindex nofollow'}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <BulletList className="font-warnock px-6 py-4 text-lg md:text-xl lg:px-10">
        {children}
      </BulletList>
    ),

    number: ({ children }) => (
      <NumberedList className="font-warnock px-6 py-4 text-lg md:text-xl lg:px-10">
        {children}
      </NumberedList>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-2">{children}</li>,
    number: ({ children }) => <li className="pl-2">{children}</li>,
  },
  types: {
    customBreak: ({ value }) => {
      if (!value.break) {
        return null;
      }
      return (
        <p className="font-warnock py-2 text-center text-xl font-light text-gray-700 dark:text-gray-400 sm:font-normal">
          &#8277; &#160; &#160; &#160; &#8277; &#160; &#160; &#160; &#8277;
        </p>
      );
    },
    videoAnimation: ({ value }) => <VideoAnimation value={value} />,
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
      const caption =
        parse(String(value.caption)) === 'undefined'
          ? null
          : parse(String(value.caption));
      return (
        <div className="flex flex-col gap-1 py-4 sm:py-8 md:gap-1.5">
          <GatsbyImage image={gatsbyImageData} alt={value.alt} />
          {caption && (
            <p className="font-worksans text-center text-xs text-gray-500 md:text-sm">
              {caption}
            </p>
          )}
        </div>
      );
    },
    youtube: ({ value }) => (
      <div className="py-4 sm:py-8">
          <ReactPlayer width='100%' height='480px' url={value.url} controls />
      </div>
    )
  },
};

function RichText({ value }) {
  return <PortableText value={value} components={richTextComponents} />;
}

export default RichText;
