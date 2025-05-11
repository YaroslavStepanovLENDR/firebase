
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Edit, Trash2, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const ManageListings = () => {
  const { t, language } = useLanguage();
  
  // Mock listing data
  const listings = [
    {
      id: 1,
      name: "JOBE 10' SUP Paddle Board",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e5cad6689a6578bf0c898d1cff4afa124e52740786bb27d9da7b0c0059302c7a",
      price: 7.99,
      condition: "Used - Good"
    },
    {
      id: 2,
      name: "64pcs universal tool set",
      image: "/lovable-uploads/d4e155fd-1cc6-4318-8aa9-ec3c43d44155.png",
      price: 4.99,
      condition: "New"
    },
    {
      id: 3,
      name: "Single kayak",
      image: "/lovable-uploads/d4821b6f-99d3-41b6-a227-0b0039ddee8a.png",
      price: 9.99,
      condition: "Used - Good"
    }
  ];

  const handleDelete = (id: number) => {
    toast.success(t("manage.deleteSuccess").replace("#", id.toString()));
  };

  return (
    <div className={`max-w-[420px] mx-auto bg-white min-h-screen pb-20 ${language === "he" ? "text-right" : "text-left"}`}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold">{t("manage.title")}</h1>
          </div>
          <Link to="/list">
            <Button 
              className="bg-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.8)] rounded-full w-10 h-10 p-0"
            >
              <PlusCircle className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {listings.map(listing => (
            <div 
              key={listing.id} 
              className="border border-gray-200 rounded-lg p-3 flex items-center gap-3"
            >
              <img 
                src={listing.image} 
                alt={listing.name} 
                className="w-20 h-20 object-contain rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-medium">{listing.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-[rgba(83,177,117,0.15)] text-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.25)]">
                    {listing.condition}
                  </Badge>
                  <span className="text-sm font-medium">${listing.price}{t("manage.perDay")}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4 text-gray-500" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => handleDelete(listing.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {listings.length === 0 && (
          <div className="text-center mt-10">
            <p className="text-gray-500 mb-4">{t("manage.noListings")}</p>
            <Link to="/list">
              <Button className="bg-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.8)]">
                {t("manage.createFirstListing")}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageListings;
