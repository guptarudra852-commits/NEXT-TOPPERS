
import React from 'react';
import { User, Batch, UserRole } from '../types';
import AITutorChat from './AITutorChat';

interface DashboardProps {
  user: User;
  batches: Batch[];
  onJoinLive: (batch: Batch) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, batches, onJoinLive }) => {
  return (
    <div className="relative flex-1 overflow-y-auto">
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user.name}! 👋</h1>
            <p className="text-slate-500 mt-1">You have 2 classes scheduled for today.</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-100">
              Attendance: 94%
            </div>
            <div className="bg-white border text-slate-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
              Streak: 12 Days 🔥
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Active Batches', value: batches.length, icon: '📚', color: 'bg-blue-500' },
            { label: 'Completed Lessons', value: '42', icon: '✅', color: 'bg-green-500' },
            { label: 'Pending Tests', value: '03', icon: '📝', color: 'bg-amber-500' },
            { label: 'AI Help Credits', value: '120', icon: '✨', color: 'bg-purple-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-xl text-white shadow-lg shadow-${stat.color.split('-')[1]}-100`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-black text-slate-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">My Batches</h2>
          <button className="text-blue-600 font-bold hover:underline">View All</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {batches.map((batch) => (
            <div key={batch.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img src={batch.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={batch.name} />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                    {batch.subject}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium opacity-80">{batch.teacher}</p>
                  <h3 className="text-lg font-bold">{batch.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <span className="text-xs font-semibold">{batch.studentsCount} Students</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-xs font-bold">{batch.nextClass}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => onJoinLive(batch)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  Join Live Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Tutor Chat Feature for Students */}
      {user.role === UserRole.STUDENT && (
        <AITutorChat user={user} batches={batches} />
      )}
    </div>
  );
};

export default Dashboard;
