
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Facebook } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Separator } from "@/components/ui/separator";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { t, language } = useLanguage();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error(t("register.fillAllFields"));
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error(t("register.passwordsNoMatch"));
      return;
    }
    
    // Mock registration success
    toast.success(t("register.success"));
    navigate("/dashboard");
  };

  const handleGoogleRegister = () => {
    // Mock Google registration
    toast.success(t("register.googleSuccess"));
    navigate("/dashboard");
  };

  const handleFacebookRegister = () => {
    // Mock Facebook registration
    toast.success(t("register.facebookSuccess"));
    navigate("/dashboard");
  };

  return (
    <div className={`max-w-[420px] mx-auto bg-white min-h-screen ${language === "he" ? "text-right" : "text-left"}`}>
      <div className="p-5">
        <Link to="/home">
          <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>

        <div className="mt-6 text-center">
          <h1 className="text-2xl font-semibold mb-6">{t("register.title")}</h1>
          
          <div className="space-y-4 my-6">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleRegister}
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                alt="Google" 
                className="w-5 h-5" 
              />
              <span>{t("register.continueWithGoogle")}</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white hover:bg-[#166FE5]"
              onClick={handleFacebookRegister}
            >
              <Facebook className="h-5 w-5" />
              <span>{t("register.continueWithFacebook")}</span>
            </Button>
          </div>
          
          <div className="relative my-6">
            <Separator />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500">
              {t("register.or")}
            </span>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="text-left">
              <Label htmlFor="fullName" className={`block mb-2 font-medium ${language === "he" ? "text-right" : "text-left"}`}>
                {t("register.fullName")}
              </Label>
              <Input 
                id="fullName" 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t("register.fullNamePlaceholder")} 
                className="w-full"
                dir={language === "he" ? "rtl" : "ltr"}
              />
            </div>
            
            <div className="text-left">
              <Label htmlFor="email" className={`block mb-2 font-medium ${language === "he" ? "text-right" : "text-left"}`}>
                {t("register.email")}
              </Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("register.emailPlaceholder")} 
                className="w-full"
                dir={language === "he" ? "rtl" : "ltr"}
              />
            </div>
            
            <div className="text-left">
              <Label htmlFor="password" className={`block mb-2 font-medium ${language === "he" ? "text-right" : "text-left"}`}>
                {t("register.password")}
              </Label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                placeholder={t("register.passwordPlaceholder")} 
                className="w-full"
                dir={language === "he" ? "rtl" : "ltr"}
              />
            </div>
            
            <div className="text-left">
              <Label htmlFor="confirmPassword" className={`block mb-2 font-medium ${language === "he" ? "text-right" : "text-left"}`}>
                {t("register.confirmPassword")}
              </Label>
              <Input 
                id="confirmPassword" 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder={t("register.confirmPasswordPlaceholder")} 
                className="w-full"
                dir={language === "he" ? "rtl" : "ltr"}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.8)]"
            >
              {t("register.registerButton")}
            </Button>
          </form>
          
          <div className="mt-6">
            <p className="text-gray-600">
              {t("register.haveAccount")}{" "}
              <Link to="/login" className="text-[rgba(83,177,117,1)] font-medium">
                {t("register.login")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
