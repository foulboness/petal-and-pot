import React from 'react';
import { 
  Heart, Leaf, ShieldCheck, Sprout, Sun, 
  MapPin, Clock, Mail, Phone, Sparkles 
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      {/* Intro Story */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4d6350] bg-[#e4ede3] px-3.5 py-1 rounded-full">
            <Sprout className="w-3.5 h-3.5 text-[#4d6350]" />
            <span>Our Glasshouse Story</span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#2c3830] font-normal leading-[1.15]">
            Rooted in cozy warmth, mindful greenery, and boundless love.
          </h1>

          <p className="text-sm sm:text-base text-[#526356] leading-relaxed">
            Petal &amp; Pot began as a tiny sunlit backyard greenhouse filled with terracotta pots, vintage botanical prints, and a deep appreciation for the quiet magic houseplants bring to modern homes.
          </p>

          <p className="text-sm sm:text-base text-[#526356] leading-relaxed">
            We believe caring for living greenery isn’t a chore—it is a grounding daily ritual. That’s why every plant in our studio is nurtured with peat-free organic soils, inspected leaf by leaf by our resident plant doctors, and delivered in protective, fully biodegradable packaging.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <div className="font-serif-display italic text-[#4d6350] text-xl">
              Clara &amp; Thomas Thorne
            </div>
            <span className="text-xs text-[#7d7065]">— Founders &amp; Horticulturists</span>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#f4f0ea]">
            <img
              src="https://i.pinimg.com/1200x/18/7d/70/187d70f3ae22642daac41425a7dbbc48.jpg"
              alt="Cottage botanical greenhouse"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* The 4 Petal & Pot Commitments */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#ece5da] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#869989]">
            The Petal &amp; Pot Pledge
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl text-[#2c3830] font-normal mt-1">
            Our Sustainable Greenhouse Promises
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#ece5da]">
            <div className="w-10 h-10 rounded-xl bg-[#e4ede3] text-[#3e5f43] flex items-center justify-center mb-3">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg text-[#2c3830] font-medium mb-1">
              100% Peat-Free
            </h3>
            <p className="text-xs text-[#5f6f62] leading-relaxed">
              We preserve fragile wild peat bogs by using sustainably harvested coconut coir and organic compost.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#ece5da]">
            <div className="w-10 h-10 rounded-xl bg-[#faeedb] text-[#855720] flex items-center justify-center mb-3">
              <Heart className="w-5 h-5 text-[#c97f8c] fill-[#fcecee]" />
            </div>
            <h3 className="font-serif-display text-lg text-[#2c3830] font-medium mb-1">
              Pet Safety Transparency
            </h3>
            <p className="text-xs text-[#5f6f62] leading-relaxed">
              Every single botanical specimen is cross-checked with ASPCA veterinary toxicological databases.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#ece5da]">
            <div className="w-10 h-10 rounded-xl bg-[#f7e6e8] text-[#8a4a54] flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg text-[#2c3830] font-medium mb-1">
              30-Day Happiness
            </h3>
            <p className="text-xs text-[#5f6f62] leading-relaxed">
              Plants are living beings. If your plant arrives distressed or fails within 30 days, we replace it free!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#ece5da]">
            <div className="w-10 h-10 rounded-xl bg-[#e3ecf0] text-[#3d687a] flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg text-[#2c3830] font-medium mb-1">
              Lifetime Care Support
            </h3>
            <p className="text-xs text-[#5f6f62] leading-relaxed">
              Have a yellow leaf panic? Email our greenhouse doctors anytime with a photo for customized diagnosis.
            </p>
          </div>
        </div>
      </section>

      {/* Flagship Greenhouse Visit Card */}
      <section className="bg-[#f5f1eb] rounded-3xl p-6 sm:p-10 border border-[#e5dcce]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#869989]">
              Visit Us in Person
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-[#2c3830] font-normal mt-1 mb-4">
              The Petal &amp; Pot Glasshouse Studio
            </h2>
            <p className="text-xs sm:text-sm text-[#5d6d60] leading-relaxed mb-6">
              Come sip organic herbal tea, browse our pottery collections, and pot up your very own plant companion at our interactive potting bar.
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-[#445347]">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#4d6350] shrink-0" />
                <span>142 Ivy Blossom Lane, Green Valley, CA 94941</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#4d6350] shrink-0" />
                <span>Monday – Saturday: 9:00 AM – 6:00 PM · Sunday: 10:00 AM – 4:00 PM</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#4d6350] shrink-0" />
                <span>(555) 482-LUSH (5874)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#4d6350] shrink-0" />
                <span>hello@petalandpot.com</span>
              </div>
            </div>
          </div>

          <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xs border-2 border-white">
            <img
              src="https://i.pinimg.com/736x/ca/2b/bd/ca2bbd44b8c2e89350423e488222da6b.jpg"
              alt="Inside our studio"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
