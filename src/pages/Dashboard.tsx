
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  User, 
  Package, 
  History, 
  LogOut, 
  PlusCircle, 
  Edit,
  Star
} from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const handleLogout = () => {
    // Mock logout functionality
    toast.success("You've been logged out");
    // In a real app, this would clear authentication state
  };

  return (
    <div className="max-w-[420px] mx-auto bg-white min-h-screen pb-20">
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Link to="/home">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </Link>
        </div>

        <div className="mt-8">
          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium text-xl">JD</span>
              </div>
              <div>
                <h2 className="text-lg font-medium">Jane Doe</h2>
                <p className="text-gray-500">jane.doe@example.com</p>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star, index) => (
                      <Star 
                        key={index} 
                        className={`h-4 w-4 ${index < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-1">(24 reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-medium mb-4">Actions</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <Link to="/browse-items" className="block">
              <div className="bg-[rgba(83,177,117,0.1)] p-4 rounded-xl flex flex-col items-center justify-center h-32">
                <ShoppingBag className="h-8 w-8 text-[rgba(83,177,117,1)] mb-2" />
                <span className="font-medium text-center">Browse Items</span>
              </div>
            </Link>
            
            <Link to="/manage-profile" className="block">
              <div className="bg-blue-50 p-4 rounded-xl flex flex-col items-center justify-center h-32">
                <User className="h-8 w-8 text-blue-500 mb-2" />
                <span className="font-medium text-center">Manage Profile</span>
              </div>
            </Link>
            
            <Link to="/list" className="block">
              <div className="bg-purple-50 p-4 rounded-xl flex flex-col items-center justify-center h-32">
                <PlusCircle className="h-8 w-8 text-purple-500 mb-2" />
                <span className="font-medium text-center">List New Item</span>
              </div>
            </Link>
            
            <Link to="/manage-listings" className="block">
              <div className="bg-amber-50 p-4 rounded-xl flex flex-col items-center justify-center h-32">
                <Edit className="h-8 w-8 text-amber-500 mb-2" />
                <span className="font-medium text-center">Manage Listings</span>
              </div>
            </Link>
          </div>
          
          <div className="mt-8">
            <h2 className="text-lg font-medium mb-4">Activities</h2>
            
            <Link to="/rental-history" className="block mb-4">
              <div className="border border-gray-200 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <History className="h-5 w-5 text-gray-500" />
                  <span>Rental History</span>
                </div>
                <span className="text-[rgba(83,177,117,1)]">View</span>
              </div>
            </Link>
            
            <Link to="/my-listings" className="block">
              <div className="border border-gray-200 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-gray-500" />
                  <span>My Listings</span>
                </div>
                <span className="text-[rgba(83,177,117,1)]">View</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
