
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Facebook, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [progress, setProgress] = useState(33);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleGoogleLogin = () => {
    // Mock Google login functionality
    toast.success(t("login.googleSuccess"));
    navigate("/dashboard");
  };

  const handleFacebookLogin = () => {
    // Mock Facebook login functionality
    toast.success(t("login.facebookSuccess"));
    navigate("/dashboard");
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length > 6) {
      setProgress(66);
      toast.success("Verification code sent");
      // In a real app, this would send a verification code
    } else {
      toast.error("Please enter a valid phone number");
    }
  };

  return (
    <div className={`max-w-[420px] mx-auto min-h-screen bg-white flex flex-col ${language === "he" ? "rtl" : "ltr"}`}>
      {/* Hero image and tagline */}
      <div className="flex-1 flex flex-col">
        <div className="relative px-4 pt-4">
          <Link to="/home" className="absolute top-4 left-4 z-10">
            <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          
          {/* Main image with rentable items */}
          <img 
            src="/lovable-uploads/ff3ae552-219d-4128-aa4b-680964a20af7.png" 
            alt="Rentable items" 
            className="w-full h-auto"
          />
        </div>

        {/* Tagline */}
        <div className="px-6 mt-4 text-center">
          <h1 className="text-2xl font-bold">
            Rent Out. Cash In.
          </h1>
        </div>

        {/* Phone number input */}
        <div className="px-6 mt-8">
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div className="flex items-center border border-gray-300 p-3 rounded-md">
              <div className="flex items-center space-x-2">
                <img src="https://flagcdn.com/il.svg" alt="Israel" className="w-6 h-4" />
                <span className="font-medium">+972</span>
              </div>
            </div>
          </form>
        </div>

        {/* Social media login section */}
        <div className="px-6 mt-12">
          <div className="text-center mb-6 text-gray-500">
            Or connect with social media
          </div>
          <div className="space-y-3">
            <Button 
              onClick={handleGoogleLogin}
              className="w-full bg-[#4285F4] hover:bg-[#4285F4]/90 text-white font-medium py-3 h-14 rounded-md"
            >
              <div className="bg-white p-1 rounded-sm mr-3">
                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              Continue with Google
            </Button>
            
            <Button 
              onClick={handleFacebookLogin}
              className="w-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-medium py-3 h-14 rounded-md"
            >
              <Facebook className="h-5 w-5 mr-3" />
              Continue with Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
