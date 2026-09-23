import React, { useState } from 'react';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, Truck, Store, 
  Calendar, Tag, ArrowRight, ShieldCheck, Check, Sparkles 
} from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onExplorePlants: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExplorePlants,
}) => {
  if (!isOpen) return null;

  // Checkout states
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  
  // Tomorrow's date formatted as default delivery
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];
  const [deliveryDate, setDeliveryDate] = useState<string>(defaultDateStr);

  // Promo code
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Checkout form details
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.plant.price * item.quantity, 0);
  const discountRate = appliedPromo === 'COTTAGELOVE' ? 0.10 : appliedPromo === 'BOTANICAL10' ? 0.10 : 0;
  const discountAmount = subtotal * discountRate;
  
  // Free delivery threshold is $50
  const freeShippingThreshold = 50;
  const isFreeShipping = subtotal >= freeShippingThreshold || deliveryType === 'pickup';
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : 8.50;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = Math.max(0, subtotal - discountAmount + shippingFee + tax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    const code = promoInput.trim().toUpperCase();
    if (code === 'COTTAGELOVE' || code === 'BOTANICAL10') {
      setAppliedPromo(code);
      setPromoInput('');
    } else {
      setPromoError('Invalid code. Try "COTTAGELOVE" for 10% off!');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !email || (deliveryType === 'delivery' && !address)) {
      alert('Please fill in your name, email, and delivery details.');
      return;
    }

    const order: OrderDetails = {
      orderId: `POT-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName,
      email,
      deliveryType,
      deliveryDate,
      address,
      giftNote,
      total,
      items: [...items],
    };

    setCompletedOrder(order);
    onClearCart();
  };

  const resetAll = () => {
    setCompletedOrder(null);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#243026]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-[#faf8f5] shadow-2xl border-l border-[#ece5da] flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#ece5da] bg-[#ffffff] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#e4ede3] text-[#3e5e43] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif-display text-lg sm:text-xl text-[#2c3830] font-medium">
                  {completedOrder ? 'Order Confirmed!' : isCheckingOut ? 'Cottage Checkout' : 'Your Plant Basket'}
                </h2>
                <span className="text-xs text-[#7d7065]">
                  {completedOrder 
                    ? 'Thank you for growing with us ♡' 
                    : `${items.length} ${items.length === 1 ? 'item' : 'items'} in your cart`}
                </span>
              </div>
            </div>

            <button
              onClick={resetAll}
              className="p-2 rounded-full hover:bg-[#faf8f5] text-[#7d7065] hover:text-[#2c3830] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Completed Order Confirmation View */}
            {completedOrder ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#e4ede3] text-[#345b38] flex items-center justify-center mx-auto shadow-xs">
                  <Check className="w-8 h-8" />
                </div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#8c4953] bg-[#faebed] px-3 py-1 rounded-full">
                  Plant Delivery Scheduled!
                </span>
                <h3 className="font-serif-display text-2xl text-[#2c3830]">
                  Grown with Love, Handled with Care ♡
                </h3>
                <p className="text-xs sm:text-sm text-[#556358] leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong>{completedOrder.customerName}</strong>! Your order confirmation has been emailed to <strong>{completedOrder.email}</strong>.
                </p>

                {/* Order Details Card */}
                <div className="bg-white p-5 rounded-2xl border border-[#ece5da] text-left space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-[#f4f0ea]">
                    <span className="text-[#7d7065]">Order Number:</span>
                    <strong className="text-[#4d6350]">{completedOrder.orderId}</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-[#f4f0ea]">
                    <span className="text-[#7d7065]">Method:</span>
                    <span className="capitalize">{completedOrder.deliveryType}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-[#f4f0ea]">
                    <span className="text-[#7d7065]">Scheduled Date:</span>
                    <span className="font-medium text-[#2c3830]">{completedOrder.deliveryDate}</span>
                  </div>
                  {completedOrder.address && (
                    <div className="text-xs pb-2 border-b border-[#f4f0ea]">
                      <span className="text-[#7d7065] block mb-0.5">Shipping Destination:</span>
                      <span className="font-medium text-[#2c3830]">{completedOrder.address}</span>
                    </div>
                  )}
                  {completedOrder.giftNote && (
                    <div className="text-xs pb-2 border-b border-[#f4f0ea]">
                      <span className="text-[#7d7065] block mb-0.5">Gift Note on Box:</span>
                      <span className="italic text-[#556457]">&ldquo;{completedOrder.giftNote}&rdquo;</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm font-bold text-[#2c3830] pt-1">
                    <span>Total Paid:</span>
                    <span>${completedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={resetAll}
                    className="w-full py-3 rounded-full bg-[#4d6350] hover:bg-[#3d5140] text-white text-xs font-semibold tracking-wide transition-all shadow-xs"
                  >
                    Continue Exploring Plants
                  </button>
                </div>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form View */
              <form onSubmit={handlePlaceOrder} className="space-y-5">
                {/* Delivery or Pickup Toggle */}
                <div>
                  <label className="block text-xs font-bold text-[#4e5c52] uppercase tracking-wider mb-2">
                    Fulfillment Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                        deliveryType === 'delivery'
                          ? 'border-[#4d6350] bg-[#e4ede3] text-[#2c4e31] shadow-2xs'
                          : 'border-[#ece5da] bg-white text-[#637267]'
                      }`}
                    >
                      <Truck className="w-4 h-4" />
                      <span>Local Delivery</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('pickup')}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                        deliveryType === 'pickup'
                          ? 'border-[#4d6350] bg-[#e4ede3] text-[#2c4e31] shadow-2xs'
                          : 'border-[#ece5da] bg-white text-[#637267]'
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      <span>Greenhouse Pickup</span>
                    </button>
                  </div>
                </div>

                {/* Delivery Date Picker */}
                <div>
                  <label className="block text-xs font-bold text-[#4e5c52] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#4d6350]" />
                    <span>Choose Delivery / Pickup Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full bg-white border border-[#ece5da] rounded-xl px-3 py-2 text-xs text-[#2c3830] focus:outline-none focus:border-[#4d6350]"
                  />
                  <p className="text-[11px] text-[#7d7065] mt-1">
                    We harvest and water plants on the morning of scheduled dispatch.
                  </p>
                </div>

                {/* Contact Information */}
                <div className="space-y-3 pt-2 border-t border-[#ece5da]">
                  <div>
                    <label className="block text-xs font-semibold text-[#4e5c52] mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-white border border-[#ece5da] rounded-xl px-3 py-2 text-xs text-[#2c3830] focus:outline-none focus:border-[#4d6350]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4e5c52] mb-1">
                      Email Address (for order updates) *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full bg-white border border-[#ece5da] rounded-xl px-3 py-2 text-xs text-[#2c3830] focus:outline-none focus:border-[#4d6350]"
                    />
                  </div>

                  {deliveryType === 'delivery' && (
                    <div>
                      <label className="block text-xs font-semibold text-[#4e5c52] mb-1">
                        Delivery Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="123 Blossom Way, Apt 4B, City, ZIP"
                        className="w-full bg-white border border-[#ece5da] rounded-xl px-3 py-2 text-xs text-[#2c3830] focus:outline-none focus:border-[#4d6350]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#4e5c52] mb-1">
                      Complimentary Gift Note on Parcel (Optional)
                    </label>
                    <input
                      type="text"
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="e.g. Happy Housewarming, Sarah! Love, Mom ♡"
                      className="w-full bg-white border border-[#ece5da] rounded-xl px-3 py-2 text-xs text-[#2c3830] focus:outline-none focus:border-[#4d6350]"
                    />
                  </div>
                </div>

                {/* Simulated Payment Notice */}
                <div className="p-3 rounded-xl bg-[#eef3ee] border border-[#cbd6c9] text-xs text-[#355239] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#4d6350] shrink-0" />
                  <span>Secure Test Checkout. No real card charge will occur.</span>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="px-4 py-3 rounded-full border border-[#ece5da] bg-white text-xs font-semibold text-[#5c6b5e] hover:bg-[#f6f2eb]"
                  >
                    ← Back to Basket
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-full bg-[#4d6350] hover:bg-[#3d5140] text-white text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Place Order · ${total.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : items.length === 0 ? (
              /* Empty Cart State */
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#f4f0ea] text-[#7d7065] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif-display text-xl text-[#2c3830]">
                  Your Basket is Empty
                </h3>
                <p className="text-xs text-[#708073] max-w-xs mx-auto">
                  Bring home a little nature! Browse our curated houseplants, bundles, and artisanal pottery.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onExplorePlants();
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#4d6350] text-white text-xs font-semibold hover:bg-[#3d5140] transition-colors"
                  >
                    Explore Greenhouse Plants
                  </button>
                </div>
              </div>
            ) : (
              /* Cart Items List */
              <div className="space-y-4">
                
                {/* Free Shipping Progress Meter */}
                <div className="bg-[#ffffff] p-3.5 rounded-2xl border border-[#ece5da] text-xs">
                  {subtotal >= freeShippingThreshold ? (
                    <div className="flex items-center gap-2 text-[#315636] font-semibold">
                      <Check className="w-4 h-4 text-[#4d6350]" />
                      <span>Congratulations! You qualify for Free Local Delivery 🎉</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between text-[#5f6f62] mb-1.5">
                        <span>Add <strong>${(freeShippingThreshold - subtotal).toFixed(2)}</strong> more for Free Delivery!</span>
                        <span>{Math.round((subtotal / freeShippingThreshold) * 100)}%</span>
                      </div>
                      <div className="w-full bg-[#ece5da] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#4d6350] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Items Stack */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-white border border-[#ece5da] flex items-center gap-3.5 shadow-2xs"
                    >
                      <img
                        src={item.plant.image}
                        alt={item.plant.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif-display text-sm font-medium text-[#2c3830] truncate">
                          {item.plant.name}
                        </h4>
                        <div className="text-[11px] text-[#7d7065] truncate">
                          {item.selectedSize} {item.potColor ? `· ${item.potColor}` : ''}
                        </div>
                        <div className="text-xs font-semibold text-[#2c3830] mt-1">
                          ${(item.plant.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#ece5da] rounded-full p-0.5 bg-[#faf8f5] shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[#556358] hover:bg-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#2c3830]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[#556358] hover:bg-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-[#a89b8d] hover:text-[#c97f8c] transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#869989] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promo code (e.g. COTTAGELOVE)"
                        className="w-full bg-white border border-[#ece5da] rounded-xl pl-9 pr-3 py-2 text-xs text-[#2c3830] placeholder-[#869989] focus:outline-none focus:border-[#4d6350]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#ffffff] border border-[#ece5da] hover:border-[#cbd6c9] text-xs font-semibold text-[#445247]"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedPromo && (
                    <div className="text-xs text-[#325938] font-medium mt-1 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Code <strong>{appliedPromo}</strong> applied (10% discount)</span>
                    </div>
                  )}
                  {promoError && (
                    <div className="text-xs text-[#9c4d57] font-medium mt-1">
                      {promoError}
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Footer Order Summary & Checkout Trigger */}
          {items.length > 0 && !completedOrder && !isCheckingOut && (
            <div className="p-4 sm:p-6 bg-white border-t border-[#ece5da] space-y-3">
              <div className="space-y-1.5 text-xs text-[#5f6f62]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#8c4953] font-medium">
                    <span>Discount (10%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2c3830] pt-2 border-t border-[#f4f0ea]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                id="proceed-checkout-btn"
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 rounded-full bg-[#4d6350] hover:bg-[#3d5140] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
