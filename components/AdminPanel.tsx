
import React, { useState } from 'react';
import { User, Batch, StudyMaterial, MaterialCategory, SiteConfig } from '../types';

interface AdminPanelProps {
  user: User;
  batch: Batch;
  allBatches: Batch[];
  siteConfig: SiteConfig;
  onUpdateSiteConfig: (config: SiteConfig) => void;
  currentBroadcast: string | null;
  onBroadcast: (msg: string | null) => void;
  onAddBatch: (batch: Batch) => void;
  onUpdateBatch: (batch: Batch) => void;
  onAddMaterial: (batchId: string, material: StudyMaterial) => void;
  onDeleteMaterial: (batchId: string, materialId: string) => void;
  onLeave: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  user, 
  batch: activeBatch, 
  allBatches,
  siteConfig, 
  onUpdateSiteConfig, 
  currentBroadcast, 
  onBroadcast, 
  onAddBatch, 
  onUpdateBatch,
  onAddMaterial,
  onDeleteMaterial,
  onLeave 
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'CLASSROOM' | 'SITE_SETTINGS' | 'MATERIALS'>('CLASSROOM');
  const [isLive, setIsLive] = useState(false);
  const [broadcastInput, setBroadcastInput] = useState('');
  const [showAddBatchModal, setShowAddBatchModal] = useState(false);
  const [editingBatchId, setEditingBatchId] = useState<string | null>(null);
  
  // Site Customization State
  const [tempHero, setTempHero] = useState(siteConfig.heroBanner);
  const [tempTrending, setTempTrending] = useState(siteConfig.trendingBanners.join('\n'));

  // Batch Form State
  const [batchForm, setBatchForm] = useState({
    name: '',
    subject: 'General Science',
    teacher: user.name,
    price: '₹999',
    validity: 'June 2025',
    image: 'https://nexttoppers.com/uploads/banners/1723812833.webp'
  });

  // Material Form State
  const [materialForm, setMaterialForm] = useState({
    title: '',
    category: 'NOTES' as MaterialCategory,
    fileCount: 1,
    batchId: activeBatch.id
  });

  const handleUpdateSite = () => {
    onUpdateSiteConfig({
      heroBanner: tempHero,
      trendingBanners: tempTrending.split('\n').filter(url => url.trim() !== '')
    });
    alert('Banners updated successfully!');
  };

