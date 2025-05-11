
import React from "react";
import { BottomBar } from "../navigation/BottomBar";
import { useLanguage } from "@/contexts/LanguageContext";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language } = useLanguage();
  
  return (
    <div className={`pb-20 ${language === "he" ? "text-right" : "text-left"}`}>
      {children}
      <BottomBar />
    </div>
  );
};
