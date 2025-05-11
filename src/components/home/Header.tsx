
import React from "react";
import { Flag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="self-center flex w-full max-w-full justify-between items-start">
      <div className="flex-1"></div>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Flag className="h-5 w-5 text-gray-600" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          <DropdownMenuItem 
            className={`cursor-pointer ${language === "en" ? "font-bold" : ""}`}
            onClick={() => setLanguage("en")}
          >
            {t("english")}
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={`cursor-pointer ${language === "he" ? "font-bold" : ""}`}
            onClick={() => setLanguage("he")}
          >
            {t("hebrew")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
