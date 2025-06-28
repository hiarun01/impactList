import HeroSection from "@/HeroSection";
import {MarqueeComponent} from "@/MarqueeComponent";
import {HeartIcon, UserRoundCogIcon} from "lucide-react";
import React from "react";

const Home = () => {
  // Example stats (replace with real data if available)
  const contributors = 128;
  const livesImpacted = 542;

  return (
    <>
      <HeroSection />
      <MarqueeComponent />
    </>
  );
};

export default Home;
