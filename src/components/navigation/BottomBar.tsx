
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, User, Bell, Plus } from "lucide-react";

export const BottomBar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // This would be determined by authentication state in a real app
  const isLoggedIn = location.pathname.includes("/dashboard") || 
                     location.pathname.includes("/manage") ||
                     location.pathname.includes("/rental") ||
                     location.pathname.includes("/edit-profile");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200 py-3">
      <div className="max-w-[420px] mx-auto">
        <div className="grid grid-cols-5 gap-2">
          <Link
            to="/home"
            className={`flex flex-col items-center justify-center ${
              isActive("/home") ? "text-[rgba(83,177,117,1)]" : "text-gray-400"
            }`}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link
            to="/search"
            className={`flex flex-col items-center justify-center ${
              isActive("/search") ? "text-[rgba(83,177,117,1)]" : "text-gray-400"
            }`}
          >
            <Search className="h-6 w-6" />
            <span className="text-xs mt-1">Search</span>
          </Link>

          <Link
            to="/list"
            className={`flex flex-col items-center justify-center ${
              isActive("/list") ? "text-[rgba(83,177,117,1)]" : "text-gray-400"
            }`}
          >
            <div className="bg-[rgba(83,177,117,1)] rounded-full p-2">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs mt-1">List</span>
          </Link>

          <Link
            to="/notifications"
            className={`flex flex-col items-center justify-center ${
              isActive("/notifications") ? "text-[rgba(83,177,117,1)]" : "text-gray-400"
            }`}
          >
            <Bell className="h-6 w-6" />
            <span className="text-xs mt-1">Notifications</span>
          </Link>

          <Link
            to={isLoggedIn ? "/dashboard" : "/login"}
            className={`flex flex-col items-center justify-center ${
              (isActive("/profile") || isActive("/dashboard") || isActive("/login")) ? "text-[rgba(83,177,117,1)]" : "text-gray-400"
            }`}
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">{isLoggedIn ? "Account" : "Login"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
