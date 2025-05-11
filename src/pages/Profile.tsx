
import React, { useState } from "react";
import { MapPin, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

const ItemStatCard = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-2xl font-semibold text-[rgba(83,177,117,1)]">{value}</span>
    <span className="text-sm">{label}</span>
  </div>
);

const Profile = () => {
  const [activeTab, setActiveTab] = useState("listed");
  const { t, language } = useLanguage();

  return (
    <div className={`max-w-[420px] mx-auto bg-white min-h-screen ${language === "he" ? "text-right" : "text-left"}`}>
      <div className="flex flex-col items-center pt-8 pb-4">
        <Avatar className="w-24 h-24 border-4 border-white shadow-md bg-gradient-to-r from-cyan-300 to-pink-300">
          <AvatarImage src="/lovable-uploads/7a71587c-cd3a-41a5-bbd0-eeb14695e165.png" alt="Israel Israeli" />
          <AvatarFallback>II</AvatarFallback>
        </Avatar>
        
        <h1 className="text-2xl font-bold mt-4">Israel Israeli</h1>
        
        <div className="flex items-center mt-2">
          <div className="flex text-orange-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span className="ml-1 text-gray-500">(24)</span>
        </div>
        
        <div className="flex items-center text-gray-600 mt-2">
          <MapPin className="h-4 w-4 text-[rgba(83,177,117,1)]" />
          <span className="ml-1">Tel Aviv, Israel</span>
        </div>
        
        <div className="flex justify-between w-full px-12 mt-6">
          <ItemStatCard value={9} label={t("profile.borrows")} />
          <ItemStatCard value={10} label={t("profile.listed")} />
          <ItemStatCard value={15} label={t("profile.rents")} />
        </div>
      </div>
      
      <Tabs defaultValue="listed" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger 
            value="listed" 
            className="data-[state=active]:text-[rgba(83,177,117,1)] data-[state=active]:border-b-2 data-[state=active]:border-[rgba(83,177,117,1)] data-[state=active]:rounded-none"
          >
            {t("profile.listedTab")}
          </TabsTrigger>
          <TabsTrigger 
            value="rented" 
            className="data-[state=active]:text-[rgba(83,177,117,1)] data-[state=active]:border-b-2 data-[state=active]:border-[rgba(83,177,117,1)] data-[state=active]:rounded-none"
          >
            {t("profile.rentedTab")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="listed" className="mt-0">
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="border rounded-[18px] p-3">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/38b05d2fcaac35d0a98b42372a99d3351e4316dcf521a29430cf9ac1972e8360?placeholderIfAbsent=true" 
                alt="Bosch power drill" 
                className="w-full h-32 object-contain mb-2"
              />
              <h3 className="font-medium">Bosch power drill</h3>
              <p className="text-sm text-gray-500">50m</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold">$4.99</span>
                <button className="bg-[rgba(83,177,117,1)] w-8 h-8 rounded-full flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            
            <div className="border rounded-[18px] p-3">
              <img 
                src="/lovable-uploads/d4821b6f-99d3-41b6-a227-0b0039ddee8a.png" 
                alt="Single kayak" 
                className="w-full h-32 object-contain mb-2"
              />
              <h3 className="font-medium">Single kayak</h3>
              <p className="text-sm text-gray-500">250m</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold">$9.99</span>
                <button className="bg-[rgba(83,177,117,1)] w-8 h-8 rounded-full flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="rented" className="mt-0">
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="border rounded-[18px] p-3">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba39cd2ca934b06299612068218e3b7be5db0ec720b29ea60992a555e5039d34?placeholderIfAbsent=true" 
                alt="Santa Cruz MTB" 
                className="w-full h-32 object-contain mb-2"
              />
              <h3 className="font-medium">Santa Cruz MTB</h3>
              <p className="text-sm text-gray-500">100m</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold">$14.99</span>
                <button className="bg-[rgba(83,177,117,1)] w-8 h-8 rounded-full flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            
            <div className="border rounded-[18px] p-3">
              <img 
                src="/lovable-uploads/abb6f6eb-b103-4b69-bc06-c4ae13c9d63c.png" 
                alt="Foldable pet carrier" 
                className="w-full h-32 object-contain mb-2"
              />
              <h3 className="font-medium">Foldable pet carrier</h3>
              <p className="text-sm text-gray-500">75m</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold">$4.99</span>
                <button className="bg-[rgba(83,177,117,1)] w-8 h-8 rounded-full flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
