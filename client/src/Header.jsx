import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import {Button} from "./components/ui/button";
import {Users} from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  const isContributePage = location.pathname.startsWith("/contribute");

  if (isContributePage) return;

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
          <span className="text-sm font-medium">24 contributors</span>
        </div>
      )}
    </header>
  );
};

export default Header;
