import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight, PawPrint, Sun, Droplets } from 'lucide-react';
import { Plant } from '../types';

interface WishlistViewProps {
  wishlistPlants: Plant[];
  onSelectPlant: (plant: Plant) => void;
  onAddToCart: (plant: Plant, e: React.MouseEvent) => void;
  onRemoveFromWishlist: (plant: Plant, e: React.MouseEvent) => void;
  onExplorePlants: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlistPlants,
  onSelectPlant,
  onAddToCart,
  onRemoveFromWishlist,
  onExplorePlants,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="w-12 h-12 rounded-full bg-[#f8ebed] text-[#c97f8c] flex items-center justify-center mx-auto mb-3">
          <Heart className="w-6 h-6 fill-current" />
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl text-[#2c3830] font-normal">
          Your Saved Botanical Loves
        </h1>
        <p className="text-xs sm:text-sm text-[#6c7d70] mt-1">
          Keep track of plants you adore and add them to your cottage jungle whenever you are ready.
        </p>
      </div>

      {wishlistPlants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistPlants.map((plant) => (
            <div
              key={plant.id}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-[#ece5da] shadow-2xs hover:border-[#cbd6c9] hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#f4f0ea] mb-4 cursor-pointer" onClick={() => onSelectPlant(plant)}>
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {plant.petFriendly && (
                    <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#2e5234] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                      <PawPrint className="w-3 h-3 text-[#4d7a52]" />
                      Pet-Safe ♡
                    </span>
                  )}
                  <button
                    onClick={(e) => onRemoveFromWishlist(plant, e)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/85 hover:bg-white text-[#8a998c] hover:text-[#c97f8c] transition-colors shadow-2xs"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="cursor-pointer" onClick={() => onSelectPlant(plant)}>
                  <h3 className="font-serif-display text-xl text-[#2c3830] font-medium hover:text-[#4d6350] transition-colors">
                    {plant.name}
                  </h3>
                  <p className="text-xs text-[#7d7065] italic mb-3">
                    {plant.botanicalName}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-[#556358] bg-[#faf8f5] p-2 rounded-xl border border-[#ece5da] mb-4">
                  <span className="flex items-center gap-1">
                    <Sun className="w-3 h-3 text-[#ad7d40]" /> {plant.sunlight}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-[#3d687a]" /> {plant.watering}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#f4f0ea] flex items-center justify-between">
                <span className="text-lg font-bold text-[#2c3830]">
                  ${plant.price.toFixed(2)}
                </span>

                <button
                  onClick={(e) => onAddToCart(plant, e)}
                  className="px-4 py-2 rounded-full bg-[#4d6350] hover:bg-[#3d5140] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#ece5da] max-w-md mx-auto p-6 shadow-2xs">
          <p className="text-sm text-[#667669] mb-6">
            Your wishlist is waiting for some leafy companions! Explore our plants and tap the heart icon ♡ to save your favorites.
          </p>
          <button
            onClick={onExplorePlants}
            className="px-6 py-3 rounded-full bg-[#4d6350] text-white text-xs font-semibold hover:bg-[#3d5140] transition-colors inline-flex items-center gap-2"
          >
            <span>Browse Houseplants</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
