import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import AnimatedArrowButton from '../buttons/AnimatedArrowButton';
import DescriptionText from '../typography/DescriptionText';
import Title from '../typography/Title';

function CategoryItem({ title, path, description, image, exploreBtnDisplay }) {
  return (
    <div className="grid sm:grid-cols-4 sm:grid-rows-3">
      {image && (
        <GatsbyImage
          image={image.imageData}
          alt={image.altText ? image.altText : ''}
          className="mr-0 w-auto rounded-md hover:scale-105 sm:col-span-1 sm:row-span-6 sm:mr-2"
          loading="lazy"
          style={{
            transition: '0.3s ease-in-out transform',
          }}
        />
      )}
      <div className="ml-0 mt-2 flex flex-col justify-between sm:col-span-3 sm:row-span-5 sm:ml-2 sm:mt-0">
        <div>
          <Title
            className="font-warnockdisp pb-1 pt-1 text-2xl font-medium sm:pt-0 sm:text-3xl"
            path={`/categories/${path}`}
            highLightColor="maroon"
          >
            {title}
          </Title>
          <div className="italic">
            <DescriptionText value={description} />
          </div>
        </div>
        {exploreBtnDisplay && (
          <AnimatedArrowButton
            className="w-min pt-2 sm:pt-0"
            path={`/categories/${path}`}
          >
            explore
          </AnimatedArrowButton>
        )}
      </div>
    </div>
  );
}

export default CategoryItem;
