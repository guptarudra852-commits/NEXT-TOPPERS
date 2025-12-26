
import React, { useState } from 'react';
import { User, UserRole, AppView, Batch, SiteConfig, StudyMaterial } from './types';
import { MOCK_USER_STUDENT, MOCK_USER_ADMIN, BATCHES as INITIAL_BATCHES } from './constants';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import LiveClassRoom from './components/LiveClassRoom';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('LANDING');
  const [user, setUser] = useState<User | null>(null);
  const [batches, setBatches] = useState<Batch[]>(INITIAL_BATCHES);
  const [activeBatch, setActiveBatch] = useState<Batch | null>(null);
  const [globalAnnouncement, setGlobalAnnouncement] = useState<string | null>(null);
  
  // Dynamic Site Configuration (Banners)
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    heroBanner: 'https://nexttoppers.com/uploads/banners/1723812833.webp',
    trendingBanners: [
      "https://nexttoppers.com/uploads/banners/1723812833.webp",
      "https://nexttoppers.com/uploads/banners/1723812850.webp",
      "https://nexttoppers.com/uploads/banners/1723812875.webp",
      "https://nexttoppers.com/uploads/banners/1723812885.webp"
    ]
  });

  const handleLogin = (role: UserRole) => {
    const mockUser = role === UserRole.ADMIN ? MOCK_USER_ADMIN : MOCK_USER_STUDENT;
    setUser(mockUser);
    setView('DASHBOARD');
  };

  const handleLogout = () => {
    setUser(null);
    setView('LANDING');
    setActiveBatch(null);
    setGlobalAnnouncement(null);
  };

  const joinLive = (batch: Batch) => {
    setActiveBatch(batch);
    if (user?.role === UserRole.ADMIN) {
      setView('ADMIN_PANEL');
    } else {
      setView('LIVE_CLASS');
    }
  };

  const handleAddBatch = (newBatch: Batch) => {
    setBatches(prev => [{ ...newBatch, materials: [] }, ...prev]);
  };

  const handleUpdateBatch = (updatedBatch: Batch) => {
    setBatches(prev => prev.map(b => b.id === updatedBatch.id ? updatedBatch : b));
  };

  const handleAddMaterialToBatch = (batchId: string, material: StudyMaterial) => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          materials: [...(b.materials || []), material]
        };
      }
      return b;
    }));
  };

  const handleDeleteMaterial = (batchId: string, materialId: string) => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          materials: (b.materials || []).filter(m => m.id !== materialId)
        };
      }
      return b;
    }));
  };

  const handleUpdateSiteConfig = (newConfig: SiteConfig) => {
    setSiteConfig(newConfig);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onLogin={handleLogin}
        onNavigate={setView} 
        currentView={view} 
      />
      
      <main className="flex-1 overflow-hidden flex flex-col">
        {view === 'LANDING' && (
          <LandingPage 
            siteConfig={siteConfig} 
            onLogin={handleLogin} 
          />
        )}
        {view === 'DASHBOARD' && user && (
          <Dashboard 
            user={user} 
            batches={batches} 
            onJoinLive={joinLive} 
          />
        )}
        {view === 'LIVE_CLASS' && activeBatch && user && (
          <LiveClassRoom 
            user={user} 
            batch={activeBatch} 
            announcement={globalAnnouncement}
            onLeave={() => setView('DASHBOARD')}
          />
        )}
        {view === 'ADMIN_PANEL' && activeBatch && user && (
          <AdminPanel 
            user={user} 
            batch={activeBatch} 
            allBatches={batches}
            siteConfig={siteConfig}
            onUpdateSiteConfig={handleUpdateSiteConfig}
            currentBroadcast={globalAnnouncement}
            onBroadcast={setGlobalAnnouncement}
            onAddBatch={handleAddBatch}
            onUpdateBatch={handleUpdateBatch}
            onAddMaterial={handleAddMaterialToBatch}
            onDeleteMaterial={handleDeleteMaterial}
            onLeave={() => setView('DASHBOARD')}
          />
        )}
      </main>
    </div>
  );
};

export default App;
