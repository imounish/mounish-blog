import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import { Link } from 'gatsby';
import PageSpace from '../components/PageSpace';
import Section from "../components/partials/Section";
import SectionRest from "../components/partials/SectionRest";
import AnimatedArrowButton from '../components/buttons/AnimatedArrowButton';

function NotFoundPage() {
  return (
    <PageSpace>
      <Section sectionHeading="oh man! you've lost your way">
        <SectionRest className="flex flex-col lg:flex-row lg:justify-between">
          <p className="font-warnocksubh text-lg sm:text-xl font-light text-gray-900 dark:text-gray-50">
            But the good news is you are now free to visit
            <AnimatedArrowButton to="/">
              home
            </AnimatedArrowButton>
            or you can see all my
            <AnimatedArrowButton to="/posts">
              posts
            </AnimatedArrowButton>
            or you can explore various
            <AnimatedArrowButton to="/categories">
              categories
            </AnimatedArrowButton>
          </p>
          <div className="flex justify-center py-2 sm:py-4 lg:py-8">
            <div className="flex flex-col justify-center">
              <StaticImage
                src="../images/kowalski.png"
                alt="Kowalski"s
                placeholder="blurred"
                height={540}
                width={540}
              />
              <p className="font-warnockcapt text-sm sm:text-base font-light text-gray-700 dark:text-gray-300 flex justify-center">
                Easy, Kowalski, easy… You don't want this stuff going kaboom!
              </p>
            </div>
          </div>
        </SectionRest>
      </Section>
    </PageSpace>
  );
}

export default NotFoundPage;
