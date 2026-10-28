import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ItemCard } from './ItemCard';
import { NIGERIAN_STATES, CATEGORIES, LAGOS_NEIGHBORHOODS } from '../data/mockData';
import { Search, MapPin, SlidersHorizontal, Gift, Plus } from 'lucide-react';

export const ItemGrid: React.FC = () => {
  const { 
    items, 
    selectedState, 
    setSelectedState, 
    selectedCategory, 
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setIsGiveModalOpen
  } = useApp();

  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All Neighborhoods');
  const [selectedCondition, setSelectedCondition] = useState('All');

  // Filter items
  const filteredItems = items.filter(item => {
    // State filter
    if (selectedState !== 'All Nigeria' && item.state !== selectedState) {
      return false;
    }
    // Neighborhood filter
    if (selectedNeighborhood !== 'All Neighborhoods' && item.neighborhood !== selectedNeighborhood) {
      return false;
    }
    // Category filter
    if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
      return false;
    }
    // Condition filter
    if (selectedCondition !== 'All' && item.condition !== selectedCondition) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchLoc = item.neighborhood.toLowerCase().includes(q) || item.landmark.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchLoc || matchCat;
    }
    return true;
  });

  return (
    <section className="py-8 bg-stone-50 min-h-[500px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Search & Location Bar */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/90 shadow-2xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items (e.g. cot, textbooks, blender, generator)..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800 focus:border-emerald-800 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* State Selector */}
            <div className="md:col-span-3 relative">
              <MapPin className="w-4 h-4 text-emerald-800 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedNeighborhood('All Neighborhoods');
                }}
                className="w-full pl-9 pr-8 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:bg-white focus:outline-emerald-800 focus:border-emerald-800 transition-colors cursor-pointer appearance-none"
              >
                {NIGERIAN_STATES.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">
                ▼
              </div>
            </div>

            {/* Condition Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:bg-white focus:outline-emerald-800 focus:border-emerald-800 transition-colors cursor-pointer"
              >
                <option value="All">All Conditions</option>
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Gently Used">Gently Used</option>
                <option value="Needs Quick Fix">Needs Quick Fix</option>
              </select>
            </div>
          </div>

          {/* Lagos Specific Neighborhood pills if Lagos is active */}
          {selectedState === 'Lagos' && (
            <div className="pt-2 border-t border-stone-100 flex items-center gap-2 overflow-x-auto text-xs pb-1">
              <span className="text-stone-400 whitespace-nowrap shrink-0">Neighborhood:</span>
              <button
                onClick={() => setSelectedNeighborhood('All Neighborhoods')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap shrink-0 font-medium ${
                  selectedNeighborhood === 'All Neighborhoods'
                    ? 'bg-emerald-900 text-white'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                All Lagos
              </button>
              {LAGOS_NEIGHBORHOODS.map(nh => (
                <button
                  key={nh}
                  onClick={() => setSelectedNeighborhood(nh)}
                  className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap shrink-0 font-medium ${
                    selectedNeighborhood === nh
                      ? 'bg-emerald-900 text-white'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {nh}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category Filter Tabs (interactive segmented control buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-800 tabular-nums">
              {filteredItems.length}
            </span>
            <span>items offered freely in your area</span>
          </div>

          {(selectedState !== 'All Nigeria' || selectedCategory !== 'All Categories' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedState('All Nigeria');
                setSelectedCategory('All Categories');
                setSearchQuery('');
                setSelectedNeighborhood('All Neighborhoods');
              }}
              className="text-emerald-800 hover:underline font-medium"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Grid or Empty State */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-800">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-display">
              No items matching your criteria yet
            </h3>
            <p className="text-sm text-stone-600">
              Be the first generous neighbor to post in this category, or widen your location filter!
            </p>
            <button
              onClick={() => setIsGiveModalOpen(true)}
              className="px-4 py-2 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Give Something Here</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
