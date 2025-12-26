
import React, { useRef } from 'react';
import { UserRole, SiteConfig } from '../types';

interface LandingPageProps {
  siteConfig: SiteConfig;
  onLogin: (role: UserRole) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ siteConfig, onLogin }) => {
  const appSectionRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);

  const scrollToApp = () => appSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToCourses = () => coursesRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="bg-white overflow-y-auto">
      {/* 1. Dynamic Hero Promotional Banner */}
      <section className="px-6 md:px-12 py-8">
        <div className="max-w-[1400px] mx-auto relative group">
          <div className="overflow-hidden rounded-[2rem] shadow-2xl bg-slate-100 aspect-[21/9] md:aspect-[24/8] flex items-center justify-center relative cursor-pointer" onClick={scrollToCourses}>
            <img 
               src={siteConfig.heroBanner} 
               className="absolute inset-0 w-full h-full object-cover" 
               alt="Hero Banner" 
            />
            {/* Overlay Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
               <div className="w-10 h-2 bg-white rounded-full"></div>
               <div className="w-2 h-2 bg-white/50 rounded-full shadow-sm"></div>
               <div className="w-2 h-2 bg-white/50 rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Struggle Banner */}
      <section className="px-6 md:px-12 py-4">
        <div className="max-w-[1400px] mx-auto bg-[#E6F7F6] border border-[#00A79D]/10 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center">
                 <img src="https://img.icons8.com/clouds/100/learning.png" className="w-12 h-12" alt="Learning icon" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800">Struggling in Studies?</h3>
                <p className="text-slate-600 font-medium italic">Aaiye aapki Samasya ka Samadhan krte hai ✨</p>
              </div>
           </div>
           <button onClick={() => onLogin(UserRole.STUDENT)} className="bg-[#00A79D] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#008f86] transition-all shadow-md active:scale-95">
              See How We Help
           </button>
        </div>
      </section>

      {/* 3. Dynamic Trending Courses */}
      <section ref={coursesRef} className="py-16 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl font-black text-slate-800 text-center mb-12 flex items-center justify-center gap-2">
             🔥 Trending Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {siteConfig.trendingBanners.map((img, i) => (
              <div key={i} className="group cursor-pointer" onClick={() => onLogin(UserRole.STUDENT)}>
                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-1">
                   <img 
                    src={img} 
                    className="w-full aspect-video object-cover" 
                    alt={`Course ${i + 1}`} 
                   />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Products */}
      <section className="py-16 px-6 md:px-12 bg-slate-50/50">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl font-black text-slate-800 text-center mb-12">Our Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { label: "CLASS 11th & 12th", color: "bg-[#00A79D]", icon: "📚" },
              { label: "UP/BIHAR BOARD", color: "bg-[#00A79D]", icon: "🎓" },
              { label: "ABHAY 9th & 10th", color: "bg-[#00A79D]", icon: "✨" },
              { label: "NIRBHAY PRO CUET", color: "bg-[#00A79D]", icon: "🏆" },
              { label: "10th CLASS", color: "bg-[#00A79D]", icon: "📖" },
            ].map((p, i) => (
              <div key={i} className={`${p.color} p-8 rounded-2xl text-white text-center flex flex-col items-center justify-center group hover:scale-105 transition-all shadow-lg cursor-pointer`} onClick={() => onLogin(UserRole.STUDENT)}>
                <div className="text-4xl mb-4">{p.icon}</div>
                <h4 className="font-black text-sm tracking-tighter mb-4">{p.label}</h4>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"></path></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Free Courses */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
           <div className="border-b-2 border-[#00A79D] inline-block mb-10 pb-2">
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Free Courses</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                "Science 12th (Free Content)", 
                "Science 11th (Free Content)", 
                "Commerce 12th (Free Content)", 
                "Commerce 11th (Free Content)"
              ].map((name, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md border flex flex-col overflow-hidden group">
                   <div className="bg-[#00A79D] h-32 flex items-center justify-center text-white font-black text-xl italic px-4 text-center uppercase tracking-tighter">
                      NEXT TOPPERS FREE CONTENT
                   </div>
                   <div className="p-4 flex-1">
                      <h4 className="text-xs font-bold text-slate-700 mb-2">{name}</h4>
                      <span className="bg-green-100 text-green-700 text-[9px] px-2 py-0.5 rounded font-black uppercase">Free</span>
                   </div>
                   <button onClick={() => onLogin(UserRole.STUDENT)} className="bg-[#4D4D4D] text-white py-2 text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors">
                      Explore
                   </button>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. Achievements */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16">
           <div className="w-full lg:w-1/2">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" className="rounded-[3rem] shadow-2xl" alt="Team" />
           </div>
           <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-black text-slate-800 mb-6">Our Achievements</h2>
              <div className="grid grid-cols-2 gap-6">
                 {[
                   { label: "Instructor's", value: "20+", color: "bg-[#EBF5FF] text-blue-600", icon: "👨‍🏫" },
                   { label: "Video's", value: "20K+", color: "bg-[#ECFDF5] text-green-600", icon: "📹" },
                   { label: "Students", value: "20L+", color: "bg-[#FEF2F2] text-red-600", icon: "👥" },
                   { label: "Test Series", value: "200+", color: "bg-[#FFFBEB] text-amber-600", icon: "📝" }
                 ].map((s, i) => (
                   <div key={i} className={`${s.color} p-6 rounded-2xl flex items-center gap-4 border border-slate-100 shadow-sm`}>
                      <div className="text-3xl">{s.icon}</div>
                      <div>
                        <p className="text-2xl font-black">{s.value}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest">{s.label}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* 7. Download App Section */}
      <section ref={appSectionRef} className="py-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto bg-gradient-to-br from-[#E1F7F6] to-white rounded-[4rem] p-12 md:p-20 relative flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden border border-[#00A79D]/10">
           <div className="max-w-xl relative z-10">
              <h2 className="text-5xl font-black text-slate-800 mb-8 leading-tight">Download App</h2>
              <p className="text-slate-600 text-lg mb-12 font-medium leading-relaxed">Get the NextToppers app to access Downloaded lectures anytime, anywhere and learn at your convenience.</p>
              <div className="flex flex-wrap gap-4">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-12 cursor-pointer transition-transform hover:scale-105" alt="Play Store" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="h-12 cursor-pointer transition-transform hover:scale-105" alt="App Store" />
                 <div className="bg-slate-900 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-black transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 14.355c0-.742-.564-1.344-1.258-1.344h-5.484c-.694 0-1.258.602-1.258 1.344v4.31c0 .742.564 1.344 1.258 1.344h5.484c.694 0 1.258-.602 1.258-1.344v-4.31zm0-9.69c0-.742-.564-1.344-1.258-1.344h-5.484c-.694 0-1.258.602-1.258 1.344v4.31c0 .742.564 1.344 1.258 1.344h5.484c.694 0 1.258-.602 1.258-1.344v-4.31zm-9.355 9.69c0-.742-.564-1.344-1.258-1.344h-5.484c-.694 0-1.258.602-1.258 1.344v4.31c0 .742.564 1.344 1.258 1.344h5.484c.694 0 1.258-.602 1.258-1.344v-4.31zm0-9.69c0-.742-.564-1.344-1.258-1.344h-5.484c-.694 0-1.258.602-1.258 1.344v4.31c0 .742.564 1.344 1.258 1.344h5.484c.694 0 1.258-.602 1.258-1.344v-4.31z"/></svg>
                    <span className="font-bold">Windows</span>
                 </div>
              </div>
           </div>
           <div className="relative w-full max-w-lg">
              <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80" className="rounded-[3rem] shadow-2xl relative z-10" alt="App Phone" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#00A79D]/5 rounded-full blur-[100px]"></div>
           </div>
        </div>
      </section>

      {/* 8. Get In Touch */}
      <footer className="bg-[#1C2534] text-white py-20 px-6 md:px-12 border-t border-slate-700">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-[#00A79D] p-1.5 rounded-lg mr-2"><span className="font-black text-lg italic">NT</span></div>
                <span className="font-black text-xl tracking-tight uppercase">Next Toppers</span>
              </div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">Address:<br/>Delhi, India</p>
              <div className="flex gap-4">
                 <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#00A79D] cursor-pointer transition-colors" onClick={() => alert('Follow us on Twitter!')}>📱</div>
                 <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#00A79D] cursor-pointer transition-colors" onClick={() => alert('Email us at support@nexttoppers.com')}>✉️</div>
              </div>
            </div>
            <div>
              <h4 className="font-black text-lg mb-8 uppercase tracking-widest text-[#00A79D]">Company</h4>
              <ul className="space-y-4 text-slate-400 font-medium text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-8 uppercase tracking-widest text-[#00A79D]">Products</h4>
              <ul className="space-y-4 text-slate-400 font-medium text-sm">
                <li><a href="#" onClick={scrollToCourses} className="hover:text-white">ABHAY 9th & 10th</a></li>
                <li><a href="#" onClick={scrollToCourses} className="hover:text-white">NIRBHAY PRO</a></li>
                <li><a href="#" onClick={scrollToCourses} className="hover:text-white">10th Class</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-8 uppercase tracking-widest text-[#00A79D]">Help & Support</h4>
              <ul className="space-y-4 text-slate-400 font-medium text-sm">
                <li><a href="#" className="hover:text-white">FAQ's</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
             <p>Next Toppers All Right Reserved, 2025</p>
             <div className="flex gap-8">
               <a href="#" className="hover:text-white">Twitter</a>
               <a href="#" className="hover:text-white">Instagram</a>
               <a href="#" className="hover:text-white">Youtube</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
