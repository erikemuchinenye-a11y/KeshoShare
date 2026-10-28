import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Bike, 
  Clock, 
  UserCircle, 
  CheckCircle2, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { CollectionMethod } from '../types';

export const ItemDetailModal: React.FC = () => {
  const { 
    activeItem, 
    setActiveItem, 
    currentUser, 
    claimItem, 
    confirmHandover,
    setActiveConversation 
  } = useApp();

  const [showClaimForm, setShowClaimForm] = useState(false);
  const [claimNote, setClaimNote] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<CollectionMethod>('Public Landmark Meetup');

  if (!activeItem) return null;

  const isGiver = activeItem.giverId === currentUser.id;
  const isHandedOver = activeItem.status === 'handed_over';

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimNote.trim()) return;
    claimItem(activeItem.id, claimNote, selectedMethod);
    setShowClaimForm(false);
    setActiveItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveItem(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-stone-100 text-stone-700 transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Photo Slot */}
        <div className="relative aspect-16/9 w-full bg-stone-100 overflow-hidden">
          <img
            src={activeItem.imageUrl}
            alt={activeItem.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-4 bg-stone-900/80 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-md">
            100% FREE COMMUNITY OFFER
          </div>
          <div className="absolute top-4 left-4 bg-stone-900/85 backdrop-blur-xs text-amber-200 border border-stone-600/50 text-xs font-semibold px-3 py-1 rounded-md shadow-xs">
            Condition: {activeItem.condition}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata line */}
          <div className="flex items-center gap-2 text-xs text-stone-500 flex-wrap">
            <span className="font-semibold text-emerald-800">{activeItem.category}</span>
            <span aria-hidden="true">·</span>
            <span>Condition: {activeItem.condition}</span>
            <span aria-hidden="true">·</span>
            <span>Posted {activeItem.createdAt}</span>
            <span aria-hidden="true">·</span>
            <span>{activeItem.claimsCount} claims received</span>
          </div>

          {/* Title & Status */}
          <div>
            <h2 className="text-2xl font-bold text-stone-900 font-display leading-tight">
              {activeItem.title}
            </h2>
            {isHandedOver && (
              <div className="mt-2 text-xs font-semibold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Handed over to a community neighbor</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              About This Item
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
              {activeItem.description}
            </p>
          </div>

          {/* Practical Collection Arrangements Section (Nigerian Nuance) */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/90 space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>Safe Collection Arrangements</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600">
              <div>
                <span className="text-stone-400 block">Recommended Landmark:</span>
                <span className="font-medium text-stone-800">{activeItem.landmark}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Arrangement Mode:</span>
                <span className="font-medium text-stone-800">{activeItem.collectionMethod}</span>
              </div>
            </div>

            {activeItem.handoverNotes && (
              <div className="text-xs text-stone-600 pt-2 border-t border-stone-200/60">
                <strong className="text-stone-700">Giver's note:</strong> {activeItem.handoverNotes}
              </div>
            )}

            <div className="text-[11px] text-stone-500 bg-emerald-50/70 p-2.5 rounded-lg text-emerald-900 flex items-start gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
              <span>
                KeshoShare Rule: Never agree to meet in isolated areas at night. Meet at busy estate gates, public bus terminals or daylight shopping areas.
              </span>
            </div>
          </div>

          {/* Giver Info */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-stone-200">
            <div className="flex items-center gap-3">
              <img
                src={activeItem.giverAvatar}
                alt={activeItem.giverName}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-stone-200"
              />
              <div>
                <div className="text-sm font-semibold text-stone-900">
                  {activeItem.giverName}
                </div>
                <div className="text-xs text-stone-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  <span>{activeItem.neighborhood}, {activeItem.city}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeItem.giverImpactScore} Kesho Points</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Module */}
          <div className="pt-2">
            {isGiver ? (
              <div className="space-y-3">
                <div className="text-xs text-stone-500">
                  You offered this item. Once a recipient collects it, mark it as completed so they can share their gratitude.
                </div>
                {!isHandedOver ? (
                  <button
                    onClick={() => confirmHandover(activeItem.id)}
                    className="w-full py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-all"
                  >
                    Mark Handover as Completed
                  </button>
                ) : (
                  <div className="text-sm font-medium text-emerald-800 text-center py-2">
                    ✓ Handover completed
                  </div>
                )}
              </div>
            ) : !isHandedOver ? (
              !showClaimForm ? (
                <button
                  onClick={() => setShowClaimForm(true)}
                  className="w-full py-3.5 text-base font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Request / Claim This Item</span>
                </button>
              ) : (
                <form onSubmit={handleClaimSubmit} className="space-y-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="text-sm font-semibold text-stone-900">
                    Send Collection Request to {activeItem.giverName}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Why would you like this item? (e.g. for my student, baby on the way, home use)
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={claimNote}
                      onChange={(e) => setClaimNote(e.target.value)}
                      placeholder="Write a brief, polite note to the giver..."
                      className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-emerald-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Preferred Collection Arrangement
                    </label>
                    <select
                      value={selectedMethod}
                      onChange={(e) => setSelectedMethod(e.target.value as CollectionMethod)}
                      className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-emerald-800"
                    >
                      <option value="Public Landmark Meetup">Public Landmark Meetup (e.g. Mall, BRT, fuel station)</option>
                      <option value="Estate Security Gate">Estate Security Gate Handover</option>
                      <option value="Recipient Arranges Dispatch Rider">I will book and pay for a Dispatch Bike (Feex/Gokada)</option>
                      <option value="Direct Neighborhood Pickup">Direct Neighborhood Handover</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-all"
                    >
                      Send Request & Open Chat
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowClaimForm(false)}
                      className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
