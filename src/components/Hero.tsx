import React from 'react';
import { 
  Sparkles, ShieldCheck, Heart, Truck, Leaf, 
  ArrowRight, Star, Sprout 
} from 'lucide-react';
import { Plant } from '../types';
import { ProductCard } from './ProductCard';

interface HeroProps {
  onShopClick: () => void;
  featuredPlants: Plant[];
  bestSellers: Plant[];
  onSelectPlant: (plant: Plant) => void;
  onAddToCart: (plant: Plant, e: React.MouseEvent) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (plant: Plant, e: React.MouseEvent) => void;
  recentlyAddedId: string | null;
}

export const Hero: React.FC<HeroProps> = ({
  onShopClick,
  featuredPlants,
  bestSellers,
  onSelectPlant,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  recentlyAddedId,
}) => {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Main Cottage Botanical Hero */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-[#ece5da]">
        {/* Soft botanical background illustration blobs */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#eef4ee] blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-[#faeedb]/50 blur-3xl opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#e4ede3] border border-[#cbd6c9] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#3b5940] shadow-2xs">
                <Sprout className="w-3.5 h-3.5 text-[#4d6350]" />
                <span>Hand-grown in our Glasshouse Nursery</span>
                <span className="text-[#8aa18e]">·</span>
                <span className="text-[#8c4953] flex items-center gap-0.5">Pet-Safe Available ♡</span>
              </div>

              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#2c3830] font-normal tracking-tight leading-[1.15]">
                Bring a little <br className="hidden sm:inline" />
                <span className="italic text-[#4d6350] underline decoration-[#e8b7bd]/60 decoration-wavy decoration-2">
                  nature home
                </span>
                .
              </h1>

              <p className="text-base sm:text-lg text-[#556358] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Curated cottage houseplants, rare botanicals, and hand-thrown pottery. Grown with gentle care, sustainably packed in recycled paper, and delivered healthy to your sanctuary.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  id="hero-shop-btn"
                  onClick={onShopClick}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#4d6350] hover:bg-[#3b4e3e] text-white font-medium text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group active:scale-98"
                >
                  <span>Explore the Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left border-t border-[#ece5da]/80">
                <div className="flex items-center gap-2 text-xs text-[#526356]">
                  <ShieldCheck className="w-4 h-4 text-[#4d6350] shrink-0" />
                  <span>30-Day Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#526356]">
                  <Leaf className="w-4 h-4 text-[#4d6350] shrink-0" />
                  <span>100% Peat-Free Soil</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#526356]">
                  <Truck className="w-4 h-4 text-[#4d6350] shrink-0" />
                  <span>Free local over $50</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#526356]">
                  <Heart className="w-4 h-4 text-[#c97f8c] shrink-0 fill-[#f5d5da]" />
                  <span>Pet-Safe Verified</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Large Image */}
                <div className="aspect-4/5 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#f4f0ea]">
                  <img
                    src="https://i.pinimg.com/736x/59/7d/5a/597d5a54dd040c78a89f802d59f7e92a.jpg"
                    alt="Cottage plant corner"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Card: Rattlesnake Prayer Plant */}
                <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-xs p-3.5 rounded-2xl shadow-lg border border-[#ece5da] max-w-[210px] hidden sm:block">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://i.pinimg.com/1200x/40/8c/35/408c35b3ddbbdd55345db3e050af9a00.jpg"
                      alt=""
                      className="w-11 h-11 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <div className="text-xs font-serif-display font-medium text-[#2c3830]">
                        Rattlesnake Plant
                      </div>
                      <div className="text-[10px] text-[#4d6350] font-bold flex items-center gap-0.5">
                        <Heart className="w-2.5 h-2.5 fill-[#e8b7bd] text-[#c97f8c]" />
                        Pet-Friendly Choice
                      </div>
                      <div className="text-[11px] font-semibold text-[#2c3830]">
                        $34.00
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Card: Top Customer Rating */}
                <div className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-xs px-3.5 py-2.5 rounded-2xl shadow-lg border border-[#ece5da] flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-[#d49d47] text-[#d49d47]" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#2c3830]">
                    4.9 / 5 · 2,400+ Plant Parents
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Botanical Beauties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#637b67]">
              <Sparkles className="w-3.5 h-3.5 text-[#c97f8c]" />
              <span>Curated Selection</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#2c3830] font-normal mt-1">
              Featured Cottage Plants
            </h2>
            <p className="text-sm text-[#6c7d70] mt-1">
              Lush foliage, distinctive textures, and healthy established root systems.
            </p>
          </div>

          <button
            onClick={onShopClick}
            className="text-sm font-semibold text-[#4d6350] hover:text-[#2c3830] flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View All Greenery</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredPlants.slice(0, 4).map((plant) => (
            <ProductCard
              key={plant.id}
              plant={plant}
              onSelect={onSelectPlant}
              onAddToCart={(p, e) => onAddToCart(p, e)}
              isWishlisted={wishlistIds.has(plant.id)}
              onToggleWishlist={onToggleWishlist}
              isAddedJustNow={recentlyAddedId === plant.id}
            />
          ))}
        </div>
      </section>

      {/* Seasonal Spotlight: Autumn & Cottage Sanctuary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-linear-to-r from-[#eef3ee] via-[#f7f2ea] to-[#f9ecee] p-6 sm:p-10 lg:p-12 border border-[#ece5da] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-[#8c4953] bg-white/80 px-3 py-1 rounded-full border border-[#f0d4d8]">
                Seasonal Collection
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-[#2c3830] font-normal leading-snug">
                Warm Foliage, Terracotta &amp; Whispering Leaves
              </h2>
              <p className="text-sm text-[#556559] leading-relaxed max-w-lg">
                As the seasons shift, bring warmth indoors with velvety prayer plants, fragrant lavender blooms, and handmade terracotta planters designed to insulate roots and preserve humidity.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs bg-white/90 text-[#3e5642] px-3 py-1 rounded-full font-medium border border-[#cbd6c9]">
                  Autumn Ready
                </span>
                <span className="text-xs bg-white/90 text-[#3e5642] px-3 py-1 rounded-full font-medium border border-[#cbd6c9]">
                  Insulating Clay Pots
                </span>
                <span className="text-xs bg-white/90 text-[#3e5642] px-3 py-1 rounded-full font-medium border border-[#cbd6c9]">
                  100% Non-Toxic
                </span>
              </div>
              <div className="pt-2">
                <button
                  onClick={onShopClick}
                  className="px-6 py-3 rounded-full bg-[#4d6350] hover:bg-[#3d5140] text-white text-xs font-semibold tracking-wide transition-all shadow-xs"
                >
                  Shop Seasonal Favorites
                </button>
              </div>
            </div>

            <div className="md:col-span-5 grid grid-cols-2 gap-3">
              <img
                src="https://i.pinimg.com/736x/93/62/d2/9362d23a3bda6586bf47a273626f08d0.jpg"
                alt="Lavender"
                className="rounded-2xl h-44 sm:h-52 w-full object-cover shadow-xs border-2 border-white"
              />
              <img
                src="https://i.pinimg.com/736x/66/bb/fa/66bbfaeccf82081db60395cc6151863f.jpg"
                alt="Terracotta pots"
                className="rounded-2xl h-44 sm:h-52 w-full object-cover shadow-xs border-2 border-white mt-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#637b67]">
              <Heart className="w-3.5 h-3.5 fill-[#e8b7bd] text-[#c97f8c]" />
              <span>Beloved by Plant Parents</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#2c3830] font-normal mt-1">
              Greenhouse Best Sellers
            </h2>
            <p className="text-sm text-[#6c7d70] mt-1">
              Our most popular, forgiving, and universally adored companions.
            </p>
          </div>

          <button
            onClick={onShopClick}
            className="text-sm font-semibold text-[#4d6350] hover:text-[#2c3830] flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>See All Bestsellers</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.slice(0, 4).map((plant) => (
            <ProductCard
              key={plant.id}
              plant={plant}
              onSelect={onSelectPlant}
              onAddToCart={(p, e) => onAddToCart(p, e)}
              isWishlisted={wishlistIds.has(plant.id)}
              onToggleWishlist={onToggleWishlist}
              isAddedJustNow={recentlyAddedId === plant.id}
            />
          ))}
        </div>
      </section>

      {/* Real Cottage Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#869989]">
            Love Notes from Plant Parents
          </span>
          <h2 className="font-serif-display text-3xl text-[#2c3830] font-normal mt-1">
            Happy Homes &amp; Thriving Leaves
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#ece5da] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex gap-1 text-[#d49d47]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#4d5c50] leading-relaxed italic">
                “My Rattlesnake plant arrived packed with so much tender love! Not a single bent leaf, and the soil was still damp. It does its little prayer dance every night beside my bed.”
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#f4f0ea] flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#e4ede3] text-[#3e5e43] font-serif-display font-bold flex items-center justify-center text-sm">
                C
              </div>
              <div>
                <div className="text-xs font-bold text-[#2c3830]">Clara M.</div>
                <div className="text-[11px] text-[#7d7065]">Verified Plant Parent · Oregon</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#ece5da] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex gap-1 text-[#d49d47]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#4d5c50] leading-relaxed italic">
                “As a mother of two mischievous kittens, knowing Petal &amp; Pot clearly labels pet safety is a total game changer. The Boston fern is flourishing!”
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#f4f0ea] flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#faeedb] text-[#855720] font-serif-display font-bold flex items-center justify-center text-sm">
                E
              </div>
              <div>
                <div className="text-xs font-bold text-[#2c3830]">Elena &amp; Mochi</div>
                <div className="text-[11px] text-[#7d7065]">Verified Plant Parent · Vermont</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#ece5da] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex gap-1 text-[#d49d47]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#4d5c50] leading-relaxed italic">
                “The vintage brass mister is heirloom quality. Beautiful on my bookshelf and gives the finest mist for my money plant pups. 10/10 cottage aesthetic.”
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#f4f0ea] flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#f8e6e8] text-[#874952] font-serif-display font-bold flex items-center justify-center text-sm">
                J
              </div>
              <div>
                <div className="text-xs font-bold text-[#2c3830]">Julian K.</div>
                <div className="text-[11px] text-[#7d7065]">Verified Plant Parent · Seattle</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
