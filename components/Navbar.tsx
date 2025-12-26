
import React from 'react';
import { User, AppView } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (view: AppView) => void;
  currentView: AppView;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate, currentView }) => {
  return (
    <nav className="h-16 border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => onNavigate(user ? 'DASHBOARD' : 'LANDING')}
      >
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">N</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-800">NextToppers<span className="text-blue-600">Pro</span></span>
      </div>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            <div className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-600">
              <button 
                onClick={() => onNavigate('DASHBOARD')} 
                className={`hover:text-blue-600 ${currentView === 'DASHBOARD' ? 'text-blue-600' : ''}`}
              >
                My Batches
              </button>
              <button className="hover:text-blue-600">Schedule</button>
              <button className="hover:text-blue-600">Store</button>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 leading-none">{user.name}</p>
                <p className="text-xs text-slate-500">{user.role}</p>
              </div>
              <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-blue-100 shadow-sm" alt="Avatar" />
              <button 
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <button className="text-slate-600 font-medium px-4 py-2 hover:text-blue-600 transition-colors">Login</button>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">Sign Up</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
