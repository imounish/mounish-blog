import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import RichText from '../typography/RichText';
import Section from '../partials/Section';
import SectionHeading from '../typography/SectionHeading';

function AuthorHero({ author }) {
  return (
    <Section>
      <div className="flex flex-col items-center gap-8 pb-2 pt-4">
        <GatsbyImage
          image={author.profileImage.asset.gatsbyImageData}
          alt={author.profileImage.alt || ''}
          loading="lazy"
          className="block h-32 w-32 rounded-full md:h-48 md:w-48 xl:h-64 xl:w-64"
        />
        <div>
          <SectionHeading className="w-full text-center">
            {author.name}
          </SectionHeading>
          <div>
            <RichText value={author._rawBio} />
          </div>
        </div>
      </div>
    </Section>
  );
}

export default AuthorHero;
