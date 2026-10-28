import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HandHeart, Plus, MapPin, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { NIGERIAN_STATES } from '../data/mockData';

export const RequestsView: React.FC = () => {
  const { requests, setIsRequestModalOpen, currentUser } = useApp();
  const [filterUrgency, setFilterUrgency] = useState<string>('All');
  const [filterState, setFilterState] = useState<string>('All Nigeria');

  const filteredRequests = requests.filter(req => {
    if (filterUrgency !== 'All' && req.urgency !== filterUrgency) return false;
    if (filterState !== 'All Nigeria' && req.state !== filterState) return false;
    return true;
  });

  return (
    <section className="py-8 bg-stone-50 min-h-[500px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="bg-white rounded-xl border border-stone-200/90 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-800 tracking-wider">
              MUTUAL AID COMMUNITY WISHES
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1 font-display">
              Ask for What You Need
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Don't see what you need on the board? Post a community wish. Neighbors checking their store rooms and cupboards will reach out to help.
            </p>
          </div>

          <button
            onClick={() => setIsRequestModalOpen(true)}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-all flex items-center gap-2 shrink-0 self-start md:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Post a Community Wish</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterUrgency('All')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filterUrgency === 'All'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              All Wishes ({requests.length})
            </button>
            <button
              onClick={() => setFilterUrgency('Urgent')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filterUrgency === 'Urgent'
                  ? 'bg-amber-800 text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              Urgent Needs
            </button>
            <button
              onClick={() => setFilterUrgency('Normal')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filterUrgency === 'Normal'
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              General
            </button>
          </div>

          {/* State selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500">State:</span>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="bg-white border border-stone-200 rounded-lg px-2.5 py-1 text-stone-800 font-medium focus:outline-emerald-800"
            >
              {NIGERIAN_STATES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Requests List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map(req => (
            <div
              key={req.id}
              className="bg-white rounded-xl border border-stone-200 p-5 flex flex-col justify-between hover:border-emerald-700/60 transition-all shadow-2xs"
            >
              <div>
                {/* Meta line */}
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-emerald-800">{req.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{req.createdAt}</span>
                  </div>
                  {req.urgency === 'Urgent' && (
                    <span className="text-amber-800 font-bold text-[11px] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Urgent Need
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-stone-900 leading-snug">
                  {req.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                  {req.description}
                </p>
              </div>

              {/* Footer info */}
              <div className="pt-4 mt-4 border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{req.neighborhood}, {req.city}</span>
                  </div>
                  <div className="text-stone-400">
                    {req.responsesCount} offers received
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <img
                      src={req.requesterAvatar}
                      alt={req.requesterName}
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 rounded-full object-cover border border-stone-200"
                    />
                    <span className="text-xs font-medium text-stone-800">
                      {req.requesterName}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      alert(`Thank you! A message channel has been initiated with ${req.requesterName}. You can coordinate handing over this item.`);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors flex items-center gap-1"
                  >
                    <HandHeart className="w-3.5 h-3.5 text-emerald-800" />
                    <span>I Have This</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
