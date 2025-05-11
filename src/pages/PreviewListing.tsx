
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MapPin, DollarSign, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const PreviewListing = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  // Mock data - in a real app, this would come from form state or context
  const listingData = {
    title: "Mountain Bike",
    description: "High-quality mountain bike with front suspension, hydraulic disc brakes, and 27-speed Shimano gears. Medium frame size suitable for riders 5'7\" to 5'11\". Includes helmet and basic repair kit.",
    price: 15,
    securityDeposit: 75,
    condition: "Used - Good",
    category: "Sport",
    location: "Tel Aviv, Israel"
  };

  const handlePublish = () => {
    toast.success(t("preview.publishSuccess"));
    navigate("/dashboard");
  };

  return (
    <div className={`max-w-[420px] mx-auto bg-white min-h-screen ${language === "he" ? "text-right" : "text-left"}`}>
      <div className="p-5 pb-16">
        <Link to="/list">
          <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>

        <h1 className="text-2xl font-semibold my-6">{t("preview.title")}</h1>

        <div className="flex justify-center my-6">
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="aspect-square rounded-md bg-gray-100 flex items-center justify-center">
              <img
                src="/lovable-uploads/8ecf4c6b-e697-4a83-b1de-67b43069df38.png"
                alt="Item preview"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="aspect-square rounded-md bg-gray-50 flex items-center justify-center text-gray-400">
              {t("preview.photoPlaceholder")}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-semibold text-[rgba(24,23,37,1)]">{listingData.title}</h2>
            <Badge className="bg-[rgba(83,177,117,0.15)] text-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.25)] hover:text-[rgba(83,177,117,1)]">
              {listingData.condition}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 mt-2 text-[rgba(76,79,77,1)]">
            <MapPin className="h-4 w-4" />
            <span>{listingData.location}</span>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-medium">{t("preview.description")}</h3>
            <p className="mt-2 text-[rgba(76,79,77,1)]">
              {listingData.description}
            </p>
          </div>
          
          <div className="mt-8 p-4 bg-[#F6F6F7] rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-5 w-5 text-[rgba(83,177,117,1)]" />
              <div className="text-2xl font-semibold text-[rgba(24,23,37,1)]">${listingData.price.toFixed(2)} <span className="text-sm font-normal text-[#8E9196]">{t("preview.perDay")}</span></div>
            </div>
            
            <div className="flex items-center gap-2 mb-4 pl-1">
              <ShieldCheck className="h-4 w-4 text-[#8E9196]" />
              <div className="text-sm text-[#8E9196]">${listingData.securityDeposit} {t("preview.securityDeposit")}</div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-2">{t("preview.owner")}</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">JD</span>
              </div>
              <div>
                <p className="font-medium">Jane Doe</p>
                <p className="text-sm text-[rgba(76,79,77,1)]">4.8 ★ (12 reviews)</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate("/list")}
            >
              {t("preview.edit")}
            </Button>
            <Button 
              className="flex-1 bg-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.8)]"
              onClick={handlePublish}
            >
              {t("preview.publish")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewListing;
