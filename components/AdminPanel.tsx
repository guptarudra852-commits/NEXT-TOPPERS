
import React, { useState } from 'react';
import { User, Batch, Poll, ChatMessage } from '../types';

interface AdminPanelProps {
  user: User;
  batch: Batch;
  onLeave: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ user, batch, onLeave }) => {
  const [isLive, setIsLive] = useState(false);
  const [activePolls, setActivePolls] = useState<Poll[]>([]);
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState(['', '']);
  
  // Chat Moderation State
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', userId: 'u101', userName: 'Rahul V.', text: 'Mam, can you repeat the derivation?', timestamp: new Date(), isAdmin: false },
    // Fixed: Removed 'msg' property which is not present in ChatMessage type
    { id: '2', userId: 'u102', userName: 'Sanya K.', text: 'The audio is a bit low for me.', timestamp: new Date(), isAdmin: false },
    { id: '3', userId: 'u103', userName: 'Aryan Singh', text: 'Quantum theory is so interesting!', timestamp: new Date(), isAdmin: false },
    { id: '4', userId: 'u104', userName: 'Sneha J.', text: 'Is this topic in the upcoming test?', timestamp: new Date(), isAdmin: false },
  ]);
  const [mutedUserIds, setMutedUserIds] = useState<Set<string>>(new Set());
  const [announcement, setAnnouncement] = useState('');

  const handleCreatePoll = () => {
    if (!newPollQuestion || newPollOptions.some(o => !o)) return;
    const poll: Poll = {
      id: Date.now().toString(),
      question: newPollQuestion,
      options: newPollOptions,
      votes: {},
      isActive: true
    };
    setActivePolls([poll, ...activePolls]);
    setNewPollQuestion('');
    setNewPollOptions(['', '']);
  };

  const updateOption = (idx: number, val: string) => {
    const next = [...newPollOptions];
    next[idx] = val;
    setNewPollOptions(next);
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const handleToggleMute = (userId: string) => {
    setMutedUserIds(prev => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      return next;
    });
  };

  const handleSendAnnouncement = () => {
    if (!announcement.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      text: announcement,
      timestamp: new Date(),
      isAdmin: true
    };
    setMessages(prev => [...prev, newMessage]);
    setAnnouncement('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Instructor Control Room</h1>
            <p className="text-xs text-slate-500">{batch.name} • {batch.teacher}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Network Health</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-1 h-3 rounded-full ${i <= 4 ? 'bg-green-500' : 'bg-slate-200'}`}></div>)}
            </div>
          </div>
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
              isLive ? 'bg-red-50 text-red-600 border border-red-200 shadow-sm' : 'bg-blue-600 text-white shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-600 animate-pulse' : 'bg-white'}`}></div>
            {isLive ? 'Stop Broadcast' : 'Go Live'}
          </button>
          <button onClick={onLeave} className="p-2 text-slate-400 hover:text-slate-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Main Feed Preview */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-50/50">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="space-y-6">
              <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:shadow-md">
                 <div className="flex items-center justify-between mb-4">
                   <h2 className="font-bold text-lg flex items-center gap-2 text-slate-800">
                      <span className="p-2 bg-blue-50 rounded-lg text-blue-600 text-sm">📺</span>
                      Stream Preview
                   </h2>
                   <div className="flex items-center gap-2">
                     <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">1080p • 60fps</span>
                   </div>
                 </div>
                 <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden relative group shadow-inner">
                    <img src="https://picsum.photos/seed/adminpreview/800/450" className="w-full h-full object-cover opacity-80 transition-opacity group-hover:opacity-60" alt="Preview" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                       <div className="flex gap-4">
                         <button className="bg-white/20 backdrop-blur p-4 rounded-full text-white hover:bg-blue-600 transition-all transform hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                         </button>
                         <button className="bg-white/20 backdrop-blur p-4 rounded-full text-white hover:bg-slate-600 transition-all transform hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                         </button>
                       </div>
                    </div>
                    {isLive && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] px-2.5 py-1 rounded-md font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        Streaming
                      </div>
                    )}
                 </div>
                 <div className="mt-6 grid grid-cols-3 gap-3">
                    <button className="p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 hover:border-slate-200 text-xs font-bold text-slate-700 transition-all flex flex-col items-center gap-2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                       Switch Cam
                    </button>
                    <button className="p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 hover:border-slate-200 text-xs font-bold text-slate-700 transition-all flex flex-col items-center gap-2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                       Share Screen
                    </button>
                    <button className="p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 hover:border-slate-200 text-xs font-bold text-slate-700 transition-all flex flex-col items-center gap-2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M2 12h20"/></svg>
                       Overlay
                    </button>
                 </div>
              </section>

              <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                 <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-800">
                    <span className="p-2 bg-amber-50 rounded-lg text-amber-600 text-sm">📊</span>
                    Class Analytics
                 </h2>
                 <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Live Viewers</p>
                       <p className="text-xl font-black text-slate-800">1,245</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Hand Raises</p>
                       <p className="text-xl font-black text-blue-600">14</p>
                    </div>
                 </div>
                 <div className="space-y-5">
                    <div>
                      <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-2">
                         <span>Participation Rate</span>
                         <span className="text-blue-600">80%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                         <div className="bg-blue-500 h-full w-[80%] rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-2">
                         <span>Avg Engagement</span>
                         <span className="text-green-600">65%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                         <div className="bg-green-500 h-full w-[65%] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                      </div>
                    </div>
                 </div>
              </section>
            </div>

            <div className="space-y-6">
               <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm h-full hover:shadow-md transition-all">
                  <h2 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-800">
                    <span className="p-2 bg-purple-50 rounded-lg text-purple-600 text-sm">🗳️</span>
                    Poll Management
                  </h2>
                  
                  <div className="space-y-4 mb-8">
                     <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                        <input 
                          type="text" 
                          value={newPollQuestion}
                          onChange={(e) => setNewPollQuestion(e.target.value)}
                          placeholder="Question (e.g. Any doubts?)" 
                          className="w-full bg-white border border-slate-200 px-4 py-3 rounded-2xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                        />
                        <div className="space-y-2">
                           {newPollOptions.map((opt, idx) => (
                             <div key={idx} className="flex gap-2">
                               <input 
                                 type="text" 
                                 value={opt}
                                 onChange={(e) => updateOption(idx, e.target.value)}
                                 placeholder={`Option ${idx + 1}`} 
                                 className="flex-1 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-500 transition-colors"
                               />
                               {idx > 1 && (
                                 <button 
                                   onClick={() => setNewPollOptions(prev => prev.filter((_, i) => i !== idx))}
                                   className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                 >
                                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                 </button>
                               )}
                             </div>
                           ))}
                        </div>
                        <button 
                          onClick={() => setNewPollOptions([...newPollOptions, ''])}
                          className="mt-4 flex items-center gap-1.5 text-[11px] font-black text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest px-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          Add Option
                        </button>
                        <button 
                          onClick={handleCreatePoll}
                          className="w-full mt-6 bg-slate-900 text-white py-3.5 rounded-2xl text-xs font-black hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg"
                        >
                          Launch Poll to Students
                        </button>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Active / Past Polls</h3>
                     {activePolls.length > 0 ? (
                       <div className="space-y-3">
                         {activePolls.map(p => (
                           <div key={p.id} className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-blue-200 transition-colors">
                              <div className="max-w-[75%]">
                                 <p className="text-sm font-bold text-slate-800 truncate">{p.question}</p>
                                 <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-2">
                                   <span className="flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                   Active • 42 votes
                                 </p>
                              </div>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="View Results">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
                                </button>
                                <button 
                                  onClick={() => setActivePolls(prev => prev.filter(item => item.id !== p.id))}
                                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                  title="Delete Poll"
                                >
                                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                                </button>
                              </div>
                           </div>
                         ))}
                       </div>
                     ) : (
                        <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/30">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-300 mb-3 shadow-sm">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
                          </div>
                          <p className="text-xs text-slate-400 font-medium">No polls launched yet</p>
                        </div>
                     )}
                  </div>
               </section>
            </div>
          </div>
        </div>

        {/* Chat Control Sidebar - World Class Moderation UI */}
        <div className="w-full lg:w-[400px] bg-white border-l flex flex-col shadow-2xl z-10">
           <div className="p-6 border-b flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="font-black text-slate-800 tracking-tight">Chat Moderation</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{messages.length} Total Messages</p>
              </div>
              <div className="flex items-center gap-1.5">
                 <button className="p-2.5 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 rounded-xl text-slate-500 transition-all shadow-sm group" title="Mute All Chat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-active:scale-90 transition-transform"><path d="m15 9-6 6"/><path d="m9 9 6 6"/><circle cx="12" cy="12" r="10"/></svg>
                 </button>
                 <button 
                  onClick={() => setMessages([])}
                  className="p-2.5 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-800 rounded-xl text-slate-500 transition-all shadow-sm group" 
                  title="Clear Chat History"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-active:rotate-12 transition-transform"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                 </button>
              </div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar bg-white">
              {messages.length > 0 ? messages.map(m => {
                const isUserMuted = mutedUserIds.has(m.userId);
                return (
                  <div key={m.id} className={`flex gap-3 group relative transition-all ${isUserMuted ? 'opacity-50 grayscale' : ''}`}>
                    <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-[11px] font-black shadow-sm ${
                      m.isAdmin ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {m.userName[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-black truncate max-w-[120px] ${m.isAdmin ? 'text-blue-700' : 'text-slate-800'}`}>
                            {m.userName}
                          </span>
                          {m.isAdmin && (
                            <span className="text-[8px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-black uppercase tracking-widest">Host</span>
                          )}
                          {isUserMuted && (
                            <span className="text-[8px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-black uppercase tracking-widest">Muted</span>
                          )}
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 tabular-nums">
                          {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className={`text-xs p-3 rounded-2xl shadow-sm border transition-all ${
                        m.isAdmin 
                          ? 'bg-blue-50/50 border-blue-100 text-slate-800' 
                          : 'bg-white border-slate-100 text-slate-600'
                      }`}>
                        {m.text}
                      </div>
                      
                      {/* Granular Action Tooltip - Appear on hover */}
                      {!m.isAdmin && (
                        <div className="mt-2 flex gap-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                           <button 
                            onClick={() => setAnnouncement(`@${m.userName} `)}
                            className="text-[10px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-wider flex items-center gap-1"
                           >
                             <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                             Reply
                           </button>
                           <button 
                            onClick={() => handleToggleMute(m.userId)}
                            className={`text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${isUserMuted ? 'text-green-600 hover:text-green-700' : 'text-amber-600 hover:text-amber-700'}`}
                           >
                             <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
                             {isUserMuted ? 'Unmute' : 'Mute User'}
                           </button>
                           <button 
                            onClick={() => handleDeleteMessage(m.id)}
                            className="text-[10px] font-black text-red-500 hover:text-red-700 uppercase tracking-wider flex items-center gap-1 ml-auto"
                           >
                             <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                             Remove
                           </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }) : (
                <div className="flex flex-col items-center justify-center py-20 opacity-30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <p className="text-sm font-bold">No active conversation</p>
                </div>
              )}
           </div>

           {/* Announcement Input */}
           <div className="p-5 bg-slate-50 border-t shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-3 bg-white p-2.5 rounded-[1.5rem] border border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all shadow-sm">
                <input
                  type="text"
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendAnnouncement()}
                  placeholder="Broadcast message to class..."
                  className="flex-1 bg-transparent px-4 py-2 text-sm font-medium focus:outline-none placeholder:text-slate-400"
                />
                <button 
                  onClick={handleSendAnnouncement}
                  className="w-11 h-11 bg-slate-900 text-white rounded-[1rem] flex items-center justify-center hover:bg-blue-600 active:scale-90 transition-all shadow-md group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
