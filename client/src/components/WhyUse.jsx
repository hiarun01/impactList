import {getPosts} from "@/services/api";
import {useEffect, useState} from "react";
import {Button} from "./ui/button";
import {NavLink} from "react-router-dom";

const WhyUse = () => {
  const [contributorCount, setContributorCount] = useState(0);
  useEffect(() => {
    getPosts().then((res) => {
      const posts = res.data;
      // Get posts
      const postsCount = new Set(posts.map((post) => post));
      setContributorCount(postsCount.size);
    });
  }, []);
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-20 space-y-24">
      {/* 1. About Section */}
      <section className="text-center max-w-3xl mx-auto flex flex-col">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          About ImpactList
        </h2>
        <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
          impactList is a community-driven platform where people from all over
          the world come together to share the things that have truly made a
          difference in their lives.
        </p>
      </section>
      {/* 3. Contribution Stats Section */}
      <section className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          Join the Community
        </h2>
        <p className="text-neutral-600 text-base md:text-lg leading-relaxed mb-8">
          community is already growing{" "}
          <span className="font-bold text-2xl text-black">
            {contributorCount}+
          </span>
          peoples have contributed they share the top things that changed their
          lives. Why keep your genius to yourself when it can help others?
        </p>
        <NavLink to="/contribute">
          <Button className="px-6 py-2 rounded-full bg-black text-white text-sm font-medium hover:opacity-90 transition">
            Contribute Yours
          </Button>
        </NavLink>
      </section>
    </div>
  );
};

export default WhyUse;
