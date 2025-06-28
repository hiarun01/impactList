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

const userInputSection = ({category, setCategory}) => {
  return (
    <div className="sticky top-0 z-10 bg-white flex flex-col items-center justify-center w-full h-full shadow">
      <div className="w-full max-w-3xl text-center py-5 px-5">
        <h1 className="lg:text-3xl text-2xl font-bold">
          What changed your life?
        </h1>
        <p className="text-gray-600">
          Discover top things, Share your thoughts and experiences
        </p>
      </div>
      {/* post thoughts */}
      <div className="flex items-center justify-between mb-4 w-full max-w-3xl px-5">
        <div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="article">Article</SelectItem>
                <SelectItem value="podcast">Podcast</SelectItem>
                <SelectItem value="movies">Movies</SelectItem>
                <SelectItem value="advice">Advice</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <NavLink to="/contribute">
            <Button>Contribute</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default userInputSection;
