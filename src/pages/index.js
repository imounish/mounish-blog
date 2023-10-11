import React from 'react';

import HeroSection from '../components/homepage/HeroSection';
import Seo from '../components/seo/Seo';
import FeaturedBlogs from '../components/homepage/FeaturedBlogs';
import FeaturedCategories from '../components/homepage/FeaturedCategories';

const IndexPage = () => (
  <>
    <Seo />
    {/* <HeroSection /> */}
    <div className="bg-white dark:bg-black pt-[56px] lg:pt-[72px]">
      <div className="container mx-auto ">
        <FeaturedBlogs />
        <FeaturedCategories />
      </div>
    </div>
  </>
);

export default IndexPage;
