import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "he";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    "home.inviteFriends": "Invite Friends",
    "home.getFree": "Get $10 Free",
    "home.exclusiveItems": "Exclusive Items",
    "home.viewAll": "View All",
    "home.popularItems": "Popular Items",
    "home.categories": "Categories",
    "changeLanguage": "Change Language",
    "english": "English",
    "hebrew": "Hebrew",
    
    // List Item page translations
    "listItem.title": "Turn your unused items into cash!",
    "listItem.photos": "Photos",
    "listItem.itemTitle": "Item title",
    "listItem.titlePlaceholder": "What are you listing?",
    "listItem.description": "Description",
    "listItem.descriptionPlaceholder": "Details, what's included, etc.",
    "listItem.condition": "Condition",
    "listItem.selectCondition": "Select condition",
    "listItem.category": "Category",
    "listItem.location": "Location",
    "listItem.locationPlaceholder": "Where is your item located?",
    "listItem.pricePerDay": "Price (per day)",
    "listItem.securityDeposit": "Security Deposit",
    "listItem.securityDepositRecommendation": "Recommended: 5x daily rental price",
    "listItem.continue": "Continue",
    "listItem.processingImage": "Processing image with AI...",
    "listItem.processing": "Processing...",
    
    // Categories
    "category.sport": "Sport",
    "category.tools": "Tools",
    "category.home": "Home",
    "category.electronics": "Electronics",
    "category.camping": "Camping",

    // Conditions
    "condition.brandNew": "Brand new",
    "condition.usedLikeNew": "Used - Like new",
    "condition.usedGood": "Used - Good",
    "condition.usedFair": "Used - Fair",

    // Map dialog
    "map.selectLocation": "Select Location",
    "map.mapDisplayHere": "Map would display here",
    "map.useThisLocation": "Use This Location",
    
    // Toast messages
    "toast.gettingLocation": "Getting your location...",
    "toast.locationUpdated": "Location updated",
    
    // Common
    "common.close": "Close",
    
    // ManageListings page
    "manage.title": "My Listings",
    "manage.noListings": "You don't have any listings yet",
    "manage.createFirstListing": "Create Your First Listing",
    "manage.condition": "Condition",
    "manage.perDay": "/day",
    "manage.deleteSuccess": "Item deleted successfully",
    
    // Product Detail page
    "product.description": "Description",
    "product.perDay": "per day",
    "product.securityDeposit": "security deposit required",
    "product.owner": "Owner",
    "product.selectDates": "Select Rental Dates",
    "product.checkDates": "Check dates",
    "product.requestRent": "Request to Rent",
    "product.rentSuccess": "Rental request sent successfully!",
    "product.total": "Total",
    "product.day": "day",
    "product.days": "days",
    
    // PreviewListing page
    "preview.title": "Preview Listing",
    "preview.photoPlaceholder": "Photo placeholder",
    "preview.description": "Description",
    "preview.perDay": "per day",
    "preview.securityDeposit": "security deposit required",
    "preview.owner": "Owner",
    "preview.edit": "Edit",
    "preview.publish": "Publish",
    "preview.publishSuccess": "Your listing has been published!",
    
    // Profile page
    "profile.borrows": "Borrows",
    "profile.listed": "Listed items",
    "profile.rents": "Rents",
    "profile.listedTab": "Listed",
    "profile.rentedTab": "Rented",
  },
  he: {
    "home.inviteFriends": "הזמן חברים",
    "home.getFree": "קבל $10 בחינם",
    "home.exclusiveItems": "פריטים בלעדיים",
    "home.viewAll": "צפה בהכל",
    "home.popularItems": "פריטים פופולריים",
    "home.categories": "קטגוריות",
    "changeLanguage": "שנה שפה",
    "english": "אנגלית",
    "hebrew": "עברית",
    
    // List Item page translations
    "listItem.title": "הפוך פריטים שאינם בשימוש לכסף!",
    "listItem.photos": "תמונות",
    "listItem.itemTitle": "כותרת הפריט",
    "listItem.titlePlaceholder": "מה אתה מציע להשכרה?",
    "listItem.description": "תיאור",
    "listItem.descriptionPlaceholder": "פרטים, מה כלול, וכו'",
    "listItem.condition": "מצב",
    "listItem.selectCondition": "בחר מצב",
    "listItem.category": "קטגוריה",
    "listItem.location": "מיקום",
    "listItem.locationPlaceholder": "היכן נמצא הפריט שלך?",
    "listItem.pricePerDay": "מחיר (ליום)",
    "listItem.securityDeposit": "פיקדון ביטחון",
    "listItem.securityDepositRecommendation": "מומלץ: פי 5 מהמחיר היומי",
    "listItem.continue": "המשך",
    "listItem.processingImage": "מעבד תמונה עם בינה מלאכותית...",
    "listItem.processing": "מעבד...",
    
    // Categories
    "category.sport": "ספורט",
    "category.tools": "כלים",
    "category.home": "בית",
    "category.electronics": "אלקטרוניקה",
    "category.camping": "קמפינג",

    // Conditions
    "condition.brandNew": "חדש לגמרי",
    "condition.usedLikeNew": "משומש - כמו חדש",
    "condition.usedGood": "משומש - במצב טוב",
    "condition.usedFair": "משומש - במצב סביר",

    // Map dialog
    "map.selectLocation": "בחר מיקום",
    "map.mapDisplayHere": "המפה תוצג כאן",
    "map.useThisLocation": "השתמש במיקום זה",
    
    // Toast messages
    "toast.gettingLocation": "מאתר את המיקום שלך...",
    "toast.locationUpdated": "המיקום עודכן",
    
    // Common
    "common.close": "סגור",
    
    // ManageListings page
    "manage.title": "הפריטים שלי",
    "manage.noListings": "אין לך פריטים עדיין",
    "manage.createFirstListing": "צור את הפריט הראשון שלך",
    "manage.condition": "מצב",
    "manage.perDay": "/יום",
    "manage.deleteSuccess": "הפריט נמחק בהצלחה",
    
    // Product Detail page
    "product.description": "תיאור",
    "product.perDay": "ליום",
    "product.securityDeposit": "נדרש פיקדון ביטחון",
    "product.owner": "בעלים",
    "product.selectDates": "בחר תאריכי השכרה",
    "product.checkDates": "בדוק תאריכים",
    "product.requestRent": "בקש להשכיר",
    "product.rentSuccess": "בקשת ההשכרה נשלחה בהצלחה!",
    "product.total": "סה״כ",
    "product.day": "יום",
    "product.days": "ימים",
    
    // PreviewListing page
    "preview.title": "תצוגה מקדימה",
    "preview.photoPlaceholder": "מקום לתמונה",
    "preview.description": "תיאור",
    "preview.perDay": "ליום",
    "preview.securityDeposit": "נדרש פיקדון ביטחון",
    "preview.owner": "בעלים",
    "preview.edit": "ערוך",
    "preview.publish": "פרסם",
    "preview.publishSuccess": "הפריט שלך פורסם בהצלחה!",
    
    // Profile page
    "profile.borrows": "השאלות",
    "profile.listed": "פריטים",
    "profile.rents": "השכרות",
    "profile.listedTab": "פריטים",
    "profile.rentedTab": "הושכרו",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    
    // Set the document direction based on language
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
