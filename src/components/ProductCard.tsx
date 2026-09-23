import React from 'react';
import { Heart, Sun, Droplets, PawPrint, Plus, Check } from 'lucide-react';
import { Plant } from '../types';

interface ProductCardProps {
  plant: Plant;
  onSelect: (plant: Plant) => void;
  onAddToCart: (plant: Plant, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  onToggleWishlist: (plant: Plant, e: React.MouseEvent) => void;
  isAddedJustNow?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  plant,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  isAddedJustNow = false,
}) => {
  return (
    <div
      id={`product-card-${plant.id}`}
      onClick={() => onSelect(plant)}
      className="group relative bg-[#ffffff] rounded-2xl p-3 sm:p-4 border border-[#ece5da] hover:border-[#cbd6c9] hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
    >
      {/* Top Image Container */}
      <div className="relative aspect-4/3 sm:aspect-square w-full rounded-xl overflow-hidden bg-[#f4f0ea]">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
          {plant.petFriendly ? (
            <span
              title="100% Non-Toxic & Pet-Friendly ♡"
              className="inline-flex items-center gap-1 bg-[#ffffff]/90 backdrop-blur-xs text-[#2e5234] text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-xs border border-[#cbd6c9]"
            >
              <PawPrint className="w-3 h-3 text-[#527d5a]" />
              <span>Pet-safe ♡</span>
            </span>
          ) : null}

          {plant.originalPrice && plant.originalPrice > plant.price && (
            <span className="inline-flex items-center bg-[#e8b7bd] text-[#422227] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              Save ${plant.originalPrice - plant.price}
            </span>
          )}

          {plant.bestSeller && (
            <span className="inline-flex items-center bg-[#4d6350] text-[#faf8f5] text-[10px] font-medium px-2 py-0.5 rounded-full shadow-xs">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          id={`wishlist-btn-${plant.id}`}
          onClick={(e) => onToggleWishlist(plant, e)}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-[#ffffff]/85 hover:bg-[#ffffff] text-[#556358] hover:text-[#c97f8c] backdrop-blur-xs transition-transform active:scale-90 shadow-xs"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#e8b7bd] text-[#c97f8c]' : 'text-[#647268]'
            }`}
          />
        </button>

        {/* Bottom difficulty pill over image */}
        <div className="absolute bottom-2 left-2">
          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#243026]/75 text-white backdrop-blur-xs">
            {plant.difficulty}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-1 mb-1">
          <div>
            <h3 className="font-serif-display text-lg text-[#2c3830] font-medium leading-snug group-hover:text-[#4d6350] transition-colors">
              {plant.name}
            </h3>
            <p className="text-xs text-[#7d7065] italic tracking-wide">
              {plant.botanicalName}
            </p>
          </div>
        </div>

        {/* Botanical Care Icons Requirement */}
        <div className="flex items-center gap-3 my-2 text-[11px] text-[#5e6d62] bg-[#f8f6f2] px-2.5 py-1.5 rounded-lg border border-[#ece5da]">
          <div className="flex items-center gap-1" title={`Sunlight: ${plant.sunlight}`}>
            <Sun className="w-3.5 h-3.5 text-[#b07d3e]" />
            <span className="truncate max-w-[85px]">{plant.sunlight}</span>
          </div>
          <span className="text-[#d8cfc4]">|</span>
          <div className="flex items-center gap-1" title={`Watering: ${plant.watering}`}>
            <Droplets className="w-3.5 h-3.5 text-[#4a7a8c]" />
            <span className="truncate max-w-[85px]">{plant.watering}</span>
          </div>
        </div>

        {/* Price and Add to Cart Row */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-2 border-t border-[#f4f0ea]">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-semibold text-[#2c3830]">
              ${plant.price.toFixed(2)}
            </span>
            {plant.originalPrice && (
              <span className="text-xs text-[#9d9388] line-through">
                ${plant.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            id={`add-to-cart-btn-${plant.id}`}
            onClick={(e) => onAddToCart(plant, e)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 shadow-xs ${
              isAddedJustNow
                ? 'bg-[#3b5e40] text-white'
                : 'bg-[#e4ede3] text-[#2c4731] hover:bg-[#4d6350] hover:text-[#ffffff]'
            }`}
          >
            {isAddedJustNow ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
