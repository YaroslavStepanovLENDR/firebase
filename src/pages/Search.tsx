
import React from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const CategoryCard = ({ 
  icon, 
  title, 
  color,
  link = "#"
}: { 
  icon: string; 
  title: string; 
  color: string;
  link?: string;
}) => (
  <Link to={link} className="block">
    <div className={`p-4 rounded-2xl mb-4 h-36 flex flex-col justify-between ${color}`}>
      <div className="flex justify-center">
        <img src={icon} alt={title} className="w-16 h-16 object-contain" />
      </div>
      <div className="font-medium text-center">{title}</div>
    </div>
  </Link>
);

const Search = () => {
  return (
    <div className="max-w-[420px] mx-auto bg-white min-h-screen">
      <div className="p-5">
        <h1 className="text-2xl font-semibold text-center mb-4">Find items</h1>
        
        {/* Search Input */}
        <div className="relative mb-6">
          <SearchIcon className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            type="search" 
            placeholder="Search" 
            className="pl-12 py-6 rounded-xl bg-gray-100 border-0"
          />
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4">
          <CategoryCard 
            icon="/lovable-uploads/a06df77e-a7ef-43d5-a98b-99fb054031b3.png" 
            title="Sport" 
            color="bg-green-50"
            link="/search/sport"
          />
          <CategoryCard 
            icon="/lovable-uploads/d4e155fd-1cc6-4318-8aa9-ec3c43d44155.png" 
            title="Tools" 
            color="bg-orange-50"
            link="/search/tools"
          />
          <CategoryCard 
            icon="/lovable-uploads/af611c17-603d-4347-b97d-88f6235c88f2.png" 
            title="Home" 
            color="bg-red-50"
            link="/search/home"
          />
          <CategoryCard 
            icon="/lovable-uploads/abb6f6eb-b103-4b69-bc06-c4ae13c9d63c.png" 
            title="Pets" 
            color="bg-purple-50"
            link="/search/pets"
          />
          <CategoryCard 
            icon="/lovable-uploads/b1b9109d-0ac2-4b4b-b96e-f5103b8f44fc.png" 
            title="Electronics" 
            color="bg-yellow-50"
            link="/search/electronics"
          />
          <CategoryCard 
            icon="/lovable-uploads/60ce17a6-b0ce-480f-adfa-2f1470799496.png" 
            title="Camping" 
            color="bg-blue-50"
            link="/search/camping"
          />
          <CategoryCard 
            icon="/lovable-uploads/d4821b6f-99d3-41b6-a227-0b0039ddee8a.png" 
            title="Water Sports" 
            color="bg-cyan-50"
            link="/search/water-sports"
          />
          <CategoryCard 
            icon="/lovable-uploads/1b11be59-3a09-4323-9928-43e54ae9231c.png" 
            title="Costumes" 
            color="bg-indigo-50"
            link="/search/costumes"
          />
          <CategoryCard 
            icon="/lovable-uploads/af611c17-603d-4347-b97d-88f6235c88f2.png" 
            title="Furniture" 
            color="bg-pink-50"
            link="/search/furniture"
          />
          <CategoryCard 
            icon="/lovable-uploads/ac2da450-10e2-47f8-b673-2ab8f94a918f.png" 
            title="Party" 
            color="bg-violet-50"
            link="/search/party"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
