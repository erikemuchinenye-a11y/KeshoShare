import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, Upload, MapPin, ShieldCheck, Loader2 } from 'lucide-react';
import { ItemCondition, CollectionMethod } from '../types';
import { NIGERIAN_STATES, CATEGORIES } from '../data/mockData';

const PRESET_PHOTOS = [
  { label: 'Baby Cot & Stroller', url: '/src/assets/images/item_baby_cot_stroller_1793214493072.jpg' },
  { label: 'Textbooks & Study Books', url: '/src/assets/images/item_textbooks_study_1793214493827.jpg' },
  { label: 'Standing Fan & Blender', url: '/src/assets/images/item_standing_fan_blender_1793214494788.jpg' },
  { label: 'Home & Community Pack', url: '/src/assets/images/hero_keshoshare_community_1793214493087.jpg' },
  { label: 'Gratitude & Supplies', url: '/src/assets/images/gratitude_family_celebration_1793214494167.jpg' }
];

export const GiveModal: React.FC = () => {
  const { isGiveModalOpen, setIsGiveModalOpen, addItem, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Home & Kitchen');
  const [condition, setCondition] = useState<ItemCondition>('Gently Used');
  const [state, setState] = useState('Lagos');
  const [city, setCity] = useState('Lagos');
  const [neighborhood, setNeighborhood] = useState('Yaba');
  const [landmark, setLandmark] = useState('Sabo Bus Stop / UNILAG First Gate');
  const [collectionMethod, setCollectionMethod] = useState<CollectionMethod>('Public Landmark Meetup');
  const [imageUrl, setImageUrl] = useState(PRESET_PHOTOS[0].url);
  const [dispatchFriendly, setDispatchFriendly] = useState(true);
  const [handoverNotes, setHandoverNotes] = useState('');

  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiTip, setAiTip] = useState<string | null>(null);

  if (!isGiveModalOpen) return null;

  const handleAiEnhance = async () => {
    if (!title.trim()) {
      alert('Please enter an item title first (e.g. "Standing Fan" or "Secondary Textbooks")');
      return;
    }

    setIsAiLoading(true);
    setAiTip(null);
    try {
      const res = await fetch('/api/ai/enhance-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          condition,
          location: `${neighborhood}, ${state}`,
          notes: handoverNotes
        })
      });
      const data = await res.json();
      if (data.description) {
        setDescription(data.description);
      }
      if (data.suggestedLandmarks && data.suggestedLandmarks.length > 0) {
        setLandmark(data.suggestedLandmarks[0]);
      }
      if (data.safetyTip) {
        setAiTip(data.safetyTip);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addItem({
      title,
      description,
      category,
      condition,
      state,
      city,
      neighborhood,
      landmark,
      collectionMethod,
      imageUrl,
      dispatchFriendly,
      handoverNotes,
    });

    setIsGiveModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <div className="text-xs font-semibold text-emerald-800 tracking-wider">
              GIVE TODAY. MAKE TOMORROW BETTER.
            </div>
            <h2 className="text-2xl font-bold text-stone-900 font-display">
              Offer Something for Free
            </h2>
          </div>
          <button
            onClick={() => setIsGiveModalOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Item Title with AI Helper */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-700">
                Item Title *
              </label>
              <button
                type="button"
                onClick={handleAiEnhance}
                disabled={isAiLoading}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 transition-colors"
              >
                {isAiLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Enhancing with AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Auto-Enhance with Kesho AI</span>
                  </>
                )}
              </button>
            </div>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Ox 18-inch Rechargeable Standing Fan, Wooden Baby Cot, JAMB Textbooks"
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
            />
          </div>

          {/* Photo Selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Select or Upload Photo
            </label>
            <div className="grid grid-cols-5 gap-2">
              {PRESET_PHOTOS.map((photo, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setImageUrl(photo.url)}
                  className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all ${
                    imageUrl === photo.url ? 'border-emerald-800 ring-2 ring-emerald-800/20' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">
              Selected: High resolution authentic community photo
            </div>
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
              >
                {CATEGORIES.filter(c => c !== 'All Categories').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Condition *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ItemCondition)}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
              >
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Gently Used">Gently Used</option>
                <option value="Needs Quick Fix">Needs Quick Fix (e.g. wire plug or screw)</option>
              </select>
            </div>
          </div>

          {/* Location Details (Nigerian State, Neighborhood, Landmark) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                State *
              </label>
              <select
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setCity(e.target.value);
                }}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
              >
                {NIGERIAN_STATES.filter(s => s !== 'All Nigeria').map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Neighborhood / LGA *
              </label>
              <input
                type="text"
                required
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="e.g. Yaba, Ikeja, Garki, Bodija"
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Collection Mode *
              </label>
              <select
                value={collectionMethod}
                onChange={(e) => setCollectionMethod(e.target.value as CollectionMethod)}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
              >
                <option value="Public Landmark Meetup">Public Landmark Meetup</option>
                <option value="Estate Security Gate">Estate Security Gate</option>
                <option value="Recipient Arranges Dispatch Rider">Dispatch Bike Delivery</option>
                <option value="Direct Neighborhood Pickup">Direct Neighborhood Handover</option>
              </select>
            </div>
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Public Landmark / Meeting Spot *
            </label>
            <input
              type="text"
              required
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="e.g. Sabo Yaba Bus Stop, TotalEnergies fuel station front, ICM entrance"
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Description & Practical Notes *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what is included, functionality, and why you are offering it to a neighbor..."
              className="w-full p-3 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
            />
          </div>

          {/* Dispatch Rider Friendly Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="dispatchFriendly"
              checked={dispatchFriendly}
              onChange={(e) => setDispatchFriendly(e.target.checked)}
              className="rounded border-stone-300 text-emerald-800 focus:ring-emerald-800 w-4 h-4 cursor-pointer"
            />
            <label htmlFor="dispatchFriendly" className="text-xs text-stone-700 cursor-pointer">
              Recipient may arrange a verified dispatch rider (Gokada, Chowdeck, Feex, etc.) at their expense
            </label>
          </div>

          {aiTip && (
            <div className="p-3 bg-emerald-50 text-emerald-950 text-xs rounded-lg border border-emerald-200 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
              <span><strong>AI Safety Note:</strong> {aiTip}</span>
            </div>
          )}

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsGiveModalOpen(false)}
              className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-all"
            >
              Post Free Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
