
import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const SantaCruzMTBDetail = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const handleRequestRent = () => {
    console.log("Requesting to rent for dates:", dateRange);
    setIsCalendarOpen(false);
    toast.success("Rental request sent successfully!");
  };

  const calculateTotalDays = () => {
    if (dateRange.from && dateRange.to) {
      return Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const days = calculateTotalDays();
    return (14.99 * days).toFixed(2);
  };

  return (
    <div className="max-w-[420px] mx-auto bg-white min-h-screen">
      <div className="p-5 pb-16">
        <Link to="/home">
          <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>

        <div className="flex justify-center my-6">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba39cd2ca934b06299612068218e3b7be5db0ec720b29ea60992a555e5039d34?placeholderIfAbsent=true"
            alt="Santa Cruz MTB"
            className="w-[250px] h-[250px] object-contain"
          />
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-semibold text-[rgba(24,23,37,1)]">Santa Cruz MTB</h1>
            <Badge className="bg-[rgba(83,177,117,0.15)] text-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.25)] hover:text-[rgba(83,177,117,1)]">
              Used - Excellent
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 mt-2 text-[rgba(76,79,77,1)]">
            <MapPin className="h-4 w-4" />
            <span>100m away</span>
          </div>
          
          <div className="mt-4">
            <h2 className="text-lg font-medium">Description</h2>
            <p className="mt-2 text-[rgba(76,79,77,1)]">
              High-quality Santa Cruz mountain bike with front suspension, hydraulic disc brakes,
              and 27-speed Shimano gears. Medium frame size suitable for riders 5'7" to 5'11".
              Includes helmet and basic repair kit.
            </p>
          </div>
          
          <div className="mt-8 p-4 bg-[#F6F6F7] rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-5 w-5 text-[rgba(83,177,117,1)]" />
              <div className="text-2xl font-semibold text-[rgba(24,23,37,1)]">$14.99 <span className="text-sm font-normal text-[#8E9196]">per day</span></div>
            </div>
            
            <div className="flex items-center gap-2 mb-4 pl-1">
              <ShieldCheck className="h-4 w-4 text-[#8E9196]" />
              <div className="text-sm text-[#8E9196]">$150 security deposit required</div>
            </div>
            
            {dateRange.from && dateRange.to && (
              <div className="mb-4 p-3 bg-white rounded-lg border border-[#F1F1F1]">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                  </span>
                  <span className="text-sm text-[#8E9196]">
                    {calculateTotalDays()} {calculateTotalDays() === 1 ? 'day' : 'days'}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#F1F1F1]">
                  <span className="font-medium">Total</span>
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
                Check dates
              </Button>
              <Button 
                className="flex-1 bg-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.9)] rounded-[17px]"
                onClick={handleRequestRent}
                disabled={!dateRange.from || !dateRange.to}
              >
                Request to Rent
              </Button>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-lg font-medium mb-2">Owner</h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">TP</span>
              </div>
              <div className="cursor-pointer hover:text-[rgba(83,177,117,1)] transition-colors">
                <p className="font-medium">Tim Parker</p>
                <p className="text-sm text-[rgba(76,79,77,1)]">4.8 ★ (23 reviews)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <DialogContent className="max-w-[350px] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Rental Dates</DialogTitle>
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
                  Total: $
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
              Request to Rent
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SantaCruzMTBDetail;
