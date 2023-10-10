import React from 'react';

import HeroSection from '../components/homepage/HeroSection';
import Seo from '../components/seo/Seo';
import FeaturedBlogs from '../components/homepage/FeaturedBlogs';

const IndexPage = () => (
  <>
    <Seo />
    {/* <HeroSection /> */}
    <div
      className="bg-white dark:bg-black pt-[52px] lg:pt-[68px]"
    >
      <div className="container mx-auto ">
        <FeaturedBlogs />
      </div>
    </div>
  </>
);

export default IndexPage;
