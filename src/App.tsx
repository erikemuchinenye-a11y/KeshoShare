import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ItemGrid } from './components/ItemGrid';
import { RequestsView } from './components/RequestsView';
import { GratitudeWall } from './components/GratitudeWall';
import { ImpactSection } from './components/ImpactSection';
import { Footer } from './components/Footer';
import { ItemDetailModal } from './components/ItemDetailModal';
import { GiveModal } from './components/GiveModal';
import { RequestModal } from './components/RequestModal';
import { GratitudeModal } from './components/GratitudeModal';
import { ChatModal } from './components/ChatModal';
import { SafetyGuideModal } from './components/SafetyGuideModal';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-emerald-800 selection:text-white">
      {/* Top Bar Contract Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'browse' && (
          <>
            <Hero />
            <ItemGrid />
            <ImpactSection />
          </>
        )}

        {activeTab === 'requests' && <RequestsView />}

        {activeTab === 'gratitude' && <GratitudeWall />}

        {activeTab === 'impact' && <ImpactSection />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Active Modals & Overlays */}
      <ItemDetailModal />
      <GiveModal />
      <RequestModal />
      <GratitudeModal />
      <ChatModal />
      <SafetyGuideModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
