
import React from "react";
import { ProductCard } from "./ProductCard";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface SectionHeaderProps {
  title: string;
  showSeeAll?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  showSeeAll = true,
}) => (
  <div className="flex items-stretch gap-5 font-semibold justify-between">
    <h2 className="text-[rgba(24,23,37,1)] text-2xl">{title}</h2>
    {showSeeAll && (
      <button className="text-[rgba(83,177,117,1)] text-base my-auto">
        See all
      </button>
    )}
  </div>
);

export const ItemsSection: React.FC = () => {
  return (
    <section className="mt-6">
      <SectionHeader title="Items nearby" />
      <Carousel className="mt-[31px]">
        <CarouselContent className="-ml-2">
          <CarouselItem className="pl-2 basis-[220px]">
            <ProductCard
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/38b05d2fcaac35d0a98b42372a99d3351e4316dcf521a29430cf9ac1972e8360?placeholderIfAbsent=true"
              title="Bosch power drill"
              distance="50m"
              price="$4.99"
              detailLink="/product/detail"
            />
          </CarouselItem>
          <CarouselItem className="pl-2 basis-[220px]">
            <ProductCard
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/ba39cd2ca934b06299612068218e3b7be5db0ec720b29ea60992a555e5039d34?placeholderIfAbsent=true"
              title="Santa Cruz MTB"
              distance="100m"
              price="$14.99"
              detailLink="/product/santa-cruz-mtb"
            />
          </CarouselItem>
          <CarouselItem className="pl-2 basis-[220px]">
            <ProductCard
              image="/lovable-uploads/d4821b6f-99d3-41b6-a227-0b0039ddee8a.png"
              title="Single kayak"
              distance="250m"
              price="$9.99"
              detailLink="/product/single-kayak"
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
        </CarouselContent>
      </Carousel>
    </section>
  );
};
