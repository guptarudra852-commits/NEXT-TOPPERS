
import React, { useState } from 'react';
import { User, Batch, UserRole, MaterialCategory, StudyMaterial } from '../types';
import AITutorChat from './AITutorChat';

interface DashboardProps {
  user: User;
  batches: Batch[];
  onJoinLive: (batch: Batch) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, batches, onJoinLive }) => {
  const [activeTab, setActiveTab] = useState<'MY_BATCHES' | 'STUDY_MATERIAL'>('MY_BATCHES');
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory | null>(null);

  // Helper to get aggregated materials for all batches the student is in
  const allMaterials = batches.flatMap(b => b.materials || []);
  
  const getCategoryCounts = () => {
    return {
      NOTES: allMaterials.filter(m => m.category === 'NOTES').length,
      DPP: allMaterials.filter(m => m.category === 'DPP').length,
      TEST: allMaterials.filter(m => m.category === 'TEST').length,
      PYQ: allMaterials.filter(m => m.category === 'PYQ').length,
    };
  };

  const categoryCounts = getCategoryCounts();

  const filteredMaterials = selectedCategory 
    ? allMaterials.filter(m => m.category === selectedCategory)
    : [];

  const getCategoryIcon = (cat: MaterialCategory) => {
    switch(cat) {
      case 'NOTES': return 'https://img.icons8.com/fluency/96/note.png';
      case 'DPP': return 'https://img.icons8.com/fluency/96/test-tube.png';
      case 'TEST': return 'https://img.icons8.com/fluency/96/bar-chart.png';
      case 'PYQ': return 'https://img.icons8.com/fluency/96/archive.png';
      default: return '';
    }
  };

  const getCategoryLabel = (cat: MaterialCategory) => {
    switch(cat) {
      case 'NOTES': return 'Physics Notes';
      case 'DPP': return 'DPP Sheets';
      case 'TEST': return 'Test Series';
      case 'PYQ': return 'PYQ Archive';
      default: return '';
    }
  };

  return (
    <div className="relative flex-1 overflow-y-auto">
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back, {user.name}! 👋</h1>
            <p className="text-slate-500 mt-1 font-medium">You have 2 classes scheduled for today.</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-[#00A79D] text-white px-5 py-2.5 rounded-2xl text-sm font-black shadow-xl shadow-[#00A79D]/20 flex items-center gap-2">
              <span className="text-lg">📈</span> Attendance: 94%
            </div>
            <div className="bg-white border-2 border-slate-100 text-slate-700 px-5 py-2.5 rounded-2xl text-sm font-black shadow-sm flex items-center gap-2">
              <span>🔥</span> Streak: 12 Days
            </div>
          </div>
        </header>

        {/* Dashboard Tabs */}
        <div className="flex gap-8 border-b border-slate-200 mb-10 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('MY_BATCHES')}
            className={`pb-4 px-2 font-black text-sm transition-all relative ${activeTab === 'MY_BATCHES' ? 'text-[#00A79D]' : 'text-slate-400 hover:text-slate-600'}`}
          >
            My Enrolled Batches
            {activeTab === 'MY_BATCHES' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00A79D] rounded-full"></div>}
          </button>
          <button 
            onClick={() => {
              setActiveTab('STUDY_MATERIAL');
              setSelectedCategory(null);
            }}
            className={`pb-4 px-2 font-black text-sm transition-all relative ${activeTab === 'STUDY_MATERIAL' ? 'text-[#00A79D]' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Library & Study Material
            {activeTab === 'STUDY_MATERIAL' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00A79D] rounded-full"></div>}
          </button>
        </div>

        {activeTab === 'MY_BATCHES' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {batches.map((batch) => (
              <div key={batch.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden group flex flex-col border-b-4 border-b-[#00A79D]">
                <div className="relative h-52 overflow-hidden">
                  <img src={batch.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={batch.name} />
                  
                  {batch.tag && (
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md ${
                        batch.tag === 'BESTSELLER' ? 'bg-amber-400 text-amber-950' : 
                        batch.tag === 'NEW' ? 'bg-green-500 text-white' : 
                        'bg-red-500 text-white'
                      }`}>
                        {batch.tag}
                      </span>
                    </div>
                  )}

                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl text-xs font-black text-[#00A79D] shadow-sm">
                      {batch.subject}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm font-bold opacity-70 mb-1">{batch.teacher}</p>
                    <h3 className="text-xl font-black leading-tight truncate">{batch.name}</h3>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Price</p>
                       <p className="text-sm font-black text-slate-800">{batch.price || 'Free'}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Validity</p>
                       <p className="text-sm font-black text-slate-800">{batch.validity || 'Lifetime'}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-slate-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      <span className="text-xs font-black">{batch.studentsCount.toLocaleString()} Peers</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#00A79D] bg-[#00A79D]/10 px-3 py-1.5 rounded-xl">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A79D] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A79D]"></span>
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest">{batch.nextClass}</span>
                    </div>
                  </div>

                  <div className="mb-8 p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#00A79D] rounded-md flex items-center justify-center text-white text-[10px] shadow-sm">
                           🎯
                        </div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Course Roadmap</span>
                      </div>
                      <div className="bg-white px-2 py-1 rounded-lg border shadow-xs">
                        <span className="text-xs font-black text-[#00A79D]">{batch.progress}% Complete</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 h-3 w-full bg-slate-200/50 rounded-full overflow-hidden p-[2px]">
                       {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((step) => (
                         <div 
                           key={step} 
                           className={`h-full flex-1 rounded-sm transition-all duration-700 ${
                            batch.progress >= step 
                              ? 'bg-gradient-to-r from-[#00A79D] to-[#008f86] shadow-[0_0_10px_rgba(0,167,157,0.3)]' 
                              : 'bg-slate-200'
                           } ${batch.progress >= step && batch.progress < step + 10 ? 'animate-pulse opacity-80' : ''}`}
                         />
                       ))}
                    </div>
                    
                    <div className="flex justify-between mt-2 px-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Start</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Mastery</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto space-y-3">
                    <button 
                      onClick={() => onJoinLive(batch)}
                      className="w-full py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-[#00A79D] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-[#00A79D]/20 active:scale-95 group"
                    >
                      Enter Classroom
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </button>
                    <button 
                      onClick={() => {
                        setActiveTab('STUDY_MATERIAL');
                        setSelectedCategory(null);
                      }}
                      className="w-full py-3 bg-white text-slate-600 border border-slate-200 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors"
                    >
                      View Syllabus & Notes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-8 md:p-16 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 min-h-[500px] relative">
            {selectedCategory ? (
              <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <button 
                   onClick={() => setSelectedCategory(null)}
                   className="mb-10 flex items-center gap-2 text-slate-400 hover:text-[#00A79D] font-black text-xs uppercase tracking-widest transition-colors"
                 >
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                   Back to Library
                 </button>
                 
                 <div className="flex items-center gap-4 mb-12">
                   <div className="w-16 h-16 bg-[#EBF7F6] rounded-2xl flex items-center justify-center shadow-sm">
                      <img src={getCategoryIcon(selectedCategory)} className="w-10 h-10" alt={selectedCategory} />
                   </div>
                   <div>
                     <h2 className="text-3xl font-black text-slate-900 tracking-tight">{getCategoryLabel(selectedCategory)}</h2>
                     <p className="text-slate-500 font-medium">Browse through your study materials for this category</p>
                   </div>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredMaterials.length > 0 ? (
                      filteredMaterials.map((mat) => (
                        <div key={mat.id} className="bg-slate-50 border border-slate-100 p-6 rounded-[2rem] flex items-center justify-between group hover:bg-white hover:shadow-xl hover:border-[#00A79D]/20 transition-all">
                           <div className="flex items-center gap-5">
                             <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                               📄
                             </div>
                             <div>
                               <h4 className="font-black text-slate-800 leading-tight mb-1">{mat.title}</h4>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Batch: {batches.find(b => b.id === mat.batchId)?.name || 'General'}</p>
                             </div>
                           </div>
                           <button className="w-12 h-12 bg-white text-[#00A79D] rounded-full flex items-center justify-center shadow-sm border hover:bg-[#00A79D] hover:text-white transition-all active:scale-90">
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                           </button>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full py-20 text-center opacity-30 flex flex-col items-center">
                         <img src="https://img.icons8.com/clouds/200/empty-box.png" className="w-32 h-32 mb-4 grayscale" alt="Empty" />
                         <p className="font-black text-slate-500 uppercase tracking-widest">No materials found in this category</p>
                      </div>
                    )}
                 </div>
              </div>
            ) : (
              <>
                <div className="w-24 h-24 bg-[#EBF7F6] rounded-full flex items-center justify-center mb-8 shadow-sm">
                   <img src="https://img.icons8.com/clouds/100/books.png" className="w-16 h-16" alt="Library" />
                </div>
                
                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Your Library</h2>
                <p className="text-slate-500 max-w-2xl mx-auto mb-16 font-medium text-center leading-relaxed">
                  Access all your handwritten notes, Daily Practice Problems (DPPs),<br/>
                  and previous year question papers in one place.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                  {[
                    { 
                      id: 'NOTES' as MaterialCategory,
                      title: 'Physics Notes', 
                      count: `${categoryCounts.NOTES} FILES`, 
                      icon: 'https://img.icons8.com/fluency/96/note.png' 
                    },
                    { 
                      id: 'DPP' as MaterialCategory,
                      title: 'DPP Sheets', 
                      count: `${categoryCounts.DPP} SHEETS`, 
                      icon: 'https://img.icons8.com/fluency/96/test-tube.png' 
                    },
                    { 
                      id: 'TEST' as MaterialCategory,
                      title: 'Test Series', 
                      count: `${categoryCounts.TEST} TESTS`, 
                      icon: 'https://img.icons8.com/fluency/96/bar-chart.png' 
                    }
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,167,157,0.1)] transition-all cursor-pointer group flex flex-col items-center text-center"
                      onClick={() => setSelectedCategory(item.id)}
                    >
                      <div className="w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                         <img src={item.icon} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                      <h4 className="font-black text-slate-800 text-lg mb-1">{item.title}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.count}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {user.role === UserRole.STUDENT && (
        <AITutorChat user={user} batches={batches} />
      )}
    </div>
  );
};

export default Dashboard;
