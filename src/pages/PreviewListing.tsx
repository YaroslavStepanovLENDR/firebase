import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MapPin, DollarSign, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const PreviewListing = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  // Get listing data from localStorage
  const listingData = JSON.parse(localStorage.getItem("listingDraft") || "{}");

  const handlePublish = async () => {
    try {
      await addDoc(collection(db, "listings"), {
        ...listingData,
        title: listingData.title || "Untitled",
        description: listingData.description || "",
        category: listingData.category || "other",
        condition: listingData.condition || "Used - good",
        location: listingData.location || "Unknown",
        pricePerDay: Number(listingData.price) || 0,
        securityDeposit: Number(listingData.securityDeposit) || 0,
        available: true,
        createdAt: serverTimestamp(),
        ownerId: "guest"
      });

      toast.success(t("preview.publishSuccess") || "Listing published!");
      navigate("/dashboard");
    } catch (error) {
      console.error("🔥 Error publishing listing:", error);
      toast.error("Error publishing listing.");
    }
  };

  const wrapperClass = `max-w-[420px] mx-auto bg-white min-h-screen ${
    language === "he" ? "text-right" : "text-left"
  }`;

  return (
    <div className={wrapperClass}>
      <div className="p-5 pb-16">
        <Link to="/list">
          <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>

        <h1 className="text-2xl font-semibold my-6">{t("preview.title") || "Preview Listing"}</h1>

        <div className="flex justify-center my-6">
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="aspect-square rounded-md bg-gray-100 flex items-center justify-center">
              <img
                src={listingData.photoUrl || "/lovable-uploads/placeholder.png"}
                alt="Item preview"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="aspect-square rounded-md bg-gray-50 flex items-center justify-center text-gray-400">
              {t("preview.photoPlaceholder") || "Photo placeholder"}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-semibold text-[rgba(24,23,37,1)]">{listingData.title}</h2>
            <Badge className="bg-[rgba(83,177,117,0.15)] text-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.25)]">
              {listingData.condition}
            </Badge>
          </div>

          <div className="flex items-center gap-2 mt-2 text-[rgba(76,79,77,1)]">
            <MapPin className="h-4 w-4" />
            <span>{listingData.location}</span>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium">{t("preview.description") || "Description"}</h3>
            <p className="mt-2 text-[rgba(76,79,77,1)]">
              {listingData.description}
            </p>
          </div>

          <div className="mt-8 p-4 bg-[#F6F6F7] rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-5 w-5 text-[rgba(83,177,117,1)]" />
              <div className="text-2xl font-semibold text-[rgba(24,23,37,1)]">
                ${Number(listingData.price).toFixed(2)}{" "}
                <span className="text-sm font-normal text-[#8E9196]">{t("preview.perDay") || "per day"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 pl-1">
              <ShieldCheck className="h-4 w-4 text-[#8E9196]" />
              <div className="text-sm text-[#8E9196]">
                ${listingData.securityDeposit} {t("preview.securityDeposit") || "security deposit required"}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-2">{t("preview.owner") || "Owner"}</h3>
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
            <Button variant="outline" className="flex-1" onClick={() => navigate("/list")}>
              {t("preview.edit") || "Edit"}
            </Button>
            <Button
              className="flex-1 bg-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.8)]"
              onClick={handlePublish}
            >
              {t("preview.publish") || "Publish"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewListing;
