import React, {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";

import {Users} from "lucide-react";
import {Button} from "./ui/button";
import {getPosts} from "@/services/api";

const Header = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isContributePage = location.pathname.startsWith("/contribute");

  const [contributorCount, setContributorCount] = useState(0);

  useEffect(() => {
    // Only fetch on dashboard
    if (isDashboard) {
      getPosts().then((res) => {
        const posts = res.data;
        // Get posts
        const postsCount = new Set(posts.map((post) => post));
        setContributorCount(postsCount.size);
      });
    }
  }, [isDashboard]);

  if (isContributePage) return null;

  return (
    <header className="bg-white text-black py-4 border-b px-5 lg:px-30 flex justify-between items-center shadow-2xs">
      <NavLink to="/" className="flex items-center gap-2">
        <span className="text-2xl font-extrabold  tracking-tight">
          impactList
        </span>
      </NavLink>
      {!isDashboard ? (
        <NavLink to="/dashboard">
          <Button
            variant="outline"
            className="px-5 py-2 rounded-md font-semibold "
          >
            Discover
          </Button>
        </NavLink>
      ) : (
        <div className="flex items-center space-x-2 text-black/80">
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">
            {contributorCount} contributor{contributorCount !== 1 ? "s" : ""}
          </span>
        </div>
      )}
    </header>
  );
};

export default Header;
