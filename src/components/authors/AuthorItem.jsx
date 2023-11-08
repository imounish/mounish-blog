import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import AnimatedArrowButton from '../buttons/AnimatedArrowButton';
import Title from '../typography/Title';

function AuthorItem({ name, path, description, image, learnMoreButton }) {
  return (
    <div className="flex flex-row justify-start gap-6 md:gap-8">
      {image && (
        <GatsbyImage
          image={image.imageData}
          alt={image.altText ? image.altText : ''}
          className="mr-0 w-24 rounded-full hover:scale-105 sm:mr-2 sm:w-32 md:w-48 lg:w-64"
          loading="lazy"
          style={{
            transition: '0.3s ease-in-out transform',
          }}
        />
      )}
      <div className="flex flex-col justify-center">
        <div>
          <Title
            className="font-warnockdisp pb-1 pt-1 text-2xl font-medium sm:pt-0 sm:text-3xl"
            path={`/authors/${path}`}
            highLightColor="maroon"
            title={name}
          >
            {name}
          </Title>
          {description && (
            <p className="font-warnockcapt pb-2 text-base text-gray-900 dark:text-gray-100 md:text-lg">
              {description}
            </p>
          )}
        </div>
        {learnMoreButton && (
          <div className="w-full">
            <AnimatedArrowButton
              className="pt-2 sm:pt-0 "
              path={`/authors/${path}`}
              title={`Know more about ${name}`}
            >
              know more
            </AnimatedArrowButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthorItem;
