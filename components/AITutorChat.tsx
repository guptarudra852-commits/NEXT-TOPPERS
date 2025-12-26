
import React, { useState, useRef, useEffect } from 'react';
import { User, Batch } from '../types';
import { askAIExpert } from '../services/geminiService';

interface AITutorChatProps {
  user: User;
  batches: Batch[];
}

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const AITutorChat: React.FC<AITutorChatProps> = ({ user, batches }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: `Hi ${user.name}! I'm your NextToppers AI Tutor. I can help you with topics from your batches like ${batches.map(b => b.subject).join(', ')}. What would you like to learn today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Provide context about the student's enrolled batches
      const context = `The student is enrolled in the following batches: ${batches.map(b => `${b.name} (${b.subject})`).join(', ')}.`;
      const response = await askAIExpert(userMsg, context);
      setMessages(prev => [...prev, { role: 'ai', text: response || "I'm sorry, I couldn't process that request." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full bg-indigo-600 text-white shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 z-50 ${isOpen ? 'rotate-90' : 'animate-bounce'}`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"/><circle cx="17" cy="7" r="5"/></svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-28 right-8 w-[90vw] md:w-[400px] h-[60vh] md:h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform z-50 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"/><circle cx="17" cy="7" r="5"/></svg>
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">AI Expert Tutor</h3>
              <p className="text-xs text-indigo-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                Always available for you
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm transition-all ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {messages.length < 3 && !isLoading && (
          <div className="px-4 py-2 flex gap-2 overflow-x-auto bg-slate-50 scrollbar-hide">
            {['Explain Physics concepts', 'Chemistry doubts', 'Calculus help'].map((text, i) => (
              <button
                key={i}
                onClick={() => setInput(text)}
                className="whitespace-nowrap px-3 py-1.5 bg-white border border-indigo-100 rounded-full text-[10px] font-bold text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                {text}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-2xl border border-transparent focus-within:border-indigo-500 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 active:scale-90 transition-all shadow-lg disabled:opacity-50 disabled:shadow-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-2">
            AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </>
  );
};

export default AITutorChat;
