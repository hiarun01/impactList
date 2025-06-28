import HeroSection from "@/components/HeroSection";
import {MarqueeComponent} from "@/components/MarqueeComponent";
import WhyUse from "@/components/WhyUSE";

import React from "react";

const Home = () => {
  return (
    <>
      <HeroSection />
      <MarqueeComponent />
      <WhyUse />
    </>
  );
};

export default Home;
