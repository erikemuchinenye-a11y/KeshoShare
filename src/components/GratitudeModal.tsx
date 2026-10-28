import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, Sparkles, Loader2, MessageSquareQuote } from 'lucide-react';

const PRESET_GRATITUDE_PHOTOS = [
  { label: 'Happy Family & Backpack', url: '/src/assets/images/gratitude_family_celebration_1793214494167.jpg' },
  { label: 'Community Handover', url: '/src/assets/images/hero_keshoshare_community_1793214493087.jpg' },
  { label: 'Books & Desk', url: '/src/assets/images/item_textbooks_study_1793214493827.jpg' }
];

export const GratitudeModal: React.FC = () => {
  const { 
    isGratitudeModalOpen, 
    setIsGratitudeModalOpen, 
    addGratitudeStory, 
    presetGratitudeTarget,
    setPresetGratitudeTarget,
    currentUser,
    items
  } = useApp();

  const [itemTitle, setItemTitle] = useState('');
  const [giverName, setGiverName] = useState('');
  const [personalImpact, setPersonalImpact] = useState('');
  const [gratitudeMessage, setGratitudeMessage] = useState('');
  const [location, setLocation] = useState(`${currentUser.neighborhood}, ${currentUser.state}`);
  const [imageUrl, setImageUrl] = useState(PRESET_GRATITUDE_PHOTOS[0].url);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    if (presetGratitudeTarget) {
      setItemTitle(presetGratitudeTarget.itemTitle);
      setGiverName(presetGratitudeTarget.giverName);
    } else if (items.length > 0 && !itemTitle) {
      setItemTitle(items[0].title);
      setGiverName(items[0].giverName);
    }
  }, [presetGratitudeTarget, items]);

  if (!isGratitudeModalOpen) return null;

  const handleAiDraft = async () => {
    if (!itemTitle.trim() || !giverName.trim()) {
      alert('Please ensure item name and giver name are filled in.');
      return;
    }
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai/compose-gratitude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemTitle,
          giverName,
          personalImpact: personalImpact || 'The gift made our day so much brighter and saved our family expenses.'
        })
      });
      const data = await res.json();
      if (data.gratitudeMessage) {
        setGratitudeMessage(data.gratitudeMessage);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle.trim() || !gratitudeMessage.trim()) return;

    addGratitudeStory({
      itemId: presetGratitudeTarget?.itemId || `item_thanks_${Date.now()}`,
      itemTitle,
      giverId: presetGratitudeTarget?.giverId || 'giver_neighbor',
      giverName,
      location,
      message: gratitudeMessage,
      imageUrl,
    });

    setPresetGratitudeTarget(null);
    setIsGratitudeModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">
              GRATITUDE WALL
            </div>
            <h2 className="text-2xl font-bold text-stone-900 font-display">
              Say Thank You to a Giver
            </h2>
          </div>
          <button
            onClick={() => {
              setPresetGratitudeTarget(null);
              setIsGratitudeModalOpen(false);
            }}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Item Received *
              </label>
              <input
                type="text"
                required
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                placeholder="e.g. Baby Cot, JAMB Textbooks"
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Giver's Name *
              </label>
              <input
                type="text"
                required
                value={giverName}
                onChange={(e) => setGiverName(e.target.value)}
                placeholder="e.g. Sister Amina, Brother Emeka"
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Your Neighborhood / City
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Surulere, Lagos"
              className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Briefly describe how this helped:
            </label>
            <input
              type="text"
              value={personalImpact}
              onChange={(e) => setPersonalImpact(e.target.value)}
              placeholder="e.g. My daughter started her lessons with excitement, saved us ₦25,000"
              className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-700">
                Your Gratitude Note *
              </label>
              <button
                type="button"
                onClick={handleAiDraft}
                disabled={isAiLoading}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 transition-colors"
              >
                {isAiLoading ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Writing heartfelt note...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    <span>AI Polish Thank-You</span>
                  </>
                )}
              </button>
            </div>
            <textarea
              required
              rows={3}
              value={gratitudeMessage}
              onChange={(e) => setGratitudeMessage(e.target.value)}
              placeholder="Write your genuine appreciation to the giver and how their generosity touched your life..."
              className="w-full p-3 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
            />
          </div>

          {/* Photo attach */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Add a Gratitude Photo
            </label>
            <div className="flex items-center gap-2">
              {PRESET_GRATITUDE_PHOTOS.map((p, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setImageUrl(p.url)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    imageUrl === p.url ? 'border-emerald-800 ring-2 ring-emerald-800/20' : 'border-stone-200 opacity-60'
                  }`}
                >
                  <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setPresetGratitudeTarget(null);
                setIsGratitudeModalOpen(false);
              }}
              className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-all"
            >
              Post to Gratitude Wall
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
