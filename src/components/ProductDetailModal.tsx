import React, { useState } from 'react';
import { 
  X, Heart, Sun, Droplets, Thermometer, Wind, PawPrint, 
  ShieldCheck, Check, Sparkles, Plus, Minus, ShoppingBag, AlertTriangle 
} from 'lucide-react';
import { Plant } from '../types';

interface ProductDetailModalProps {
  plant: Plant | null;
  onClose: () => void;
  onAddToCart: (plant: Plant, quantity: number, size: string, potColor: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (plant: Plant, e: React.MouseEvent) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  plant,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!plant) return null;

  const [selectedImage, setSelectedImage] = useState<string>(plant.image);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [selectedPot, setSelectedPot] = useState<string>(plant.potOptions?.[0] || 'Standard Nursery Pot');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const sizes = plant.availableSizes || [
    { name: plant.size || 'Standard Size', priceMultiplier: 1.0 }
  ];

  const currentPrice = plant.price * sizes[selectedSizeIndex].priceMultiplier;

  const handleAdd = () => {
    onAddToCart(plant, quantity, sizes[selectedSizeIndex].name, selectedPot);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1400);
  };

  const images = [plant.image, ...(plant.additionalImages || [])];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#243026]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="product-detail-modal"
        className="relative bg-[#faf8f5] w-full max-w-4xl rounded-3xl shadow-2xl border border-[#ece5da] overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button
          id="close-detail-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#ffffff]/80 hover:bg-[#ffffff] text-[#4d6350] hover:text-[#243026] shadow-xs transition-colors"
          title="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 p-4 sm:p-6 bg-[#f4f0ea] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#ece5da]">
          <div className="relative aspect-4/3 md:aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-xs">
            <img
              src={selectedImage}
              alt={plant.name}
              className="w-full h-full object-cover object-center"
            />
            {plant.petFriendly && (
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-[#ffffff]/95 text-[#2d5032] text-xs font-semibold px-3 py-1 rounded-full shadow-xs border border-[#cbd6c9]">
                <PawPrint className="w-3.5 h-3.5 text-[#4e7954]" />
                Pet Safe &amp; Non-Toxic ♡
              </span>
            )}
          </div>

          {/* Thumbnail Selector */}
          {images.length > 1 && (
            <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === img
                      ? 'border-[#4d6350] shadow-xs scale-102'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Greenhouse Guarantee Note */}
          <div className="mt-4 pt-3 border-t border-[#ece5da]/70 flex items-center gap-3 text-xs text-[#637267]">
            <ShieldCheck className="w-5 h-5 text-[#4d6350] shrink-0" />
            <span>
              <strong>30-Day Healthy Plant Guarantee:</strong> Arrives lush and happy, or we will replace it free of charge.
            </span>
          </div>
        </div>

        {/* Right Column: Information, Care, & Add to Cart */}
        <div className="md:w-1/2 p-5 sm:p-7 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Category and Botanical Name */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-[#6d7e70] bg-[#e4ede3] px-2.5 py-0.5 rounded-full">
                {plant.category.replace('-', ' ')}
              </span>
              <button
                onClick={(e) => onToggleWishlist(plant, e)}
                className="flex items-center gap-1.5 text-xs text-[#7d7065] hover:text-[#c97f8c] font-medium"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#e8b7bd] text-[#c97f8c]' : ''}`} />
                <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>

            <h1 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#2c3830] tracking-tight">
              {plant.name}
            </h1>
            <p className="text-sm text-[#7d7065] italic mb-3">
              {plant.botanicalName}
            </p>

            {/* Price Row */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-[#2c3830]">
                ${currentPrice.toFixed(2)}
              </span>
              {plant.originalPrice && (
                <span className="text-sm text-[#9c9388] line-through">
                  ${(plant.originalPrice * sizes[selectedSizeIndex].priceMultiplier).toFixed(2)}
                </span>
              )}
              <span className="text-xs text-[#4d6350] font-medium bg-[#e4ede3] px-2 py-0.5 rounded-full ml-1">
                In Stock &amp; Freshly Potted
              </span>
            </div>

            {/* Pet Safety Alert Box */}
            <div className={`p-3 rounded-xl mb-4 text-xs flex items-start gap-2.5 border ${
              plant.petFriendly
                ? 'bg-[#eef4ee] text-[#2c4e31] border-[#c6dbc7]'
                : 'bg-[#fff5f5] text-[#733539] border-[#f0d2d4]'
            }`}>
              {plant.petFriendly ? (
                <PawPrint className="w-4 h-4 text-[#437548] shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-[#c97f8c] shrink-0 mt-0.5" />
              )}
              <div>
                <strong>{plant.petFriendly ? 'Pet-Friendly Choice ♡' : 'Pet Precaution ⚠️'}</strong>
                <p className="mt-0.5 opacity-90">{plant.petFriendlyNotes}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#4e5c52] leading-relaxed mb-4">
              {plant.description}
            </p>

            {/* Size Options */}
            {sizes.length > 1 && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#4e5c52] uppercase tracking-wider mb-2">
                  Select Plant Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((sz, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`py-2 px-2.5 text-xs font-medium rounded-xl border text-center transition-all ${
                        selectedSizeIndex === idx
                          ? 'border-[#4d6350] bg-[#e4ede3] text-[#2c4731] font-semibold shadow-xs'
                          : 'border-[#ece5da] bg-white text-[#5c6960] hover:border-[#cbd6c9]'
                      }`}
                    >
                      {sz.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pot Style Selection */}
            {plant.potOptions && plant.potOptions.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#4e5c52] uppercase tracking-wider mb-2">
                  Ceramic Pot Pairing
                </label>
                <select
                  value={selectedPot}
                  onChange={(e) => setSelectedPot(e.target.value)}
                  className="w-full bg-white border border-[#ece5da] rounded-xl px-3 py-2 text-xs text-[#2c3830] focus:outline-none focus:border-[#4d6350]"
                >
                  {plant.potOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt} (Included)
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Care Requirements 4-Grid */}
            <div className="grid grid-cols-2 gap-2 my-4">
              <div className="bg-[#f8f6f2] p-2.5 rounded-xl border border-[#ece5da] flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#e3ecf0] text-[#3e687a] flex items-center justify-center shrink-0">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#7d7065] uppercase font-bold">Watering</div>
                  <div className="text-xs font-medium text-[#2c3830]">{plant.watering}</div>
                </div>
              </div>

              <div className="bg-[#f8f6f2] p-2.5 rounded-xl border border-[#ece5da] flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#faeedb] text-[#916229] flex items-center justify-center shrink-0">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#7d7065] uppercase font-bold">Sunlight</div>
                  <div className="text-xs font-medium text-[#2c3830]">{plant.sunlight}</div>
                </div>
              </div>

              <div className="bg-[#f8f6f2] p-2.5 rounded-xl border border-[#ece5da] flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#e4ede3] text-[#3e5e43] flex items-center justify-center shrink-0">
                  <Wind className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#7d7065] uppercase font-bold">Humidity</div>
                  <div className="text-xs font-medium text-[#2c3830]">{plant.humidity}</div>
                </div>
              </div>

              <div className="bg-[#f8f6f2] p-2.5 rounded-xl border border-[#ece5da] flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#f7e6e8] text-[#8c4953] flex items-center justify-center shrink-0">
                  <Thermometer className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#7d7065] uppercase font-bold">Temperature</div>
                  <div className="text-xs font-medium text-[#2c3830]">{plant.temperature}</div>
                </div>
              </div>
            </div>

            {/* Greenhouse Tips */}
            {plant.careTips && plant.careTips.length > 0 && (
              <div className="mb-4 bg-[#f8f6f2] p-3 rounded-xl border border-[#ece5da]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#4d6350] mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c97f8c]" />
                  <span>Greenhouse Care Tips:</span>
                </div>
                <ul className="text-xs text-[#526155] space-y-1 list-disc list-inside">
                  {plant.careTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Bottom Action Row: Quantity + Add to Cart */}
          <div className="pt-3 border-t border-[#ece5da] flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center border border-[#ece5da] bg-white rounded-full p-1 shadow-xs">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#556358] hover:bg-[#f4f0ea] active:scale-95"
                title="Decrease"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-[#2c3830]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#556358] hover:bg-[#f4f0ea] active:scale-95"
                title="Increase"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              id="modal-add-to-cart-btn"
              onClick={handleAdd}
              className={`flex-1 py-3 px-5 rounded-full font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98 ${
                addedAnimation
                  ? 'bg-[#3b5e40] text-white'
                  : 'bg-[#4d6350] hover:bg-[#3d5140] text-white'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart · ${(currentPrice * quantity).toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
