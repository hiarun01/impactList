import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {NavLink} from "react-router-dom";

const userInputSection = () => {
  return (
    <div className="sticky top-0 z-10 bg-white flex flex-col items-center justify-center w-full h-full shadow">
      <div className="mb-4 w-full max-w-3xl text-center py-5">
        <h1 className="text-3xl font-bold ">What changed your life?</h1>
        <p className="text-gray-600">Share your thoughts and experiences</p>
      </div>
      {/* post thoughts */}
      <div className="flex items-center justify-between mb-4 w-full max-w-3xl px-5">
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">All</SelectItem>
                <SelectItem value="banana">Books</SelectItem>
                <SelectItem value="blueberry">Article</SelectItem>
                <SelectItem value="grapes">Podcast</SelectItem>
                <SelectItem value="pineapple">Movies</SelectItem>
                <SelectItem value="pineapple">Advice</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <NavLink to="/contribute">
            <Button>Add</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default userInputSection;
