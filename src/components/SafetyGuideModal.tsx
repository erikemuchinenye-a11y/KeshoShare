import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, MapPin, Sun, Bike, Ban, CheckCircle } from 'lucide-react';

export const SafetyGuideModal: React.FC = () => {
  const { isSafetyGuideOpen, setIsSafetyGuideOpen } = useApp();

  if (!isSafetyGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-900">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900 font-display">
                Safe Collection Arrangements
              </h2>
              <p className="text-xs text-stone-500">
                Practical safety guidelines tailored for Nigerian communities
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSafetyGuideOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5 Practical Guidelines */}
        <div className="space-y-4 text-xs text-stone-700">
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
              <MapPin className="w-4 h-4 text-emerald-800" />
              <span>1. Public Landmark Meetings</span>
            </div>
            <p className="leading-relaxed">
              Always agree to meet at identifiable, busy public landmarks — such as major supermarket entrances (e.g., Shoprite, Spar, Prince Ebeano), well-lit fuel stations (TotalEnergies, Conoil), or major BRT / commercial bus stops.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>2. Estate Security Gate Handover</span>
            </div>
            <p className="leading-relaxed">
              If either party lives in a gated residential community or estate (e.g. in Lekki, Magodo, Ikeja GRA, or Garki), leaving the item with estate security guards with the recipient’s name and phone number is a safe, time-flexible option.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
              <Bike className="w-4 h-4 text-emerald-800" />
              <span>3. Dispatch Rider Pickup (Gokada, Feex, Chowdeck, Kwik)</span>
            </div>
            <p className="leading-relaxed">
              To beat traffic or long distances, the recipient may arrange a verified dispatch rider. <strong>Important:</strong> The recipient orders and pays the dispatch rider directly through their own app. The giver simply hands the parcel to the rider.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
              <Sun className="w-4 h-4 text-emerald-800" />
              <span>4. Strict Daylight Rule</span>
            </div>
            <p className="leading-relaxed">
              All physical handovers must take place during daylight hours (ideally between 9:00 AM and 5:00 PM). Never agree to late evening or dark alley meetups.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-1.5 text-amber-950">
            <div className="flex items-center gap-2 font-bold text-sm">
              <Ban className="w-4 h-4 text-amber-800" />
              <span>5. 100% Free Guarantee — No Upfront Fees</span>
            </div>
            <p className="leading-relaxed">
              Never pay anyone an "inspection fee", "holding deposit", or "form fee" to receive an item on KeshoShare. Any user demanding money should be reported immediately.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setIsSafetyGuideOpen(false)}
            className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