  const submitBatchForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBatchId) {
      const existingBatch = allBatches.find(b => b.id === editingBatchId);
      if (existingBatch) {
        onUpdateBatch({
          ...existingBatch,
          ...batchForm
        });
        alert('Batch updated successfully!');
      }
    } else {
      const newBatch: Batch = {
        id: Date.now().toString(),
        ...batchForm,
        studentsCount: 0,
        nextClass: 'Starting Soon',
        progress: 0,
        tag: 'NEW',
        materials: [],
        createdAt: new Date().toISOString()
      };
      onAddBatch(newBatch);
      alert('New Batch launched!');
    }
    setShowAddBatchModal(false);
    setEditingBatchId(null);
  };

  const handleEditBatchClick = (b: Batch) => {
    setBatchForm({
      name: b.name,
      subject: b.subject,
      teacher: b.teacher,
      price: b.price || '₹999',
      validity: b.validity || 'June 2025',
      image: b.image
    });
    setEditingBatchId(b.id);
    setShowAddBatchModal(true);
  };

  const submitMaterialForm = (e: React.FormEvent) => {
    e.preventDefault();
    const newMaterial: StudyMaterial = {
      id: Date.now().toString(),
      ...materialForm
    };
    onAddMaterial(materialForm.batchId, newMaterial);
    setMaterialForm({ ...materialForm, title: '', fileCount: 1 });
    alert('Material added successfully!');
  };

  const handleDelete = (bId: string, mId: string) => {
    if (confirm('Are you sure you want to delete this material?')) {
      onDeleteMaterial(bId, mId);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Get materials for the selected batch in form
  const selectedBatchMaterials = allBatches.find(b => b.id === materialForm.batchId)?.materials || [];
  const editingBatch = editingBatchId ? allBatches.find(b => b.id === editingBatchId) : null;

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden relative">
      {/* Batch Creation/Edit Modal */}
      {showAddBatchModal && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => { setShowAddBatchModal(false); setEditingBatchId(null); }}></div>
          <form onSubmit={submitBatchForm} className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in duration-300 border border-slate-100 max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">{editingBatchId ? 'Edit Batch' : 'Launch New Batch'}</h2>
            
            {editingBatch && (
              <div className="mb-6 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Recorded On</p>
                <p className="text-sm font-black text-slate-700">{formatDate(editingBatch.createdAt)}</p>
              </div>
            )}

            <div className="space-y-5">
               <div>
                 <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Batch Name</label>
                 <input required value={batchForm.name} onChange={(e) => setBatchForm({...batchForm, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-2xl outline-none focus:border-[#00A79D] font-bold" placeholder="e.g. ABHAY 2.0" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Subject</label>
                   <input value={batchForm.subject} onChange={(e) => setBatchForm({...batchForm, subject: e.target.value})} className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-2xl outline-none font-bold" />
                 </div>
                 <div>
                   <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Pricing</label>
                   <input value={batchForm.price} onChange={(e) => setBatchForm({...batchForm, price: e.target.value})} className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-2xl outline-none font-bold" />
                 </div>
               </div>
               <div>
                 <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Course Banner (URL)</label>
                 <input value={batchForm.image} onChange={(e) => setBatchForm({...batchForm, image: e.target.value})} className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-2xl outline-none font-bold" />
               </div>
               <div>
                 <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Validity</label>
                 <input value={batchForm.validity} onChange={(e) => setBatchForm({...batchForm, validity: e.target.value})} className="w-full bg-slate-50 border border-slate-200 px-5 py-3.5 rounded-2xl outline-none font-bold" />
               </div>
            </div>
            <div className="mt-10 flex gap-4">
              <button type="button" onClick={() => { setShowAddBatchModal(false); setEditingBatchId(null); }} className="flex-1 py-4 font-black text-slate-400 uppercase tracking-widest text-xs">Cancel</button>
              <button type="submit" className="flex-1 bg-[#00A79D] text-white py-4 rounded-2xl font-black shadow-xl shadow-[#00A79D]/20 uppercase tracking-widest text-xs">{editingBatchId ? 'Update' : 'Launch'}</button>
            </div>
          </form>
        </div>
      )}

      {/* Admin Panel Header */}
      <div className="bg-white border-b px-8 py-4 flex items-center justify-between shadow-sm z-[100]">
        <div className="flex items-center gap-6">
          <div className="bg-slate-900 p-2.5 rounded-2xl shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Admin Control Center</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">NextToppers Professional Suite</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          <button 
            onClick={() => setActiveAdminTab('CLASSROOM')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeAdminTab === 'CLASSROOM' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Live
          </button>
          <button 
            onClick={() => setActiveAdminTab('MATERIALS')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeAdminTab === 'MATERIALS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Materials
          </button>
          <button 
            onClick={() => setActiveAdminTab('SITE_SETTINGS')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeAdminTab === 'SITE_SETTINGS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Site
          </button>
        </div>

        <div className="flex items-center gap-4">
           <button onClick={onLeave} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          
          {activeAdminTab === 'CLASSROOM' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                   <div className="flex items-center justify-between mb-8">
                     <h2 className="text-2xl font-black text-slate-900">Push Notification</h2>
                     <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl">📢</div>
                   </div>
                   <div className="flex gap-4">
                      <input 
                        type="text" 
                        value={broadcastInput}
                        onChange={(e) => setBroadcastInput(e.target.value)}
                        placeholder="Say something to all live students..."
                        className="flex-1 bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl outline-none focus:border-blue-500 font-bold"
                      />
                      <button 
                        onClick={() => { onBroadcast(broadcastInput); setBroadcastInput(''); }}
                        className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-200"
                      >
                        Push
                      </button>
                   </div>
                   {currentBroadcast && (
                     <div className="mt-6 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
                        <span className="bg-blue-600 text-white p-1 rounded-md text-[10px] font-black uppercase">Active</span>
                        <p className="text-sm font-bold text-blue-900 italic">"{currentBroadcast}"</p>
                     </div>
                   )}
                </section>

                <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-slate-900">Batch Operations</h2>
                    <button 
                      onClick={() => {
                        setBatchForm({ name: '', subject: 'General Science', teacher: user.name, price: '₹999', validity: 'June 2025', image: 'https://nexttoppers.com/uploads/banners/1723812833.webp' });
                        setEditingBatchId(null);
                        setShowAddBatchModal(true);
                      }}
                      className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-transform"
                    >
                      + Launch New Batch
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {allBatches.map(b => (
                      <div key={b.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between hover:border-slate-300 transition-colors">
                         <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm border border-white">
                               <img src={b.image} className="w-full h-full object-cover" alt={b.name} />
                            </div>
                            <div>
                               <p className="font-black text-slate-800">{b.name}</p>
                               <div className="flex flex-wrap items-center gap-2 mt-0.5">
                                 <span className="text-[10px] font-black text-[#00A79D] uppercase tracking-widest">{b.subject}</span>
                                 <span className="text-[8px] text-slate-300">•</span>
                                 <span className="text-[10px] font-bold text-slate-400 uppercase">{b.price}</span>
                                 <span className="text-[8px] text-slate-300">•</span>
                                 <span className="text-[9px] font-black text-slate-500 uppercase tracking-tight">Created: {formatDate(b.createdAt)}</span>
                               </div>
                            </div>
                         </div>
                         <button 
                           onClick={() => handleEditBatchClick(b)}
                           className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm active:scale-95"
                         >
                           Edit
                         </button>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-10">
                 <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm text-center">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                      {isLive ? '🔴' : '⚪'}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{isLive ? 'LIVE ON AIR' : 'OFFLINE'}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Currently managing {activeBatch.name}</p>
                    <button 
                      onClick={() => setIsLive(!isLive)}
                      className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                        isLive ? 'bg-red-500 text-white shadow-xl shadow-red-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isLive ? 'End Session' : 'Start Stream'}
                    </button>
                 </section>
              </div>
            </div>
          ) : activeAdminTab === 'MATERIALS' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40">
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-14 h-14 bg-indigo-50 rounded-[1.5rem] flex items-center justify-center text-3xl">📁</div>
                   <div>
                     <h2 className="text-3xl font-black text-slate-900 tracking-tight">Add Study Material</h2>
                     <p className="text-slate-500 font-medium">Link new resources to any batch</p>
                   </div>
                </div>

                <form onSubmit={submitMaterialForm} className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Select Target Batch</label>
                    <select 
                      value={materialForm.batchId}
                      onChange={(e) => setMaterialForm({...materialForm, batchId: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-2xl font-bold text-sm outline-none"
                    >
                      {allBatches.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Material Title</label>
                    <input 
                      required 
                      value={materialForm.title} 
                      onChange={(e) => setMaterialForm({...materialForm, title: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-2xl font-bold text-sm outline-none focus:border-indigo-500"
                      placeholder="e.g. Newton's Laws Part 1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Category</label>
                      <select 
                        value={materialForm.category}
                        onChange={(e) => setMaterialForm({...materialForm, category: e.target.value as MaterialCategory})}
                        className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-2xl font-bold text-sm outline-none"
                      >
                        <option value="NOTES">Handwritten Notes</option>
                        <option value="DPP">DPP Sheets</option>
                        <option value="TEST">Test Series</option>
                        <option value="PYQ">PYQ Archive</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">File Count</label>
                      <input 
                        type="number"
                        min="1"
                        value={materialForm.fileCount}
                        onChange={(e) => setMaterialForm({...materialForm, fileCount: parseInt(e.target.value)})}
                        className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-2xl font-bold text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 hover:scale-[1.02] transition-transform"
                    >
                      Publish to Library
                    </button>
                  </div>
                </form>
              </section>

              <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col max-h-[600px]">
                <div className="px-2 mb-6">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Batch Library Preview</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Viewing materials for {allBatches.find(b => b.id === materialForm.batchId)?.name}</p>
                </div>
                
                <div className="space-y-4 overflow-y-auto pr-2 flex-1">
                  {selectedBatchMaterials.length > 0 ? (
                    selectedBatchMaterials.map((m) => (
                      <div key={m.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-2xl">
                               {m.category === 'NOTES' ? '📝' : m.category === 'DPP' ? '🧪' : m.category === 'TEST' ? '📊' : '📚'}
                            </div>
                            <div>
                               <p className="font-bold text-slate-800 text-sm leading-tight">{m.title}</p>
                               <p className="text-[10px] font-black text-slate-400 mt-0.5">{m.fileCount} FILES • {m.category}</p>
                            </div>
                         </div>
                         <button 
                            onClick={() => handleDelete(materialForm.batchId, m.id)}
                            className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                          >
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                         </button>
                      </div>
                    ))
                  ) : (
                    <div className="py-20 text-center opacity-30 flex flex-col items-center">
                       <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                       <p className="mt-4 font-bold text-sm uppercase tracking-widest">No materials found in this batch</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-10 max-w-4xl mx-auto">
              <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40">
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-14 h-14 bg-amber-50 rounded-[1.5rem] flex items-center justify-center text-3xl">🎨</div>
                   <div>
                     <h2 className="text-3xl font-black text-slate-900 tracking-tight">Banner Management</h2>
                     <p className="text-slate-500 font-medium">Customize landing page visuals in real-time</p>
                   </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 mb-3 block tracking-widest">Hero Carousel Image</label>
                    <div className="flex gap-4">
                      <input 
                        type="text" 
                        value={tempHero} 
                        onChange={(e) => setTempHero(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl font-bold text-sm outline-none focus:border-[#00A79D]"
                      />
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                        <img src={tempHero} className="w-full h-full object-cover" alt="Preview" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 mb-3 block tracking-widest">Trending Course Banners (One URL per line)</label>
                    <textarea 
                      rows={6}
                      value={tempTrending}
                      onChange={(e) => setTempTrending(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl font-bold text-sm outline-none focus:border-[#00A79D] resize-none"
                      placeholder="Enter image URLs here..."
                    />
                  </div>

                  <div className="pt-6">
                    <button 
                      onClick={handleUpdateSite}
                      className="w-full py-5 bg-[#00A79D] text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-[#00A79D]/30 hover:scale-[1.02] transition-transform active:scale-95"
                    >
                      Save & Publish Changes
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
