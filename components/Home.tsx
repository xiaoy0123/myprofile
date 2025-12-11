import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, GraduationCap, Edit2, Camera, Check, X as XIcon, User, Instagram, Smartphone, Sliders } from 'lucide-react';
import { useData, readFileAsDataURL } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { profile, updateProfile } = useData();
  const { isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showBlurControl, setShowBlurControl] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  
  const [editForm, setEditForm] = useState(profile);

  const handleAvatarClick = () => {
    if (isEditing) avatarInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = await readFileAsDataURL(e.target.files[0]);
      updateProfile({ avatar: url });
      setEditForm(prev => ({ ...prev, avatar: url }));
    }
  };

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = await readFileAsDataURL(e.target.files[0]);
      updateProfile({ coverImage: url });
    }
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const url = await readFileAsDataURL(e.target.files[0]);
        updateProfile({ universityLogo: url });
    }
  };

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  // Default blur value if not set
  const currentBlur = profile.backgroundBlur !== undefined ? profile.backgroundBlur : 40;

  return (
    <div className="animate-fade-in relative min-h-screen pb-12">
      
      {/* 1. Full Screen Background */}
      <div className="fixed inset-0 z-0">
        <img
          src={profile.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Dynamic Blur Overlay */}
        <div 
            className="absolute inset-0 bg-white/40 transition-all duration-300"
            style={{ 
                backdropFilter: `blur(${currentBlur}px)`,
                WebkitBackdropFilter: `blur(${currentBlur}px)`
            }} 
        />
        
        {isAdmin && (
            <div className="absolute top-24 right-6 z-20 flex flex-col gap-3">
                <button 
                    onClick={() => coverInputRef.current?.click()}
                    className="p-2 bg-black/20 text-white rounded-full hover:bg-black/40 transition-colors backdrop-blur-md shadow-sm"
                    title="更换全屏背景"
                >
                    <Camera size={20} />
                </button>
                <button 
                    onClick={() => setShowBlurControl(!showBlurControl)}
                    className={`p-2 rounded-full transition-colors backdrop-blur-md shadow-sm ${showBlurControl ? 'bg-white text-apple-900' : 'bg-black/20 text-white hover:bg-black/40'}`}
                    title="调节背景虚化"
                >
                    <Sliders size={20} />
                </button>

                {/* Blur Slider Popup */}
                {showBlurControl && (
                    <div className="absolute top-0 right-12 bg-white/80 backdrop-blur-xl p-4 rounded-xl border border-white/50 shadow-lg w-64 animate-fade-in origin-right">
                         <div className="flex justify-between items-center mb-2">
                             <label className="text-xs font-semibold text-apple-900">背景虚化程度</label>
                             <span className="text-xs font-mono text-apple-500">{currentBlur}px</span>
                         </div>
                         <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={currentBlur} 
                            onChange={(e) => updateProfile({ backgroundBlur: parseInt(e.target.value) })}
                            className="w-full h-1 bg-apple-200 rounded-lg appearance-none cursor-pointer accent-apple-900"
                        />
                    </div>
                )}
            </div>
        )}
        <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={handleCoverChange} />
      </div>

      {/* Main Grid Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* --- ROW 1: PERSONAL PROFILE (Full Width) --- */}
          <div className="md:col-span-2 relative group/card">
            <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-[2.5rem] p-8 md:p-12 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
                
                {/* Admin Edit Controls */}
                {isAdmin && (
                    <div className="absolute top-6 right-6 z-30 flex gap-2">
                         <button 
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`p-2 rounded-full transition-all duration-300 shadow-sm ${isEditing ? 'bg-green-500 text-white' : 'bg-white text-apple-500 hover:text-apple-900'}`}
                        >
                            {isEditing ? <Check size={18} /> : <Edit2 size={18} />}
                        </button>
                        {isEditing && (
                            <button onClick={handleCancel} className="p-2 rounded-full bg-red-500 text-white shadow-sm">
                                <XIcon size={18} />
                            </button>
                        )}
                    </div>
                )}

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 relative z-10">
                    
                    {/* Avatar Section */}
                    <div className="flex-shrink-0 relative group/avatar">
                        <div 
                            className={`w-40 h-40 md:w-56 md:h-56 rounded-full p-1 bg-white/80 shadow-xl ${isEditing ? 'cursor-pointer' : ''}`}
                            onClick={handleAvatarClick}
                        >
                            <img src={isEditing ? editForm.avatar : profile.avatar} alt={profile.name} className="w-full h-full rounded-full object-cover" />
                        </div>
                        {isEditing && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full pointer-events-none">
                                <Camera className="text-white" size={32}/>
                            </div>
                        )}
                        <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
                    </div>

                    {/* Info Section */}
                    <div className="flex-grow text-center md:text-left space-y-6 w-full">
                        <div>
                            {isEditing ? (
                                <div className="space-y-2">
                                    <input className="text-4xl font-bold bg-white/50 border rounded px-2 w-full md:w-auto" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} placeholder="姓名" />
                                    <input className="block text-xl text-apple-500 bg-white/50 border rounded px-2 w-full md:w-auto" value={editForm.major} onChange={e => setEditForm({...editForm, major: e.target.value})} placeholder="专业" />
                                </div>
                            ) : (
                                <>
                                    <h1 className="text-4xl md:text-6xl font-bold text-apple-900 tracking-tight">{profile.name}</h1>
                                    <p className="text-xl md:text-2xl text-apple-500 mt-2 font-light">{profile.major}</p>
                                </>
                            )}
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-apple-600">
                             <div className="flex items-center justify-center md:justify-start gap-3 p-3 bg-white/40 rounded-xl">
                                <GraduationCap size={20} className="text-apple-400"/>
                                {isEditing ? <input className="bg-transparent border-b w-full" value={editForm.university} onChange={e => setEditForm({...editForm, university: e.target.value})} /> : <span>{profile.university}</span>}
                             </div>
                             <div className="flex items-center justify-center md:justify-start gap-3 p-3 bg-white/40 rounded-xl">
                                <MapPin size={20} className="text-apple-400"/>
                                {isEditing ? <input className="bg-transparent border-b w-full" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} /> : <span>{profile.location}</span>}
                             </div>
                             <div className="flex items-center justify-center md:justify-start gap-3 p-3 bg-white/40 rounded-xl">
                                <User size={20} className="text-apple-400"/>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <input className="bg-transparent border-b w-16" value={editForm.gender} onChange={e => setEditForm({...editForm, gender: e.target.value})} placeholder="性别"/>
                                        <input className="bg-transparent border-b w-full" value={editForm.hometown} onChange={e => setEditForm({...editForm, hometown: e.target.value})} placeholder="籍贯"/>
                                    </div>
                                ) : (
                                    <span>{profile.gender} | {profile.hometown}</span>
                                )}
                             </div>
                             <div className="flex items-center justify-center md:justify-start gap-3 p-3 bg-white/40 rounded-xl">
                                <Mail size={20} className="text-apple-400"/>
                                {isEditing ? <input className="bg-transparent border-b w-full" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} /> : <span className="truncate">{profile.email}</span>}
                             </div>
                        </div>

                        {/* Socials */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                            {isEditing ? (
                                <div className="space-y-2 w-full">
                                    <input className="w-full text-xs p-1 border rounded" value={editForm.socials.douyin} onChange={e => setEditForm({...editForm, socials: {...editForm.socials, douyin: e.target.value}})} placeholder="抖音号" />
                                    <input className="w-full text-xs p-1 border rounded" value={editForm.socials.xiaohongshu} onChange={e => setEditForm({...editForm, socials: {...editForm.socials, xiaohongshu: e.target.value}})} placeholder="小红书号" />
                                    <input className="w-full text-xs p-1 border rounded" value={editForm.socials.instagram} onChange={e => setEditForm({...editForm, socials: {...editForm.socials, instagram: e.target.value}})} placeholder="Instagram" />
                                </div>
                            ) : (
                                <>
                                    {profile.socials.douyin && <span className="px-3 py-1 bg-black text-white text-xs rounded-full flex items-center gap-1"><Smartphone size={12}/> 抖音: {profile.socials.douyin}</span>}
                                    {profile.socials.xiaohongshu && <span className="px-3 py-1 bg-red-500 text-white text-xs rounded-full flex items-center gap-1">小红书: {profile.socials.xiaohongshu}</span>}
                                    {profile.socials.instagram && <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-orange-500 text-white text-xs rounded-full flex items-center gap-1"><Instagram size={12}/> {profile.socials.instagram}</span>}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                 {/* Decorative University Logo (Absolute) */}
                 <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12 pointer-events-none">
                    <img src={profile.universityLogo} alt="Logo" className="w-96 h-96 object-contain grayscale" />
                 </div>
                 {isEditing && isAdmin && (
                    <button onClick={() => logoInputRef.current?.click()} className="absolute bottom-4 right-4 text-xs bg-white/80 px-2 py-1 rounded shadow z-30">更新校徽</button>
                 )}
                 <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={handleLogoChange} />
            </div>
          </div>

          {/* --- ROW 2: PHOTO WALL (Half) & TRAVEL (Half) --- */}
          
          {/* Photos */}
          <Link to="/photos" className="group relative h-80 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
             <img src="https://picsum.photos/id/16/800/800" alt="Photos" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
             <div className="absolute bottom-0 left-0 p-8 w-full">
               <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">照片墙</h2>
                    <p className="text-white/80 text-sm">定格美好瞬间</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                      <ArrowRight size={20} />
                  </div>
               </div>
             </div>
          </Link>

          {/* Travel */}
          <Link to="/travel" className="group relative h-80 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
             <img src="https://picsum.photos/id/28/800/800" alt="Travel" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
             <div className="absolute bottom-0 left-0 p-8 w-full">
               <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">旅行足迹</h2>
                    <p className="text-white/80 text-sm">丈量世界的宽广</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                      <MapPin size={20} />
                  </div>
               </div>
             </div>
          </Link>

          {/* --- ROW 3: RESUME (Half, Flat) & BLOG (Half, Flat) --- */}

          {/* Resume */}
          <Link to="/resume" className="group relative h-48 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[2.5rem] p-8 hover:bg-white/90 transition-all shadow-sm hover:shadow-lg flex flex-col justify-between">
              <div className="flex justify-between items-start">
                  <div className="p-3 bg-apple-900 text-white rounded-2xl">
                    <GraduationCap size={24} />
                  </div>
                  <ArrowRight className="text-apple-300 group-hover:text-apple-900 transition-colors" />
              </div>
              <div>
                  <h2 className="text-2xl font-bold text-apple-900">个人履历</h2>
                  <p className="text-apple-500 text-sm mt-1">教育背景与职业经历</p>
              </div>
          </Link>

          {/* Blog */}
          <Link to="/blog" className="group relative h-48 bg-white/70 backdrop-blur-xl border border-white/50 rounded-[2.5rem] p-8 hover:bg-white/90 transition-all shadow-sm hover:shadow-lg flex flex-col justify-between">
              <div className="flex justify-between items-start">
                  <div className="p-3 bg-orange-500 text-white rounded-2xl">
                    <Edit2 size={24} />
                  </div>
                  <ArrowRight className="text-apple-300 group-hover:text-orange-500 transition-colors" />
              </div>
              <div>
                  <h2 className="text-2xl font-bold text-apple-900">个人日志</h2>
                  <p className="text-apple-500 text-sm mt-1">生活随笔与技术分享</p>
              </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Home;