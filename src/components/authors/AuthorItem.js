import AnimatedArrowButton from "../buttons/AnimatedArrowButton";
import DescriptionText from "../typography/DescriptionText";
import { GatsbyImage } from "gatsby-plugin-image";
import React from 'react';
import Title from "../typography/Title";

function AuthorItem({ name, path, description, image, learnMoreButton }) {
  return (
    <div className={`flex flex-row justify-start gap-6 md:gap-8`}>
      {image && (
        <GatsbyImage
          image={image.imageData}
          alt={image.altText ? image.altText : ""}
          className="rounded-full hover:scale-105 mr-0 sm:mr-2 w-24 sm:w-32 md:w-48 lg:w-64"
          loading="lazy"
          style={{
            transition: "0.3s ease-in-out transform",
          }}
        />
      )}
      <div className="flex flex-col justify-center">
        <div>
          <Title
            className="pb-1 pt-1 sm:pt-0 font-warnockdisp font-medium text-2xl sm:text-3xl"
            path={`/authors/${path}`}
            highLightColor="maroon"
          >
            {name}
          </Title>
          {description && <p className="pb-2 font-warnockcapt text-base md:text-lg text-gray-900 dark:text-gray-100">
            {description}
          </p>}
        </div>
        {learnMoreButton && (
          <div className="w-full">
            <AnimatedArrowButton
              className="pt-2 sm:pt-0 "
              path={`/authors/${path}`}
            >
              know more
            </AnimatedArrowButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthorItem