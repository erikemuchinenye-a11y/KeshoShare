import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, HandHeart } from 'lucide-react';
import { NIGERIAN_STATES, CATEGORIES } from '../data/mockData';

export const RequestModal: React.FC = () => {
  const { isRequestModalOpen, setIsRequestModalOpen, addRequest } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Study & Books');
  const [urgency, setUrgency] = useState<'Normal' | 'Urgent' | 'Flexible'>('Normal');
  const [state, setState] = useState('Lagos');
  const [neighborhood, setNeighborhood] = useState('Yaba');

  if (!isRequestModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addRequest({
      title,
      description,
      category,
      urgency,
      state,
      city: state,
      neighborhood,
    });

    setIsRequestModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">
              KESHOSHARE WISHES
            </div>
            <h2 className="text-2xl font-bold text-stone-900 font-display">
              Post a Community Wish
            </h2>
          </div>
          <button
            onClick={() => setIsRequestModalOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              What do you or your family need? *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. WAEC Past Question Papers, Baby cot mattress, Rechargeable reading lamp"
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
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
                Urgency Level *
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
              >
                <option value="Normal">Normal Need</option>
                <option value="Urgent">Urgent (Upcoming school resumption/newborn)</option>
                <option value="Flexible">Flexible Wish (Anytime available)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                State *
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
              >
                {NIGERIAN_STATES.filter(s => s !== 'All Nigeria').map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Neighborhood *
              </label>
              <input
                type="text"
                required
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="e.g. Yaba, Surulere, Garki"
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Share details on how this will help *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain who this is for and how you can arrange collection (e.g. willing to meet at nearby landmark or book dispatch)..."
              className="w-full p-3 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsRequestModalOpen(false)}
              className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-all"
            >
              Post Wish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
