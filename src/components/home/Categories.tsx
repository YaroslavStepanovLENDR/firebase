
import React from "react";
import { ProductCard } from "./ProductCard";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export const Categories: React.FC = () => {
  return (
    <section className="mt-9">
      <div className="flex items-stretch gap-5 font-semibold justify-between">
        <h2 className="text-[rgba(3,3,3,1)] text-2xl">Categories</h2>
        <button className="text-[rgba(83,177,117,1)] text-base my-auto">
          See all
        </button>
      </div>
      
      <Carousel className="mt-[27px]">
        <CarouselContent className="-ml-2">
          <CarouselItem className="pl-2 basis-[248px]">
            <div className="relative">
              <div className="bg-[rgba(248,164,76,1)] relative w-full h-[105px] rounded-[18px] flex items-center px-8">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/83bd5dfe6ea093ceda3ab1f8e2cd252d597b6ca356b567853ea57ba2fe67f588?placeholderIfAbsent=true"
                  alt="Category icon"
                  className="aspect-[0.46] object-contain w-[33px] z-0 shrink-0"
                />
                <div className="text-xl text-[rgba(62,66,63,1)] font-semibold ml-2.5">
                  Costumes
                </div>
              </div>
            </div>
          </CarouselItem>
          
          <CarouselItem className="pl-2 basis-[248px]">
            <div className="relative">
              <div className="bg-[rgba(83,177,117,1)] relative w-full h-[105px] rounded-[18px] flex items-center px-8">
                <img
                  src="/lovable-uploads/d4e155fd-1cc6-4318-8aa9-ec3c43d44155.png"
                  alt="Tools icon"
                  className="aspect-[0.46] object-contain w-[33px] z-0 shrink-0"
                />
                <div className="text-xl text-white font-semibold ml-2.5">
                  Tools
                </div>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-2 basis-[248px]">
            <div className="relative">
              <div className="bg-[rgba(241,186,255,1)] relative w-full h-[105px] rounded-[18px] flex items-center px-8">
                <img
                  src="/lovable-uploads/abb6f6eb-b103-4b69-bc06-c4ae13c9d63c.png"
                  alt="Pets icon"
                  className="aspect-[0.46] object-contain w-[33px] z-0 shrink-0"
                />
                <div className="text-xl text-[rgba(62,66,63,1)] font-semibold ml-2.5">
                  Pets
                </div>
              </div>
            </div>
          </CarouselItem>
          
          <CarouselItem className="pl-2 basis-[248px]">
            <div className="relative">
              <div className="bg-[rgba(100,150,220,1)] relative w-full h-[105px] rounded-[18px] flex items-center px-8">
                <img
                  src="/lovable-uploads/60ce17a6-b0ce-480f-adfa-2f1470799496.png"
                  alt="Camping icon"
                  className="aspect-[0.46] object-contain w-[33px] z-0 shrink-0"
                />
                <div className="text-xl text-white font-semibold ml-2.5">
                  Camping
                </div>
              </div>
            </div>
          </CarouselItem>
          
          <CarouselItem className="pl-2 basis-[248px]">
            <div className="relative">
              <div className="bg-[rgba(255,220,100,1)] relative w-full h-[105px] rounded-[18px] flex items-center px-8">
                <img
                  src="/lovable-uploads/b1b9109d-0ac2-4b4b-b96e-f5103b8f44fc.png"
                  alt="Electronics icon"
                  className="aspect-[0.46] object-contain w-[33px] z-0 shrink-0"
                />
                <div className="text-xl text-[rgba(62,66,63,1)] font-semibold ml-2.5">
                  Electronics
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      
      <Carousel className="mt-[31px]">
        <CarouselContent className="-ml-2">
          <CarouselItem className="pl-2 basis-[220px]">
            <ProductCard
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/55d05825f1a583f3fa8301da10dcd8296fabad845620002116e5f6e2598f4c66?placeholderIfAbsent=true"
              title="The Joker Costume"
              distance="100m"
              price="$4.99"
              detailLink="/product/joker-costume"
            />
          </CarouselItem>
          <CarouselItem className="pl-2 basis-[220px]">
            <ProductCard
              image="/lovable-uploads/abb6f6eb-b103-4b69-bc06-c4ae13c9d63c.png"
              title="Foldable pet carrier"
              distance="75m"
              price="$4.99"
              detailLink="/product/pet-carrier"
            />
          </CarouselItem>
          <CarouselItem className="pl-2 basis-[220px]">
            <ProductCard
              image="/lovable-uploads/af611c17-603d-4347-b97d-88f6235c88f2.png"
              title="X10 Plastic chairs"
              distance="50m"
              price="$4.99"
              detailLink="/product/plastic-chairs"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
};
