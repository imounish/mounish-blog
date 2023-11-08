import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { Link } from 'gatsby';
import AnimatedArrowButton from '../buttons/AnimatedArrowButton';
import DescriptionText from '../typography/DescriptionText';
import Title from '../typography/Title';

function CategoryItem({ title, path, description, image, exploreBtnDisplay }) {
  return (
    <div className="grid md:grid-cols-4 md:grid-rows-3">
      {image && (
        <Link
          to={`/categories/${path}`}
          title={title}
          className="mr-0 w-auto md:col-span-1 md:row-span-6 md:mr-2"
        >
          <GatsbyImage
            image={image.imageData}
            alt={image.altText ? image.altText : ''}
            className="rounded-md hover:scale-105"
            loading="lazy"
            style={{
              transition: '0.3s ease-in-out transform',
            }}
          />
        </Link>
      )}
      <div className="ml-0 mt-2 flex flex-col justify-between md:col-span-3 md:row-span-5 md:ml-2 md:mt-0">
        <div>
          <Title
            className="font-warnockdisp pb-1 pt-1 text-2xl font-medium sm:pt-0 sm:text-3xl"
            path={`/categories/${path}`}
            highLightColor="maroon"
            title={title}
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
            title={`Explore ${title} category`}
          >
            explore
          </AnimatedArrowButton>
        )}
      </div>
    </div>
  );
}

export default CategoryItem;
