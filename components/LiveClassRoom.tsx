
import React, { useState, useEffect, useRef } from 'react';
import { User, Batch, ChatMessage, Poll } from '../types';
import { summarizeChat, askAIExpert } from '../services/geminiService';

interface LiveClassRoomProps {
  user: User;
  batch: Batch;
  announcement: string | null;
  onLeave: () => void;
}

const LiveClassRoom: React.FC<LiveClassRoomProps> = ({ user, batch, announcement, onLeave }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<'CHAT' | 'POLL'>('CHAT');
  const [poll, setPoll] = useState<Poll | null>(pollInitial);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initial data setup based on screenshot
  useEffect(() => {
    setMessages([
      { id: 'm1', userId: 'u101', userName: 'id ✓✓✓✓✓✓✓', text: ' ', timestamp: new Date() },
      { id: 'm2', userId: 'u102', userName: 'Raj Chouhan', text: '⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛', timestamp: new Date() },
      { id: 'm3', userId: 'u103', userName: 'harshit', text: 'lag', timestamp: new Date() },
      { id: 'm4', userId: 'u104', userName: 'Irtaza', text: '__mohd_irtaza____._', timestamp: new Date() },
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      text: inputText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8f9fa] overflow-hidden">
      {/* Top Header inside Live Classroom */}
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
          <div className="bg-[#4D4D4D] px-4 py-2 rounded-lg">
             <div className="flex items-center gap-2">
                <span className="text-white font-black text-sm italic">Next</span>
                <div className="bg-[#00A79D] p-1 rounded">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2L22 12L12 22L2 12L12 2Z"/></svg>
                </div>
                <span className="text-white font-black text-sm italic">Toppers</span>
             </div>
          </div>
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{batch.name}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400">Hi {user.name}</p>
          </div>
          <div className="w-10 h-10 bg-[#00A79D] rounded-full flex items-center justify-center text-white font-bold">
            {user.name[0]}
          </div>
          <button onClick={onLeave} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-6 gap-6">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden relative">
          <div className="flex-1 bg-slate-900 relative flex items-center justify-center">
            {/* Simulation of the blackboard from the screenshot */}
            <img 
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80" 
              className="w-full h-full object-cover opacity-80" 
              alt="Live Stream" 
            />
            
            {/* Whiteboard overlay content mock */}
            <div className="absolute inset-0 p-12 text-white font-bold pointer-events-none flex flex-col justify-center">
               <h2 className="text-3xl text-yellow-400 mb-4">#LP: Two water taps together can fill a tank in 9 3/8 hours.</h2>
               <p className="text-xl text-yellow-200">The larger diameter takes 10 hours less than the smaller one to fill separately...</p>
               <div className="mt-8 border-t border-green-500 w-1/2 pt-4">
                  <p className="text-2xl italic text-green-300">Time taken together = 75/8 hr</p>
               </div>
            </div>

            {/* Teacher PiP simulation */}
            <div className="absolute bottom-10 left-10 w-48 h-64 rounded-xl border-2 border-white/20 shadow-2xl overflow-hidden bg-slate-800">
               <img src="https://picsum.photos/seed/teacher/200/300" className="w-full h-full object-cover grayscale opacity-80" alt="Teacher" />
            </div>

            {/* Video Controls Bar - Floating at bottom of video */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-lg p-1.5 flex items-center gap-1 border border-white/20">
               <button className="p-2 hover:bg-white/20 rounded-md text-white"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>
               <div className="w-[1px] h-4 bg-white/20 mx-1"></div>
               {[
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>,
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>,
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
               ].map((icon, idx) => (
                 <button key={idx} className="p-2 hover:bg-white/20 rounded-md text-white transition-colors">{icon}</button>
               ))}
               <div className="w-[1px] h-4 bg-white/20 mx-1"></div>
               <button className="p-2 hover:bg-white/20 rounded-md text-white"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></button>
            </div>
          </div>
          
          {/* Bottom Bar Controls */}
          <div className="bg-slate-100 p-2 flex items-center justify-center gap-6 border-t border-slate-200">
             <button className="flex items-center gap-2 p-2 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
             </button>
             <div className="flex items-center gap-2">
                <button className="p-2 bg-slate-200 rounded-lg"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg></button>
                <div className="bg-white px-4 py-1.5 rounded-lg border text-sm font-bold text-slate-800">22 / 100</div>
                <button className="p-2 bg-slate-200 rounded-lg"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></button>
             </div>
             <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
             </button>
          </div>
        </div>

        {/* Sidebar - Matching Screenshot Tabs and Chat Style */}
        <div className="w-full lg:w-[380px] bg-white rounded-xl shadow-lg border border-slate-200 flex flex-col overflow-hidden">
          {/* Custom Toggle Tabs */}
          <div className="p-4 border-b flex gap-2">
            <button 
              onClick={() => setActiveTab('CHAT')}
              className={`flex-1 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 border transition-all ${
                activeTab === 'CHAT' ? 'bg-white border-orange-200 text-orange-600 shadow-sm' : 'bg-slate-50 border-transparent text-slate-400'
              }`}
            >
              <span className={activeTab === 'CHAT' ? 'text-orange-500' : 'text-slate-300'}>
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </span>
              Live Chat
            </button>
            <button 
              onClick={() => setActiveTab('POLL')}
              className={`flex-1 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 border transition-all ${
                activeTab === 'POLL' ? 'bg-white border-orange-200 text-orange-600 shadow-sm' : 'bg-slate-50 border-transparent text-slate-400'
              }`}
            >
              <span className={activeTab === 'POLL' ? 'text-orange-500' : 'text-slate-300'}>
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
              </span>
              Live Poll
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 bg-white">
            {activeTab === 'CHAT' ? (
              <>
                {messages.map((m) => (
                  <div key={m.id} className="flex flex-col gap-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[11px] font-black text-slate-800">{m.userName}</span>
                    </div>
                    <div className="bg-[#f2f2f2] p-3 rounded-xl shadow-sm text-sm text-slate-600 leading-relaxed break-words">
                      {m.text}
                    </div>
                    {/* Fix: Changed 'Short' to 'short' to match valid Intl.DateTimeFormat options */}
                    <span className="text-[9px] font-bold text-slate-400 px-1">
                      {m.timestamp.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </span>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-40">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
                <p className="mt-4 font-black text-sm uppercase tracking-widest">No Active Polls</p>
              </div>
            )}
          </div>

          {/* Chat Input - Exact Screenshot Style */}
          {activeTab === 'CHAT' && (
            <div className="p-4 border-t bg-white">
              <div className="flex items-center gap-3 border rounded-xl px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type Something..."
                  className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
                />
                <button 
                  onClick={handleSendMessage}
                  className="w-10 h-10 bg-[#ff8c00] text-white rounded-lg flex items-center justify-center hover:bg-orange-600 active:scale-90 transition-all shadow-md group"
                >
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const pollInitial: Poll = {
  id: 'p1',
  question: 'Which of these is a rational number?',
  options: ['√2', 'π', '0.5', 'e'],
  votes: { 0: 5, 1: 12, 2: 45, 3: 2 },
  isActive: true
};

export default LiveClassRoom;
