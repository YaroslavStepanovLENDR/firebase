import React from "react";

export const InviteBanner: React.FC = () => {
  return (
    <div className="flex flex-col relative aspect-[3.008] items-center text-center mt-[15px] pt-[18px] pb-px px-[73px] rounded-[10px] max-md:ml-1.5 max-md:mr-1 max-md:px-5">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/99d2e4339e8a9f53e79e439658b1ead5932cbe8a600ba3ca6bd05091d741154a?placeholderIfAbsent=true"
        alt="Invite background"
        className="absolute h-full w-full object-cover inset-0"
      />
      <div className="relative flex w-[141px] max-w-full flex-col items-stretch">
        <h2 className="text-black text-xl font-normal max-md:mr-0.5">
          Invite friends
        </h2>
        <p className="text-[rgba(83,177,117,1)] text-lg font-bold mt-[5px] max-md:ml-1">
          Get up to 20$ in credits
        </p>
        <div className="bg-[rgba(83,177,117,1)] self-center flex w-[17px] shrink-0 h-[5px] mt-5 rounded-[15px]" />
      </div>
    </div>
  );
};
