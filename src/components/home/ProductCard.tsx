
import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  distance: string;
  price: string;
  hasAddButton?: boolean;
  detailLink?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  distance,
  price,
  hasAddButton = true,
  detailLink,
}) => {
  const CardContent = () => (
    <>
      <div className="h-[170px] font-normal">
        <img
          src={image}
          alt={title}
          className="aspect-[1] object-contain w-[141px] max-w-full"
        />
        <div className="w-full">
          <div className="min-h-[37px] w-full">
            <h3 className="text-black text-base leading-none tracking-[0.1px]">
              {title}
            </h3>
            <p className="text-[rgba(124,124,124,1)] text-sm leading-none">
              {distance}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-stretch gap-5 text-lg text-[rgba(24,23,37,1)] font-semibold whitespace-nowrap tracking-[0.1px] leading-none justify-between mt-2">
        <div className="my-auto">{price}</div>
        {hasAddButton && (
          <button className="bg-[rgba(83,177,117,1)] flex items-center justify-center w-[45px] h-[45px] rounded-[17px]">
            <Plus className="w-[17px] h-[17px] text-white" />
          </button>
        )}
      </div>
    </>
  );

  if (detailLink) {
    return (
      <Link to={detailLink} className="block">
        <article className="shadow-[0px_6px_12px_rgba(0,0,0,0)] border flex-1 px-[15px] py-[13px] rounded-[18px] border-[rgba(226,226,226,1)] border-solid hover:shadow-md transition-shadow">
          <CardContent />
        </article>
      </Link>
    );
  }

  return (
    <article className="shadow-[0px_6px_12px_rgba(0,0,0,0)] border flex-1 px-[15px] py-[13px] rounded-[18px] border-[rgba(226,226,226,1)] border-solid">
      <CardContent />
    </article>
  );
};
