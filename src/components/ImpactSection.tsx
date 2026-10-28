import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, HeartHandshake, Sparkles, MapPin, Recycle, Users, Clock, Award } from 'lucide-react';

export const ImpactSection: React.FC = () => {
  const { setIsGiveModalOpen, setIsRequestModalOpen } = useApp();

  return (
    <section className="py-12 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Story & Philosophy */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="text-xs font-semibold text-emerald-800 tracking-wider">
            WHY KESHOSHARE?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-display">
            Shared Resources. A Better Tomorrow.
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            International models like <em>The Buy Nothing Project</em> and <em>Freecycle</em> proved that neighbors love giving without transactional money. KeshoShare brings this vision home to Nigeria — tailored for real estates, vibrant mainland neighborhoods, landmark pick-ups, and dispatch rider handovers.
          </p>
        </div>

        {/* 3 Pillars of KeshoShare */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-display">
              100% Free Mutual Aid
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              No cash sales, no hidden finder fees, no trades. Everything posted on KeshoShare is offered from one generous neighbor to another with love and zero obligation.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-display">
              Practical Local Collection
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Tailored for Nigerian realities. Handover at residential estate gates, recognized public landmarks (malls, BRT stops, fuel stations), or via reliable dispatch bikes.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-display">
              Gratitude & Dignity
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Asking for an item is done with pride and dignity. Giving an item creates a community bond. The Gratitude Wall captures stories of real difference made in every neighborhood.
            </p>
          </div>
        </div>

        {/* Impact Numbers Table */}
        <div className="bg-stone-900 text-white rounded-2xl p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-stone-800">
            <div className="md:pr-6">
              <div className="text-4xl font-extrabold text-emerald-400 font-display tabular-nums">
                3,840+
              </div>
              <div className="text-sm font-medium text-stone-300 mt-1">
                Items Kept in Active Use
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Diverted from waste into homes & schools
              </div>
            </div>

            <div className="pt-6 md:pt-0 md:px-6">
              <div className="text-4xl font-extrabold text-white font-display tabular-nums">
                ₦62.5M
              </div>
              <div className="text-sm font-medium text-stone-300 mt-1">
                Estimated Family Savings
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Calculated on fair second-hand market value
              </div>
            </div>

            <div className="pt-6 md:pt-0 md:px-6">
              <div className="text-4xl font-extrabold text-emerald-400 font-display tabular-nums">
                1,920
              </div>
              <div className="text-sm font-medium text-stone-300 mt-1">
                Students & Families Aided
              </div>
              <div className="text-xs text-stone-400 mt-1">
                With textbooks, baby cots & appliances
              </div>
            </div>

            <div className="pt-6 md:pt-0 md:pl-6">
              <div className="text-4xl font-extrabold text-white font-display tabular-nums">
                99.8%
              </div>
              <div className="text-sm font-medium text-stone-300 mt-1">
                Safe Handover Rating
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Verified through landmark protocols
              </div>
            </div>
          </div>
        </div>

        {/* Ready to share CTA */}
        <div className="p-8 border border-stone-200 rounded-2xl bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-stone-900 font-display">
              Have something sitting idle in your cupboard?
            </h3>
            <p className="text-sm text-stone-600">
              Your gently used item could be the exact answer to a neighbor's prayer today.
            </p>
          </div>
          <button
            onClick={() => setIsGiveModalOpen(true)}
            className="px-6 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-all shrink-0 shadow-xs"
          >
            Offer It Freely Now
          </button>
        </div>
      </div>
    </section>
  );
};
