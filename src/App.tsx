/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShopView } from './components/ShopView';
import { CareGuideView } from './components/CareGuideView';
import { AboutView } from './components/AboutView';
import { WishlistView } from './components/WishlistView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { PLANTS_DATA } from './data/plants';
import { Plant, CartItem, ProductCategory } from './types';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Modals & Drawers
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Cart State with LocalStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('petal_pot_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State with LocalStorage
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('petal_pot_wishlist');
      return saved ? new Set(JSON.parse(saved)) : new Set(['calathea-rattlesnake', 'string-of-hearts']);
    } catch {
      return new Set(['calathea-rattlesnake', 'string-of-hearts']);
    }
  });

  // Recently added toast animation
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('petal_pot_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('petal_pot_wishlist', JSON.stringify(Array.from(wishlistIds)));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add Plant to Cart
  const handleAddToCart = (
    plant: Plant,
    quantity = 1,
    selectedSize = plant.size || 'Standard Size',
    potColor?: string,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.plant.id === plant.id && item.selectedSize === selectedSize && item.potColor === potColor
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        const newItem: CartItem = {
          id: `${plant.id}-${Date.now()}`,
          plant,
          quantity,
          selectedSize,
          potColor: potColor || plant.potOptions?.[0],
        };
        return [...prev, newItem];
      }
    });

    setRecentlyAddedId(plant.id);
    setTimeout(() => setRecentlyAddedId(null), 1400);
    showToast(`Added "${plant.name}" to your plant basket! 🌿`);
  };

  // Wishlist toggle
  const handleToggleWishlist = (plant: Plant, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(plant.id)) {
        next.delete(plant.id);
        showToast(`Removed "${plant.name}" from your wishlist ♡`);
      } else {
        next.add(plant.id);
        showToast(`Saved "${plant.name}" to your wishlist ♡`);
      }
      return next;
    });
  };

  // Cart operations
  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Removed item from basket');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Calculated totals
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((sum, item) => sum + item.plant.price * item.quantity, 0);

  // Filtered plant lists for hero and pages
  const featuredPlants = PLANTS_DATA.filter((p) => p.featured);
  const bestSellers = PLANTS_DATA.filter((p) => p.bestSeller);
  const wishlistPlants = PLANTS_DATA.filter((p) => wishlistIds.has(p.id));

  // Navigation handlers
  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickSearch = () => {
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cottage-paper text-[#2c3830]">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavClick}
        wishlistCount={wishlistIds.size}
        cartCount={totalCartCount}
        cartTotal={totalCartPrice}
        openCart={() => setIsCartOpen(true)}
        openWishlist={() => handleNavClick('wishlist')}
        onSearchClick={handleQuickSearch}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Hero
            onShopClick={() => handleNavClick('shop')}
            featuredPlants={featuredPlants}
            bestSellers={bestSellers}
            onSelectPlant={(plant) => setSelectedPlant(plant)}
            onAddToCart={(plant, e) => handleAddToCart(plant, 1, plant.size, undefined, e)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            recentlyAddedId={recentlyAddedId}
          />
        )}

        {activeTab === 'shop' && (
          <ShopView
            plants={PLANTS_DATA}
            onSelectPlant={(plant) => setSelectedPlant(plant)}
            onAddToCart={(plant, e) => handleAddToCart(plant, 1, plant.size, undefined, e)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            recentlyAddedId={recentlyAddedId}
            initialCategory={selectedCategory}
            initialSearch={searchFilter}
          />
        )}

        {activeTab === 'care' && <CareGuideView />}

        {activeTab === 'about' && <AboutView />}

        {activeTab === 'wishlist' && (
          <WishlistView
            wishlistPlants={wishlistPlants}
            onSelectPlant={(plant) => setSelectedPlant(plant)}
            onAddToCart={(plant, e) => handleAddToCart(plant, 1, plant.size, undefined, e)}
            onRemoveFromWishlist={handleToggleWishlist}
            onExplorePlants={() => handleNavClick('shop')}
          />
        )}
      </main>

      {/* Floating Botanical Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#243026] text-[#faf8f5] px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium shadow-xl flex items-center gap-2 border border-[#455848] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-[#e8b7bd] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
        onAddToCart={(plant, quantity, size, potColor) => {
          handleAddToCart(plant, quantity, size, potColor);
        }}
        isWishlisted={selectedPlant ? wishlistIds.has(selectedPlant.id) : false}
        onToggleWishlist={(plant, e) => handleToggleWishlist(plant, e)}
      />

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onExplorePlants={() => handleNavClick('shop')}
      />

      {/* Simple Footer */}
      <footer className="bg-[#243026] text-[#e8ebe8] py-8 border-t border-[#354337] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <p className="text-xs sm:text-sm text-[#e8ebe8] font-medium tracking-wide">
            © 2026 Petal &amp; Pot Botanicals Inc. <span className="text-[#e8b7bd]">♡</span> All rights reserved.
          </p>
          <p className="text-xs text-[#a2b0a4] italic font-serif-display">
            A little green, a little lovely, always grown with love.
          </p>
        </div>
      </footer>
    </div>
  );
}
