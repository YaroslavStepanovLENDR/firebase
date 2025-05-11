
import React from "react";
import { MapPin } from "lucide-react";

export const LocationInfo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-2 mb-4">
      {/* App logo centered with reduced spacing */}
      <div className="mb-2">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/51856f8ca375be2b444300db039f98b9c156cdd53a627a318ecd27ba42a683cd?placeholderIfAbsent=true"
          alt="App Logo"
          className="h-10 w-auto"
        />
      </div>
      
      {/* Location info below the logo with reduced spacing */}
      <div className="flex items-center gap-1 text-sm text-[rgba(76,79,77,1)] font-normal">
        <MapPin className="h-3 w-3 text-[rgba(76,79,77,1)]" />
        <span>Tel Aviv, Israel</span>
      </div>
    </div>
  );
};
