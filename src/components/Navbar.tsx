import React, { useState } from 'react';
import { Heart, ShoppingBag, Menu, X, Search, BookOpen, Info, Sprout } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  wishlistCount: number;
  cartCount: number;
  cartTotal: number;
  openCart: () => void;
  openWishlist: () => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  wishlistCount,
  cartCount,
  cartTotal,
  openCart,
  openWishlist,
  onSearchClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'care', label: 'Care Guide', icon: BookOpen },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#ece5da] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#e4ede3] border border-[#cbd6c9] flex items-center justify-center text-[#4d6350] group-hover:bg-[#4d6350] group-hover:text-[#faf8f5] transition-colors shadow-xs">
              <Sprout className="w-5 h-5 transition-transform group-hover:rotate-12" />
            </div>
            <div>
              <span className="font-serif-display text-2xl sm:text-3xl font-normal text-[#2c3830] tracking-tight flex items-center gap-1">
                Petal &amp; Pot
                <span className="text-sm font-sans text-[#c97f8c] font-normal">♡</span>
              </span>
              <p className="text-[11px] text-[#7d7065] tracking-widest uppercase -mt-1 font-medium">
                Botanical Greenhouse &amp; Flora
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#4d6350] text-[#faf8f5] shadow-xs'
                      : 'text-[#4e5c52] hover:text-[#243026] hover:bg-[#f1ece4]'
                  }`}
                >
                  {link.icon && <link.icon className="w-3.5 h-3.5" />}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Search, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              id="nav-search-btn"
              onClick={onSearchClick}
              title="Search plants"
              className="p-2 text-[#4e5c52] hover:text-[#243026] hover:bg-[#f1ece4] rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              id="nav-wishlist-btn"
              onClick={openWishlist}
              title="View Wishlist"
              className="relative p-2 text-[#4e5c52] hover:text-[#c97f8c] hover:bg-[#f8ebed] rounded-full transition-colors"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#e8b7bd] text-[#c97f8c]' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c97f8c] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={openCart}
              className="flex items-center gap-2 bg-[#4d6350] hover:bg-[#3d5140] text-[#faf8f5] px-3.5 py-2 rounded-full text-sm font-medium transition-colors shadow-xs"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#e8b7bd] text-[#2c3830] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {cartCount > 0 ? `$${cartTotal.toFixed(2)}` : 'Cart'}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#4e5c52] hover:text-[#243026] hover:bg-[#f1ece4] rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#ece5da] bg-[#faf8f5] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium flex items-center justify-between ${
                  isActive
                    ? 'bg-[#4d6350] text-[#faf8f5]'
                    : 'text-[#354238] hover:bg-[#f1ece4]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {link.icon && <link.icon className="w-4 h-4" />}
                  <span>{link.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
