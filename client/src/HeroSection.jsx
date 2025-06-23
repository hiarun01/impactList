import React from "react";
import {NavLink} from "react-router-dom";
import {Button} from "./components/ui/button";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-5 py-25 md:py-10 text-center bg-white from-white via-gray-50 to-gray-100 rounded-xl ">
      {/* Main heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
        Discover Top Things That Changed People's Life
      </h1>
      {/* Subtext */}
      <div className="max-w-2xl mx-auto mb-10 text-lg text-gray-600">
        <p>
          ImpactList is a community platform where people around the world share
          the top things that changed their lives from books and habits to tools
          and podcasts.
        </p>
      </div>
      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <NavLink to="/dashboard">
          <Button className="inline-flex text-lg items-center gap-2 rounded-md border px-8 py-5 text-white font-semibold shadow transition">
            Discover
          </Button>
        </NavLink>
      </div>
    </section>
  );
};

export default HeroSection;
