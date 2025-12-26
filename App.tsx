
import React, { useState, useEffect } from 'react';
import { User, UserRole, AppView, Batch } from './types';
import { MOCK_USER_STUDENT, MOCK_USER_ADMIN, BATCHES } from './constants';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import LiveClassRoom from './components/LiveClassRoom';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('LANDING');
  const [user, setUser] = useState<User | null>(null);
  const [activeBatch, setActiveBatch] = useState<Batch | null>(null);

  const handleLogin = (role: UserRole) => {
    const mockUser = role === UserRole.ADMIN ? MOCK_USER_ADMIN : MOCK_USER_STUDENT;
    setUser(mockUser);
    setView('DASHBOARD');
  };

  const handleLogout = () => {
    setUser(null);
    setView('LANDING');
    setActiveBatch(null);
  };

  const joinLive = (batch: Batch) => {
    setActiveBatch(batch);
    if (user?.role === UserRole.ADMIN) {
      setView('ADMIN_PANEL');
    } else {
      setView('LIVE_CLASS');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onNavigate={setView} 
        currentView={view} 
      />
      
      <main className="flex-1 overflow-hidden flex flex-col">
        {view === 'LANDING' && <LandingPage onLogin={handleLogin} />}
        {view === 'DASHBOARD' && user && (
          <Dashboard 
            user={user} 
            batches={BATCHES} 
            onJoinLive={joinLive} 
          />
        )}
        {view === 'LIVE_CLASS' && activeBatch && user && (
          <LiveClassRoom 
            user={user} 
            batch={activeBatch} 
            onLeave={() => setView('DASHBOARD')}
          />
        )}
        {view === 'ADMIN_PANEL' && activeBatch && user && (
          <AdminPanel 
            user={user} 
            batch={activeBatch} 
            onLeave={() => setView('DASHBOARD')}
          />
        )}
      </main>

      {/* Footer */}
      {view === 'LANDING' && (
        <footer className="bg-slate-900 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">NextToppers Pro</h2>
              <p className="text-slate-400 max-w-sm">Empowering students with world-class live education and cutting-edge AI features. Join the elite community of toppers today.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-blue-400">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-blue-400">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-400">Live Support</a></li>
              </ul>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
