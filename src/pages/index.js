import React from 'react';

import HeroSection from '../components/homepage/HeroSection';
import Seo from '../components/seo/Seo';
import FeaturedBlogs from '../components/homepage/FeaturedBlogs';

const IndexPage = () => (
  <>
    <Seo />
    {/* <HeroSection /> */}
    <div className="container mx-auto">
      <FeaturedBlogs />
    </div>
  </>
);

export default IndexPage;
