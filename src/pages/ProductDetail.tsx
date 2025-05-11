
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MapPin, Calendar, DollarSign, ShieldCheck } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { type DateRange } from "react-day-picker";
import { useLanguage } from "@/contexts/LanguageContext";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const handleOwnerClick = () => {
    navigate('/profile');
  };

  const handleRequestRent = () => {
    console.log("Requesting to rent for dates:", dateRange);
    setIsCalendarOpen(false);
    toast.success(t("product.rentSuccess"));
    // In a real app, this would send the request to the backend
  };

  // Calculate total days and price
  const calculateTotalDays = () => {
    if (dateRange.from && dateRange.to) {
      return Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const days = calculateTotalDays();
    return (4.99 * days).toFixed(2);
  };

  return (
    <div className={`max-w-[420px] mx-auto bg-white min-h-screen ${language === "he" ? "text-right" : "text-left"}`}>
      <div className="p-5 pb-16">
        {/* Back button */}
        <Link to="/home">
          <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>

        {/* Product Image */}
        <div className="flex justify-center my-6">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/38b05d2fcaac35d0a98b42372a99d3351e4316dcf521a29430cf9ac1972e8360?placeholderIfAbsent=true"
            alt="Bosch power drill"
            className="w-[250px] h-[250px] object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="mt-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-semibold text-[rgba(24,23,37,1)]">Bosch power drill</h1>
            <Badge className="bg-[rgba(83,177,117,0.15)] text-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.25)] hover:text-[rgba(83,177,117,1)]">
              Used - Like New
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 mt-2 text-[rgba(76,79,77,1)]">
            <MapPin className="h-4 w-4" />
            <span>50m away</span>
          </div>
          
          <div className="mt-4">
            <h2 className="text-lg font-medium">{t("product.description")}</h2>
            <p className="mt-2 text-[rgba(76,79,77,1)]">
              Professional grade Bosch power drill. Perfect for DIY projects and home renovations. 
              Includes various drill bits and charger. Battery fully charged and ready to use.
            </p>
          </div>
          
          {/* Redesigned pricing section with better aesthetics */}
          <div className="mt-8 p-4 bg-[#F6F6F7] rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-5 w-5 text-[rgba(83,177,117,1)]" />
              <div className="text-2xl font-semibold text-[rgba(24,23,37,1)]">$4.99 <span className="text-sm font-normal text-[#8E9196]">{t("product.perDay")}</span></div>
            </div>
            
            <div className="flex items-center gap-2 mb-4 pl-1">
              <ShieldCheck className="h-4 w-4 text-[#8E9196]" />
              <div className="text-sm text-[#8E9196]">$30 {t("product.securityDeposit")}</div>
            </div>
            
            {dateRange.from && dateRange.to && (
              <div className="mb-4 p-3 bg-white rounded-lg border border-[#F1F1F1]">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                  </span>
                  <span className="text-sm text-[#8E9196]">
                    {calculateTotalDays()} {calculateTotalDays() === 1 ? t("product.day") : t("product.days")}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#F1F1F1]">
                  <span className="font-medium">{t("product.total")}</span>
                  <span className="font-semibold">${calculateTotalPrice()}</span>
                </div>
              </div>
            )}
            
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                className="flex-1 rounded-[17px] flex items-center gap-1"
                onClick={() => setIsCalendarOpen(true)}
              >
                <Calendar className="h-4 w-4" />
                {t("product.checkDates")}
              </Button>
              <Button 
                className="flex-1 bg-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.9)] rounded-[17px]"
                onClick={handleRequestRent}
                disabled={!dateRange.from || !dateRange.to}
              >
                {t("product.requestRent")}
              </Button>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-lg font-medium mb-2">{t("product.owner")}</h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">II</span>
              </div>
              <div onClick={handleOwnerClick} className="cursor-pointer hover:text-[rgba(83,177,117,1)] transition-colors">
                <p className="font-medium">Israel Israeli</p>
                <p className="text-sm text-[rgba(76,79,77,1)]">4.9 ★ (24 reviews)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Dialog */}
      <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <DialogContent className="max-w-[350px] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("product.selectDates")}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <CalendarComponent
              mode="range"
              selected={dateRange}
              onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
              className="pointer-events-auto"
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </div>
          <div className="flex justify-between items-center mt-2 text-sm">
            <div>
              {dateRange.from && (
                <span>
                  {format(dateRange.from, "PPP")}
                  {dateRange.to && ` - ${format(dateRange.to, "PPP")}`}
                </span>
              )}
            </div>
            <div className="text-[rgba(76,79,77,1)]">
              {dateRange.from && dateRange.to && (
                <span>
                  {t("product.total")}: $
                  {calculateTotalPrice()}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              className="bg-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.9)]"
              onClick={handleRequestRent}
              disabled={!dateRange.from || !dateRange.to}
            >
              {t("product.requestRent")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetail;
