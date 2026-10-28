import React from 'react';
import { Item } from '../types';
import { useApp } from '../context/AppContext';
import { MapPin, ShieldCheck, Bike, ArrowUpRight } from 'lucide-react';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { setActiveItem } = useApp();

  const conditionConfig: Record<string, { label: string; className: string }> = {
    'Brand New': {
      label: 'Brand New',
      className: 'bg-emerald-900/90 text-emerald-100 border border-emerald-500/40',
    },
    'Like New': {
      label: 'Like New',
      className: 'bg-teal-900/90 text-teal-100 border border-teal-500/40',
    },
    'Gently Used': {
      label: 'Gently Used',
      className: 'bg-stone-900/90 text-amber-100 border border-stone-600/50',
    },
    'Needs Quick Fix': {
      label: 'Needs Quick Fix',
      className: 'bg-amber-950/90 text-amber-200 border border-amber-600/50',
    },
  };

  const badge = conditionConfig[item.condition] || {
    label: item.condition,
    className: 'bg-stone-900/90 text-stone-200 border border-stone-700/40',
  };

  return (
    <div 
      onClick={() => setActiveItem(item)}
      className="group bg-white rounded-xl border border-stone-200/90 hover:border-emerald-700/60 transition-all duration-200 flex flex-col overflow-hidden cursor-pointer hover:shadow-sm"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
          onError={(e) => {
            // CSS Fallback container if needed
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />

        {/* Free Tag Banner (clean subtle corner text) */}
        <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md tracking-wider shadow-xs">
          FREE
        </div>

        {/* Condition Status Badge for quick visual reference */}
        <div className={`absolute top-3 right-3 backdrop-blur-xs text-[11px] font-semibold px-2.5 py-0.5 rounded-md shadow-xs ${badge.className}`}>
          {badge.label}
        </div>

        {item.status === 'handed_over' && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <span className="text-white text-sm font-bold uppercase tracking-wider bg-stone-950/80 px-3 py-1.5 rounded">
              Handed Over to Neighbor
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Clean unboxed metadata with typographic separators */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5 flex-wrap">
            <span className="font-medium text-emerald-800">{item.category}</span>
            <span aria-hidden="true">·</span>
            <span>{item.condition}</span>
            <span aria-hidden="true">·</span>
            <span>{item.createdAt}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-stone-900 line-clamp-2 group-hover:text-emerald-900 transition-colors">
            {item.title}
          </h3>

          {/* Description Snippet */}
          <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Location & Collection Mode */}
        <div className="pt-2 border-t border-stone-100 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-600">
            <div className="flex items-center gap-1 truncate max-w-[190px]">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="truncate">{item.neighborhood}, {item.state}</span>
            </div>
            
            {item.dispatchFriendly && (
              <span className="text-emerald-800 flex items-center gap-1 text-[11px] shrink-0 font-medium">
                <Bike className="w-3 h-3" />
                <span>Rider OK</span>
              </span>
            )}
          </div>

          {/* Giver info and interactive CTA */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <img
                src={item.giverAvatar}
                alt={item.giverName}
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full object-cover border border-stone-200"
              />
              <span className="text-xs text-stone-700 font-medium truncate max-w-[120px]">
                {item.giverName}
              </span>
            </div>

            <span className="text-xs font-semibold text-emerald-800 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              <span>View & Claim</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
