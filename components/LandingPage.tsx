
import React from 'react';
import { UserRole } from '../types';

interface LandingPageProps {
  onLogin: (role: UserRole) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="overflow-y-auto">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        <div className="absolute top-20 right-[-10%] w-[40%] h-[60%] bg-blue-200/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-10 left-[-5%] w-[30%] h-[40%] bg-indigo-200/20 blur-[100px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mb-6 tracking-wider uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Next Generation Learning
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-8">
              Become a <span className="text-blue-600">Topper</span> with NextToppers Pro.
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              Experience India's most interactive live classes with smart AI summaries, personalized feedback, and elite batch mentors.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={() => onLogin(UserRole.STUDENT)}
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 group"
              >
                Start Learning as Student
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </button>
              <button 
                onClick={() => onLogin(UserRole.ADMIN)}
                className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:bg-slate-50 shadow-lg shadow-slate-100 transition-all flex items-center justify-center gap-2"
              >
                Go to Teacher Panel
              </button>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/${i}/64/64`} className="w-10 h-10 rounded-full border-2 border-white" alt="Student" />
                ))}
              </div>
              <p className="text-sm font-medium text-slate-500">Joined by <span className="text-slate-900 font-bold">50k+</span> ambitious students</p>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white p-4 rounded-[2.5rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://picsum.photos/seed/learn/800/600" 
                className="rounded-[1.5rem] w-full" 
                alt="Learning Experience" 
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4 animate-bounce">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Live Session Active</p>
                  <p className="text-xs text-slate-500">2.4k students joined</p>
                </div>
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-400/10 rounded-full -z-10"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to excel</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Our platform is built by experts to ensure a seamless learning journey from day one to the final exam.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Interactive Live Classes', desc: 'Real-time polls, live chat, and hand-raise features to keep you engaged.', color: 'bg-blue-50 text-blue-600', icon: '📺' },
              { title: 'Batch-Wise Focus', desc: 'Structured learning in small batches with dedicated mentors for every subject.', color: 'bg-purple-50 text-purple-600', icon: '👥' },
              { title: 'AI Study Assistant', desc: 'Get instant summaries of your live classes and answers to any question.', color: 'bg-indigo-50 text-indigo-600', icon: '🤖' },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all group">
                <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
