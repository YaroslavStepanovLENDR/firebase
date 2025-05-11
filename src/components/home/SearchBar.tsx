
import React from "react";
import { Search } from "lucide-react";

export const SearchBar: React.FC = () => {
  return (
    <div className="relative mt-[22px]">
      <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-[rgba(124,124,124,1)]" />
      <input
        type="search"
        placeholder="Search item"
        className="bg-[rgba(242,243,242,1)] w-full text-sm text-[rgba(124,124,124,1)] font-medium px-[47px] py-[21px] rounded-[15px]"
      />
    </div>
  );
};
