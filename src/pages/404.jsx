import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import AnimatedArrowButton from '../components/buttons/AnimatedArrowButton';
import MarginedContainer from '../components/partials/MarginedContainer';
import PageSpace from '../components/partials/PageSpace';
import SEO from '../components/seo/SEO';
import Section from '../components/partials/Section';
import SectionRest from '../components/partials/SectionRest';

function NotFoundPage() {
  return (
    <PageSpace>
      <MarginedContainer>
        <Section sectionHeading="oh man! you've lost your way">
          <SectionRest className="flex flex-col lg:flex-row lg:justify-between">
            <p className="font-warnocksubh text-lg sm:text-xl font-light text-gray-900 dark:text-gray-50">
              But the good news is you are now free to visit
              <AnimatedArrowButton to="/" className="pb-1.5 w-min">
                home
              </AnimatedArrowButton>
              or you can see all my
              <AnimatedArrowButton to="/posts" className="pb-1.5 w-min">
                posts
              </AnimatedArrowButton>
              or you can explore various
              <AnimatedArrowButton to="/categories" className="pb-1.5 w-min">
                categories
              </AnimatedArrowButton>
            </p>
            <div className="flex justify-center py-2 sm:py-4 lg:py-8">
              <div className="flex flex-col justify-center">
                <StaticImage
                  src="../images/kowalski.png"
                  alt="Kowalski"
                  s
                  placeholder="blurred"
                  height={540}
                  width={540}
                />
                <p className="font-warnockcapt text-sm sm:text-base font-light text-gray-700 dark:text-gray-300 flex justify-center">
                  Easy, Kowalski, easy… You don&apos;t want this stuff going kaboom!
                </p>
              </div>
            </div>
          </SectionRest>
        </Section>
      </MarginedContainer>
    </PageSpace>
  );
}

export function Head() {
  return <SEO
    title="not found"
    description="You have lost your way buddy! Please go back to Home."
  />
}

export default NotFoundPage;
