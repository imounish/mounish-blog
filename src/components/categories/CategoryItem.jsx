import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import AnimatedArrowButton from '../buttons/AnimatedArrowButton';
import DescriptionText from '../typography/DescriptionText';
import Title from '../typography/Title';

function CategoryItem({
  title,
  path,
  description,
  image,
  exploreBtnDisplay,
}) {
  return (
    <div className="grid sm:grid-rows-3 sm:grid-cols-4">
      {image && (
        <GatsbyImage
          image={image.imageData}
          alt={image.altText ? image.altText : ''}
          className="sm:col-span-1 sm:row-span-6 rounded-md hover:scale-105 mr-0 sm:mr-2 w-auto"
          loading="lazy"
          style={{
            transition: '0.3s ease-in-out transform',
          }}
        />
      )}
      <div className="sm:col-span-3 sm:row-span-5 ml-0 sm:ml-2 mt-2 sm:mt-0 flex flex-col justify-between">
        <div>
          <Title
            className="pb-1 pt-1 sm:pt-0 font-warnockdisp font-medium text-2xl sm:text-3xl"
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
            className="pt-2 sm:pt-0 w-min"
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
