
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ProductCard } from "./ProductCard";

export const PopularItems: React.FC = () => {
  return (
    <section className="mt-6">
      <div className="flex items-stretch gap-5 font-semibold justify-between">
        <h2 className="text-[rgba(24,23,37,1)] text-2xl">Popular items</h2>
        <button className="text-[rgba(83,177,117,1)] text-base my-auto">
          See all
        </button>
      </div>
      <Carousel className="mt-[15px]">
        <CarouselContent className="-ml-2">
          <CarouselItem className="pl-2 basis-[220px]">
            <ProductCard
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/e5cad6689a6578bf0c898d1cff4afa124e52740786bb27d9da7b0c0059302c7a?placeholderIfAbsent=true"
              title="JOBE 10' SUP Paddle Board"
              distance="150m"
              price="$7.99"
              detailLink="/product/sup-board"
            />
          </CarouselItem>
          <CarouselItem className="pl-2 basis-[220px]">
            <ProductCard
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/ed7a910c47c9e2fdf7a00d3f87d644de0084c3f1d064976269aefd1eda6df762?placeholderIfAbsent=true"
              title="GoPro Hero6 Black"
              distance="200m"
              price="$4.99"
              detailLink="/product/gopro"
            />
          </CarouselItem>
          <CarouselItem className="pl-2 basis-[220px]">
            <ProductCard
              image="/lovable-uploads/d4e155fd-1cc6-4318-8aa9-ec3c43d44155.png"
              title="64pcs universal tool set"
              distance="300m"
              price="$4.99"
              detailLink="/product/tool-set"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
};
