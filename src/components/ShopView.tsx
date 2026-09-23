import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, PawPrint, RotateCcw } from 'lucide-react';
import { Plant, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ShopViewProps {
  plants: Plant[];
  onSelectPlant: (plant: Plant) => void;
  onAddToCart: (plant: Plant, e: React.MouseEvent) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (plant: Plant, e: React.MouseEvent) => void;
  recentlyAddedId: string | null;
  initialCategory?: ProductCategory;
  initialSearch?: string;
}

export const ShopView: React.FC<ShopViewProps> = ({
  plants,
  onSelectPlant,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  recentlyAddedId,
  initialCategory = 'all',
  initialSearch = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedSunlight, setSelectedSunlight] = useState<string>('all');
  const [petFriendlyOnly, setPetFriendlyOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Plants' },
    { id: 'houseplants', label: 'Houseplants' },
    { id: 'succulents', label: 'Succulents' },
    { id: 'cacti', label: 'Cacti' },
    { id: 'flowers', label: 'Flowers' },
    { id: 'terrariums', label: 'Terrariums' },
    { id: 'pots-accessories', label: 'Pots & Accessories' },
  ];

  const filteredPlants = useMemo(() => {
    return plants.filter((plant) => {
      // Category filter
      if (selectedCategory !== 'all' && plant.category !== selectedCategory) {
        return false;
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = plant.name.toLowerCase().includes(q);
        const matchesLatin = plant.botanicalName.toLowerCase().includes(q);
        const matchesDesc = plant.description.toLowerCase().includes(q);
        if (!matchesName && !matchesLatin && !matchesDesc) {
          return false;
        }
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && plant.difficulty !== selectedDifficulty) {
        return false;
      }

      // Sunlight filter
      if (selectedSunlight !== 'all' && plant.sunlight !== selectedSunlight) {
        return false;
      }

      // Pet Friendly filter
      if (petFriendlyOnly && !plant.petFriendly) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'bestseller') return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
      return 0; // Default order
    });
  }, [plants, selectedCategory, searchQuery, selectedDifficulty, selectedSunlight, petFriendlyOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedDifficulty('all');
    setSelectedSunlight('all');
    setPetFriendlyOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    searchQuery !== '' || 
    selectedDifficulty !== 'all' || 
    selectedSunlight !== 'all' || 
    petFriendlyOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs uppercase tracking-widest font-bold text-[#869989]">
          The Botanical Collection
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#2c3830] font-normal mt-1">
          Potted Plants &amp; Living Art
        </h1>
        <p className="text-sm sm:text-base text-[#617164] mt-2">
          Hand-potted in peat-free organic soil, inspected by our plant doctors, and delivered with love.
        </p>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#4d6350] text-[#faf8f5] shadow-xs scale-102'
                  : 'bg-[#ffffff] text-[#556358] border border-[#ece5da] hover:border-[#cbd6c9] hover:bg-[#f6f3ed]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-[#ffffff] p-4 rounded-2xl border border-[#ece5da] shadow-2xs mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8a998c] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plants, care, or botanical name..."
              className="w-full bg-[#faf8f5] pl-9.5 pr-8 py-2 rounded-full text-xs text-[#2c3830] placeholder-[#8a998c] border border-[#ece5da] focus:outline-none focus:border-[#4d6350]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a998c] hover:text-[#2c3830]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Selectors */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Sunlight Selector */}
            <select
              value={selectedSunlight}
              onChange={(e) => setSelectedSunlight(e.target.value)}
              className="bg-[#faf8f5] border border-[#ece5da] rounded-full px-3 py-1.5 text-xs text-[#48554a] focus:outline-none focus:border-[#4d6350]"
            >
              <option value="all">Sunlight: Any</option>
              <option value="Low light">Low Light</option>
              <option value="Bright indirect">Bright Indirect</option>
              <option value="Direct sun">Direct Sun</option>
            </select>

            {/* Difficulty Selector */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-[#faf8f5] border border-[#ece5da] rounded-full px-3 py-1.5 text-xs text-[#48554a] focus:outline-none focus:border-[#4d6350]"
            >
              <option value="all">Care: Any Difficulty</option>
              <option value="Easy-peasy">Easy-peasy (Forgiving)</option>
              <option value="Moderate">Moderate</option>
              <option value="Green thumb">Green Thumb</option>
            </select>

            {/* Pet-Friendly Toggle */}
            <button
              onClick={() => setPetFriendlyOnly(!petFriendlyOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                petFriendlyOnly
                  ? 'bg-[#e4ede3] border-[#a9c2a6] text-[#2c4e31]'
                  : 'bg-[#faf8f5] border-[#ece5da] text-[#5c6c5f] hover:border-[#cbd6c9]'
              }`}
            >
              <PawPrint className={`w-3.5 h-3.5 ${petFriendlyOnly ? 'text-[#3e6843]' : 'text-[#8b998d]'}`} />
              <span>Pet-Friendly Only </span>
            </button>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#faf8f5] border border-[#ece5da] rounded-full px-3 py-1.5 text-xs text-[#48554a] focus:outline-none focus:border-[#4d6350] ml-auto"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="bestseller">Best Sellers</option>
            </select>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-[#f4f0ea] flex items-center justify-between text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[#7d7065] mr-1">Active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="bg-[#eef3ee] text-[#3e5642] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')}>×</button>
                </span>
              )}
              {selectedSunlight !== 'all' && (
                <span className="bg-[#eef3ee] text-[#3e5642] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  Light: {selectedSunlight}
                  <button onClick={() => setSelectedSunlight('all')}>×</button>
                </span>
              )}
              {selectedDifficulty !== 'all' && (
                <span className="bg-[#eef3ee] text-[#3e5642] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  Difficulty: {selectedDifficulty}
                  <button onClick={() => setSelectedDifficulty('all')}>×</button>
                </span>
              )}
              {petFriendlyOnly && (
                <span className="bg-[#fcedef] text-[#7d3b44] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  Pet-Friendly ♡
                  <button onClick={() => setPetFriendlyOnly(false)}>×</button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-[#f0ebe3] text-[#556358] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  &ldquo;{searchQuery}&rdquo;
                  <button onClick={() => setSearchQuery('')}>×</button>
                </span>
              )}
            </div>

            <button
              onClick={resetFilters}
              className="text-[#6d7e70] hover:text-[#2c3830] font-medium flex items-center gap-1 text-xs shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all</span>
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6 text-xs text-[#7d7065]">
        <span>Showing {filteredPlants.length} botanical varieties</span>
      </div>

      {/* Products Grid */}
      {filteredPlants.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredPlants.map((plant) => (
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
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#ece5da] max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#f8ebed] text-[#c97f8c] flex items-center justify-center mx-auto mb-3">
            <PawPrint className="w-6 h-6" />
          </div>
          <h3 className="font-serif-display text-xl text-[#2c3830]">
            No botanical companions found
          </h3>
          <p className="text-xs text-[#6e7d71] mt-1 mb-6">
            Try adjusting your sunlight or difficulty filters to see more of our greenhouse collection.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-full bg-[#4d6350] text-white text-xs font-semibold hover:bg-[#3d5140] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
