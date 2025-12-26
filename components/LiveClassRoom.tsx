
import React, { useState, useEffect, useRef } from 'react';
import { User, Batch, ChatMessage, Poll } from '../types';
import { summarizeChat, askAIExpert } from '../services/geminiService';

interface LiveClassRoomProps {
  user: User;
  batch: Batch;
  onLeave: () => void;
}

const LiveClassRoom: React.FC<LiveClassRoomProps> = ({ user, batch, onLeave }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<'CHAT' | 'POLLS' | 'AI'>('CHAT');
  const [poll, setPoll] = useState<Poll | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState('');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Mock initial poll and system messages
  useEffect(() => {
    setMessages([
      { id: 'm1', userId: 'system', userName: 'System', text: 'Welcome to the live session! Please maintain decorum.', timestamp: new Date() },
      { id: 'm2', userId: 'a1', userName: 'Dr. Sarah Smith', text: 'Hello everyone! Today we start Quantum Mechanics.', timestamp: new Date(), isAdmin: true },
    ]);

    // Simulate a poll being pushed after 3 seconds
    setTimeout(() => {
      setPoll({
        id: 'p1',
        question: 'Do you understand the Heisenberg Uncertainty Principle?',
        options: ['Yes, crystal clear', 'Somewhat', 'No, please re-explain'],
        votes: { 0: 12, 1: 24, 2: 5 },
        isActive: true
      });
    }, 3000);
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

  const handleSummarize = async () => {
    setIsSummarizing(true);
    try {
      const textMessages = messages.map(m => `${m.userName}: ${m.text}`);
      const res = await summarizeChat(textMessages);
      setSummary(res || 'Unable to generate summary.');
      setActiveTab('AI');
    } catch (error) {
      setSummary('AI summarizing failed. Please try again later.');
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleAskAI = async () => {
    if (!aiQuestion.trim()) return;
    setAiAnswer('Thinking...');
    try {
      const context = messages.slice(-10).map(m => m.text).join(' ');
      const res = await askAIExpert(aiQuestion, context);
      setAiAnswer(res || 'Sorry, I could not find an answer.');
    } catch (e) {
      setAiAnswer('An error occurred while talking to the AI.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-slate-900 overflow-hidden">
      {/* Video Content */}
      <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
        <img 
          src="https://picsum.photos/seed/lecture/1920/1080" 
          className="w-full h-full object-cover opacity-60" 
          alt="Lecture Stream" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center mb-4 mx-auto animate-pulse">
               <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               </div>
            </div>
            <p className="text-white font-bold text-lg">Dr. Sarah Smith is presenting...</p>
          </div>
        </div>

        {/* Floating Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 dark-glass px-6 py-3 rounded-2xl flex items-center gap-6 text-white shadow-2xl">
          <button className="p-3 bg-red-500 rounded-xl hover:bg-red-600 transition-colors" title="Mic On/Off">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
          </button>
          <button className="p-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors" title="Hand Raise">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>
          </button>
          <div className="w-[1px] h-6 bg-white/20"></div>
          <button 
            onClick={onLeave}
            className="px-6 py-2 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors"
          >
            Leave
          </button>
        </div>

        {/* Live Badge */}
        <div className="absolute top-6 left-6 flex items-center gap-3">
          <div className="bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            Live
          </div>
          <div className="bg-black/40 backdrop-blur px-3 py-1 rounded-lg text-white font-medium text-xs">
            {batch.name} • 1.2k watching
          </div>
        </div>
      </div>

      {/* Interactive Sidebar */}
      <div className="w-full md:w-[400px] bg-white flex flex-col h-[400px] md:h-full">
        {/* Tabs */}
        <div className="flex border-b">
          {(['CHAT', 'POLLS', 'AI'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 font-bold text-sm transition-all relative ${
                activeTab === tab ? 'text-blue-600' : 'text-slate-400'
              }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full mx-6"></div>}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'CHAT' && (
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.userId === user.id ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-tighter ${m.isAdmin ? 'text-red-500' : 'text-slate-400'}`}>
                      {m.isAdmin ? 'Instructor' : m.userName}
                    </span>
                  </div>
                  <div className={`px-4 py-2 rounded-2xl text-sm max-w-[85%] ${
                    m.userId === user.id ? 'bg-blue-600 text-white rounded-tr-none' : 
                    m.isAdmin ? 'bg-red-50 text-slate-800 border border-red-100' :
                    'bg-slate-100 text-slate-800 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          )}

          {activeTab === 'POLLS' && (
            <div className="space-y-6">
              {poll ? (
                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                  <h3 className="font-bold text-slate-800 mb-4">{poll.question}</h3>
                  <div className="space-y-3">
                    {poll.options.map((opt, idx) => (
                      <button key={idx} className="w-full p-4 bg-white border border-blue-100 rounded-2xl text-left text-sm font-medium hover:border-blue-400 transition-all flex items-center justify-between group">
                        {opt}
                        <div className="w-4 h-4 rounded-full border border-slate-300 group-hover:border-blue-500"></div>
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-4 text-center italic">Poll created by Instructor</p>
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-slate-500 font-medium">No active polls at the moment.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'AI' && (
            <div className="space-y-6">
              <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                    <span className="text-xl">✨</span> AI Class Summary
                  </h3>
                  <button 
                    disabled={isSummarizing}
                    onClick={handleSummarize}
                    className="text-xs font-bold text-indigo-600 hover:underline uppercase tracking-wider"
                  >
                    {isSummarizing ? 'Thinking...' : 'Refresh'}
                  </button>
                </div>
                {summary ? (
                  <p className="text-sm text-indigo-800 leading-relaxed whitespace-pre-wrap">{summary}</p>
                ) : (
                  <p className="text-xs text-indigo-500 italic text-center py-4">Click refresh to generate summary from the chat discussion.</p>
                )}
              </div>

              <div className="p-1 border rounded-3xl">
                <div className="bg-slate-50 p-4 rounded-[1.4rem]">
                   <h4 className="text-sm font-bold mb-3">Ask Expert AI Assistant</h4>
                   <div className="flex gap-2 mb-3">
                      <input 
                        type="text" 
                        value={aiQuestion}
                        onChange={(e) => setAiQuestion(e.target.value)}
                        placeholder="e.g. What is the planck constant?" 
                        className="flex-1 bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button 
                        onClick={handleAskAI}
                        className="bg-slate-900 text-white p-2 rounded-xl hover:bg-slate-800"
                      >
                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                      </button>
                   </div>
                   {aiAnswer && (
                     <div className="bg-white p-3 rounded-xl text-sm text-slate-700 border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                        <strong>AI:</strong> {aiAnswer}
                     </div>
                   )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        {activeTab === 'CHAT' && (
          <div className="p-4 border-t bg-white">
            <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-2xl">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none"
              />
              <button 
                onClick={handleSendMessage}
                className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveClassRoom;
