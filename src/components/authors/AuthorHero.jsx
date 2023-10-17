import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import RichText from '../typography/RichText'
import Section from '../partials/Section'
import SectionHeading from '../typography/SectionHeading';

function AuthorHero({ author }) {
  return (
    <Section>
      <div className='pt-4 pb-2 flex flex-col gap-8 items-center'>
        <GatsbyImage 
          image={author.profileImage.asset.gatsbyImageData}
          alt={author.profileImage.alt || ''}
          loading="lazy"
          className="block rounded-full w-32 h-32 md:w-48 md:h-48 xl:w-64 xl:h-64"
        />
        <div>
          <SectionHeading className='w-full text-center'>
            {author.name}
          </SectionHeading>
          <div>
            <RichText value={author._rawBio} />
          </div>
        </div>
      </div>
    </Section>
  )
}

export default AuthorHero