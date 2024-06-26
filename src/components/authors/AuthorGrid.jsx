import React from 'react';
import AuthorItem from './AuthorItem';
import SectionTop from '../partials/SectionTop';

function AuthorGrid({ authors }) {
  return (
    <SectionTop className="grid gap-8 pb-2 lg:grid-cols-2">
      {authors &&
        authors.map(author => (
          <AuthorItem
            key={author.id}
            name={author.name}
            description={author.description ? author.description : null}
            path={author.slug.current}
            image={{
              imageData: author.profileImage.asset.gatsbyImageData,
              altText: author.profileImage.alt,
            }}
            learnMoreButton
          />
        ))}
    </SectionTop>
  );
}

export default AuthorGrid;
