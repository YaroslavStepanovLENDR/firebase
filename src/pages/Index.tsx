
import React from "react";
import { Header } from "@/components/home/Header";
import { LocationInfo } from "@/components/home/LocationInfo";
import { SearchBar } from "@/components/home/SearchBar";
import { InviteBanner } from "@/components/home/InviteBanner";
import { ItemsSection } from "@/components/home/ItemsSection";
import { PopularItems } from "@/components/home/PopularItems";
import { Categories } from "@/components/home/Categories";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { language } = useLanguage();

  return (
    <div className={`max-w-[420px] mx-auto bg-white min-h-screen ${language === "he" ? "text-right" : "text-left"}`}>
      <div className="flex flex-col overflow-hidden">
        <div className="bg-white flex w-full flex-col items-stretch pt-[17px] pb-[30px] px-[19px]">
          <Header />
          <LocationInfo />
          <SearchBar />
          <InviteBanner />
          <ItemsSection />
          <PopularItems />
          <Categories />
        </div>
      </div>
    </div>
  );
};

export default Index;
