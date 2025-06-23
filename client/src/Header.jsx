import React from "react";
import {NavLink} from "react-router-dom";
import {Button} from "./components/ui/button";

const Header = () => {
  return (
    <header className="bg-white text-black py-4 border-b px-5 lg:px-30 flex justify-between items-center shadow-2xs">
      <NavLink to="/" className="flex items-center gap-2">
        <span className="text-2xl font-extrabold  tracking-tight">
          impactList
        </span>
      </NavLink>
      <NavLink to="/dashboard">
        <Button className=" px-5 py-2 rounded-md font-semibold transition">
          Discover
        </Button>
      </NavLink>
    </header>
  );
};

export default Header;
