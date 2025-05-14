
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { db, auth } from "./firebase";

const RentalHistory = () => {
  // Mock rental history data
  const rentedItems = [
    {
      id: 1,
      name: "Santa Cruz MTB",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ba39cd2ca934b06299612068218e3b7be5db0ec720b29ea60992a555e5039d34",
      startDate: "May 15, 2023",
      endDate: "May 18, 2023",
      status: "Completed",
      total: 44.97
    },
    {
      id: 2,
      name: "64pcs universal tool set",
      image: "/lovable-uploads/d4e155fd-1cc6-4318-8aa9-ec3c43d44155.png",
      startDate: "Jun 10, 2023",
      endDate: "Jun 12, 2023",
      status: "Completed",
      total: 14.97
    }
  ];

  const lentItems = [
    {
      id: 1,
      name: "JOBE 10' SUP Paddle Board",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/e5cad6689a6578bf0c898d1cff4afa124e52740786bb27d9da7b0c0059302c7a",
      startDate: "Jul 5, 2023",
      endDate: "Jul 8, 2023",
      renter: "Michael B.",
      status: "Completed",
      total: 23.97
    },
    {
      id: 2,
      name: "Single kayak",
      image: "/lovable-uploads/d4821b6f-99d3-41b6-a227-0b0039ddee8a.png",
      startDate: "Aug 15, 2023",
      endDate: "Aug 16, 2023",
      renter: "Sarah T.",
      status: "Active",
      total: 9.99
    }
  ];

  const renderRentalItem = (item: any, isLent: boolean = false) => (
    <div 
      key={item.id} 
      className="border border-gray-200 rounded-lg p-3 mb-4"
    >
      <div className="flex items-center gap-3 mb-3">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-16 h-16 object-contain rounded-md"
        />
        <div className="flex-1">
          <h3 className="font-medium">{item.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge 
              className={
                item.status === "Active" 
                  ? "bg-blue-100 text-blue-600 hover:bg-blue-200" 
                  : "bg-green-100 text-green-600 hover:bg-green-200"
              }
            >
              {item.status}
            </Badge>
            <span className="text-sm text-gray-500">${item.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-2">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>{item.startDate} - {item.endDate}</span>
        </div>
        {isLent && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Package className="h-3.5 w-3.5" />
            <span>Rented to {item.renter}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-[420px] mx-auto bg-white min-h-screen pb-20">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Rental History</h1>
        </div>

        <Tabs defaultValue="borrowed" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="borrowed">Items I Borrowed</TabsTrigger>
            <TabsTrigger value="lent">Items I Lent</TabsTrigger>
          </TabsList>
          
          <TabsContent value="borrowed">
            {rentedItems.length > 0 ? (
              <div>
                {rentedItems.map(item => renderRentalItem(item))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">You haven't borrowed any items yet</p>
                <Link to="/home">
                  <Button className="mt-4 bg-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.8)]">
                    Browse Items
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="lent">
            {lentItems.length > 0 ? (
              <div>
                {lentItems.map(item => renderRentalItem(item, true))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">You haven't lent any items yet</p>
                <Link to="/list">
                  <Button className="mt-4 bg-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.8)]">
                    List an Item
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RentalHistory;
