import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Shield, UserCircle, MessageSquare } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setIsGiveModalOpen, 
    setIsSafetyGuideOpen,
    activeConversation,
    currentUser,
    demoUsers,
    switchUser,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element brand wordmark */}
        <button 
          onClick={() => setActiveTab('browse')}
          className="text-2xl font-bold tracking-tight text-emerald-950 font-display whitespace-nowrap shrink-0 text-left hover:opacity-90 transition-opacity"
        >
          KeshoShare
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('browse')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'browse'
                ? 'text-emerald-900 border-b-2 border-emerald-800 font-semibold'
                : 'hover:text-stone-900'
            }`}
          >
            Available Items
          </button>
          
          <button
            onClick={() => setActiveTab('requests')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'requests'
                ? 'text-emerald-900 border-b-2 border-emerald-800 font-semibold'
                : 'hover:text-stone-900'
            }`}
          >
            Community Wishes
          </button>

          <button
            onClick={() => setActiveTab('gratitude')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'gratitude'
                ? 'text-emerald-900 border-b-2 border-emerald-800 font-semibold'
                : 'hover:text-stone-900'
            }`}
          >
            Gratitude Wall
          </button>

          <button
            onClick={() => setActiveTab('impact')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'impact'
                ? 'text-emerald-900 border-b-2 border-emerald-800 font-semibold'
                : 'hover:text-stone-900'
            }`}
          >
            Our Impact
          </button>

          <button
            onClick={() => setIsSafetyGuideOpen(true)}
            className="text-stone-600 hover:text-stone-900 whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors py-1"
          >
            <Shield className="w-4 h-4 text-emerald-800" />
            <span>Safe Collection</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action button + active chats / user persona selector */}
        <div className="flex items-center gap-3 shrink-0">
          {activeConversation && (
            <button
              onClick={() => {}}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-900 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors whitespace-nowrap shrink-0"
              title="Active collection coordinate chat"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-800" />
              <span>1 Active Pickup</span>
            </button>
          )}

          {/* Persona quick switch dropdown for testing */}
          <div className="hidden sm:flex items-center text-xs text-stone-600 border border-stone-200 rounded-lg px-2 py-1 bg-white">
            <span className="text-stone-400 mr-1.5">Posting as:</span>
            <select
              value={currentUser.id}
              onChange={(e) => switchUser(e.target.value)}
              className="bg-transparent font-medium text-stone-800 focus:outline-none cursor-pointer"
            >
              {demoUsers.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.neighborhood})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsGiveModalOpen(true)}
            className="px-4 py-2 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-emerald-800"
          >
            Give Something
          </button>
        </div>
      </div>
    </header>
  );
};
