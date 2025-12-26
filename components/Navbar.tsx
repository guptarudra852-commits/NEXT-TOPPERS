
import React, { useState } from 'react';
import { User, AppView, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onLogin: (role: UserRole) => void;
  onNavigate: (view: AppView) => void;
  currentView: AppView;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onLogin, onNavigate, currentView }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginAction = (role: UserRole) => {
    onLogin(role);
    setIsLoginModalOpen(false);
  };

  const handleStaticLink = (name: string) => {
    alert(`${name} section coming soon!`);
  };

  return (
    <div className="flex flex-col w-full sticky top-0 z-[100]">
      {/* Login Modal Overlay */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setIsLoginModalOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in duration-300 border border-slate-100">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="bg-[#00A79D] p-4 rounded-[1.5rem] mb-6 shadow-lg shadow-[#00A79D]/20">
                 <span className="text-white font-black text-3xl italic">NT</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back!</h2>
              <p className="text-slate-500 font-medium mt-2">Choose your account type to continue</p>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => handleLoginAction(UserRole.STUDENT)}
                className="w-full group bg-slate-50 hover:bg-[#00A79D] p-6 rounded-[1.5rem] border border-slate-100 hover:border-[#00A79D] transition-all flex items-center gap-6"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">🎓</div>
                <div className="text-left">
                  <h4 className="font-black text-slate-900 group-hover:text-white transition-colors">I'm a Student</h4>
                  <p className="text-xs font-medium text-slate-500 group-hover:text-white/80 transition-colors tracking-tight">Join batches and start learning</p>
                </div>
              </button>

              <button 
                onClick={() => handleLoginAction(UserRole.ADMIN)}
                className="w-full group bg-slate-50 hover:bg-slate-900 p-6 rounded-[1.5rem] border border-slate-100 hover:border-slate-900 transition-all flex items-center gap-6"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">🛡️</div>
                <div className="text-left">
                  <h4 className="font-black text-slate-900 group-hover:text-white transition-colors">I'm an Admin</h4>
                  <p className="text-xs font-medium text-slate-500 group-hover:text-white/80 transition-colors tracking-tight">Manage batches and live classes</p>
                </div>
              </button>
            </div>

            <button 
              onClick={() => setIsLoginModalOpen(false)}
              className="w-full mt-8 py-4 text-sm font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Top Utility Bar */}
      <div className="bg-slate-100 py-1.5 px-6 hidden md:flex justify-end gap-6 text-[11px] font-bold text-slate-500">
        <a href="#" onClick={(e) => { e.preventDefault(); handleStaticLink('Mobile App'); }} className="flex items-center gap-1.5 hover:text-blue-600">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
           Download App
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); handleStaticLink('Support'); }} className="flex items-center gap-1.5 hover:text-blue-600">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
           Help & Support
        </a>
      </div>

      <nav className="h-20 bg-white border-b px-6 md:px-12 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-10">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate(user ? 'DASHBOARD' : 'LANDING')}
          >
            <div className="bg-[#00A79D] p-2 rounded-lg mr-2">
               <span className="text-white font-black text-xl italic">NT</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter leading-none text-slate-800 uppercase">NEXT TOPPERS</span>
              <span className="text-[10px] font-bold text-[#00A79D] uppercase tracking-widest text-center">Toppers ka Adda</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center bg-slate-100 rounded-lg px-4 py-2 w-[350px]">
             <svg className="w-4 h-4 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
             <input type="text" placeholder="What are you looking for..." className="bg-transparent text-sm w-full outline-none placeholder:text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-8">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-6 text-sm font-black text-slate-600">
                <button onClick={() => onNavigate('DASHBOARD')} className={`hover:text-[#00A79D] ${currentView === 'DASHBOARD' ? 'text-[#00A79D]' : ''}`}>MY BATCHES</button>
                <button onClick={() => handleStaticLink('Blogs')} className="hover:text-[#00A79D]">BLOGS</button>
                <button onClick={() => handleStaticLink('Products')} className="hover:text-[#00A79D]">OUR PRODUCTS</button>
              </div>
              <div className="flex items-center gap-4 border-l pl-8">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-slate-800 leading-none">{user.name}</p>
                  <p className="text-[10px] font-bold text-[#00A79D]">{user.role}</p>
                </div>
                <img src={user.avatar} className="w-10 h-10 rounded-full ring-2 ring-slate-100" alt="Avatar" />
                <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <button onClick={() => handleStaticLink('Blogs')} className="hidden lg:block text-slate-600 font-bold text-sm hover:text-[#00A79D]">Blogs</button>
              <button onClick={() => handleStaticLink('Products')} className="hidden lg:block text-slate-600 font-bold text-sm flex items-center gap-1 hover:text-[#00A79D]">Our Products <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"></path></svg></button>
              <button 
                onClick={() => setIsLoginModalOpen(true)} 
                className="bg-[#2D2D2D] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-black transition-all shadow-md active:scale-95"
              >
                Login/Register
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
