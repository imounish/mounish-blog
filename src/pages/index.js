import React from 'react';

import HeroSection from '../components/homepage/HeroSection';
import Seo from '../components/seo/Seo';
import FeaturedBlogs from '../components/homepage/FeaturedBlogs';
import FeaturedCategories from '../components/homepage/FeaturedCategories';
import Container from '../components/partials/Container';
import NewsletterSection from '../components/homepage/NewsletterSection';
import MarginedContainer from '../components/partials/MarginedContainer';

const IndexPage = () => (
  <>
    <Seo />
    {/* <HeroSection /> */}
    <Container>
      <MarginedContainer>
        <FeaturedBlogs />
        <FeaturedCategories />
        <NewsletterSection />
      </MarginedContainer>
    </Container>
  </>
);

export default IndexPage;
