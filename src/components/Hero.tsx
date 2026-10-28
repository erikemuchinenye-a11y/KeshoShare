import React from 'react';
import { useApp } from '../context/AppContext';
import { Gift, HandHeart, Sparkles, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  const { 
    setIsGiveModalOpen, 
    setIsRequestModalOpen, 
    items, 
    requests,
    selectedState,
    setSelectedState 
  } = useApp();

  return (
    <div className="bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Mission, Tagline, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-sm font-semibold text-emerald-800 tracking-wide">
              MUTUAL RESOURCE SHARING FOR NIGERIA
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.08] text-balance font-display">
              Give today. <br />
              <span className="text-emerald-800">Make tomorrow better.</span>
            </h1>

            <p className="text-lg text-stone-600 leading-relaxed max-w-xl">
              KeshoShare connects Nigerian neighbors to share usable home goods, books, baby gear, and tools completely free of charge. No bidding, no money exchanging hands — just real local support, safe landmark pick-ups, and genuine gratitude.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setIsGiveModalOpen(true)}
                className="px-6 py-3.5 text-base font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <Gift className="w-5 h-5" />
                <span>Offer an Item for Free</span>
              </button>

              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="px-6 py-3.5 text-base font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <HandHeart className="w-5 h-5 text-emerald-800" />
                <span>Post a Need or Wish</span>
              </button>
            </div>

            {/* Trust Marker */}
            <div className="flex items-center gap-3 text-xs text-stone-500 pt-2">
              <span>Zero transaction fees</span>
              <span aria-hidden="true">·</span>
              <span>Safe estate & landmark collection</span>
              <span aria-hidden="true">·</span>
              <span>100% community-driven</span>
            </div>
          </div>

          {/* Right Column: Authentic Community Photography */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-md bg-stone-100 group">
              <img
                src="/src/assets/images/hero_keshoshare_community_1793214493087.jpg"
                alt="Two Nigerian neighbors exchanging study books and household goods in a sunny Lagos courtyard"
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-900/20 to-transparent flex flex-col justify-end p-5 text-white">
                <p className="text-xs font-medium text-emerald-300 tracking-wide">
                  REAL NEIGHBORS · YABA & SURULERE CIRCLE
                </p>
                <p className="text-sm font-semibold mt-1">
                  "Study books that helped my son pass JAMB are now helping Mrs. Balogun's daughter."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI strip below hero split */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-stone-200">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tabular-nums font-display">
              3,840+
            </div>
            <div className="text-xs text-stone-600 mt-1">
              Gifts Shared Freely
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tabular-nums font-display">
              48 Circles
            </div>
            <div className="text-xs text-stone-600 mt-1">
              Across Lagos, Abuja & Ibadan
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tabular-nums font-display">
              ₦62.5M
            </div>
            <div className="text-xs text-stone-600 mt-1">
              Estimated Family Savings
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 tabular-nums font-display">
              100% Free
            </div>
            <div className="text-xs text-stone-600 mt-1">
              No Selling or Hidden Charges
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
