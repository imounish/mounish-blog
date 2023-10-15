import React from 'react';

import HeroSection from '../components/homepage/HeroSection';
import Seo from '../components/seo/Seo';
import FeaturedBlogs from '../components/homepage/FeaturedBlogs';
import FeaturedCategories from '../components/homepage/FeaturedCategories';
import Container from '../components/partials/Container';
import NewsletterSection from '../components/homepage/NewsletterSection';
import MarginedContainer from '../components/partials/MarginedContainer';
import Break from '../components/partials/Break';
import ScrollToTop from '../components/partials/ScrollToTop';

const IndexPage = () => (
  <>
    <Seo />
    {/* <HeroSection /> */}
    <Container>
      <MarginedContainer>
        <ScrollToTop showBelow={500} />
        <FeaturedBlogs />
        <Break />
        <FeaturedCategories />
        <Break />
        <NewsletterSection className="pb-8" heading="stay in touch?" />
      </MarginedContainer>
    </Container>
  </>
);

export default IndexPage;
