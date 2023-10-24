'use client';

import { Component } from 'react';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { HomeCta } from 'src/sections/home/home-cta';
import { HomeFaqs } from 'src/sections/home/home-faqs';
import { HomeFeatures } from 'src/sections/home/home-features';
import { HomeHero } from 'src/sections/home/home-hero';
import { HomeReviews } from 'src/sections/home/home-reviews';
import { paths } from 'src/paths';
import Link from 'next/link';
import { Route } from '@mui/icons-material';
const Page = () => {
  usePageView();

  return (
    <>
      {/* <Seo /> */}
      <main>
        <Route component={RouterLink} href={paths.dashboard.index}></Route>
        {/* <Link href={paths.dashboard.index}  /> */}
        {/* <RouterLink href={paths.dashboard.index}  /> */}
        {/* <Component  component={RouterLink}
              href={paths.dashboard.index} ></Component> */}
        <HomeHero />
        {/* <HomeFeatures />
        <HomeReviews />
        <HomeCta />
        <HomeFaqs /> */}
      </main>
    </>
  );
};

export default Page;
