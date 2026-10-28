import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setIsGiveModalOpen, setIsRequestModalOpen, setIsSafetyGuideOpen } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-400 text-xs border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-stone-800">
          <div className="space-y-1.5">
            <div className="text-xl font-bold text-white font-display">
              KeshoShare
            </div>
            <p className="text-stone-400 text-xs">
              Give today. Make tomorrow better. Mutual aid and free resource sharing across Nigerian communities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-300">
            <button
              onClick={() => setActiveTab('browse')}
              className="hover:text-white transition-colors"
            >
              Available Items
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className="hover:text-white transition-colors"
            >
              Community Wishes
            </button>
            <button
              onClick={() => setActiveTab('gratitude')}
              className="hover:text-white transition-colors"
            >
              Gratitude Wall
            </button>
            <button
              onClick={() => setIsSafetyGuideOpen(true)}
              className="hover:text-white transition-colors"
            >
              Safety & Collection Protocols
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} KeshoShare. Inspired by the Buy Nothing Project and Freecycle philosophies, designed for Nigerian communities.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built with care for a more generous tomorrow</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
