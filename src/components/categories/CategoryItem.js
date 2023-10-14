import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import Title from '../typography/Title';
import { category } from './CategoryItem.module.css';
import MyPortableText from '../typography/MyPortableText';
import AnimatedArrowButton from '../buttons/AnimatedArrowButton';
import DescriptionText from '../typography/DescriptionText';

function CategoryItem({
  title,
  path,
  color,
  description,
  image,
  exploreBtnDisplay,
}) {
  return (
    <div className={`grid sm:grid-rows-3 sm:grid-flow-col ${category}`}>
      {image && (
        <GatsbyImage
          image={image.imageData}
          alt={image.altText ? image.altText : ''}
          className="sm:col-span-1 sm:row-span-6 rounded-md hover:scale-105 mr-0 sm:mr-2"
          loading="lazy"
          style={{
            transition: '0.3s ease-in-out transform',
          }}
        />
      )}
      <div className="sm:col-span-2 sm:row-span-5 ml-0 sm:ml-2 mt-2 sm:mt-0 flex flex-col justify-between">
        <div>
          <Title
            className="pb-1 pt-1 sm:pt-0 font-warnockdisp font-medium text-2xl sm:text-3xl"
            path={`/categories/${path}`}
            highLightColor="maroon"
          >
            {title}
          </Title>
          <DescriptionText value={description} />
        </div>
        {exploreBtnDisplay && (
          <AnimatedArrowButton
            className="pt-2 sm:pt-0"
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
