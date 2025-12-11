import React, { useMemo, useState, useRef } from 'react';
import { useData, readFileAsDataURL, confirmDelete } from '../context/DataContext';
import { MapPin, Calendar, Plus, Edit2, Check, X, Trash2 } from 'lucide-react';
import { Photo } from '../types';
import { useAuth } from '../context/AuthContext';

const PhotoWall: React.FC = () => {
  const { photos, addPhoto, updatePhoto, deletePhoto } = useData();
  const { isAdmin } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Edit State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Photo>>({});

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = await readFileAsDataURL(file);
      const newPhoto: Photo = {
        id: Date.now(),
        url,
        title: "未命名",
        category: "生活",
        date: new Date().toISOString().split('T')[0],
        location: "未知"
      };
      addPhoto(newPhoto);
    }
  };

  const startEdit = (photo: Photo) => {
    setEditingId(photo.id);
    setEditForm(photo);
  };

  const saveEdit = (id: number) => {
    updatePhoto(id, editForm);
    setEditingId(null);
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
      e.stopPropagation();
      if (confirmDelete()) {
          deletePhoto(id);
      }
  };

  const groupedPhotos = useMemo(() => {
    const sorted = [...photos].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    const groups: { [key: string]: Photo[] } = {};
    sorted.forEach(photo => {
      const year = new Date(photo.date).getFullYear().toString();
      if (!groups[year]) groups[year] = [];
      groups[year].push(photo);
    });
    
    return Object.entries(groups).sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [photos]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      <div className="text-center mb-16 space-y-4 relative">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-apple-900">照片墙</h1>
        <p className="text-apple-500 max-w-2xl mx-auto">
          记录生活、旅行与视角的每一个瞬间。
        </p>
        
        {/* Upload Button - Admin Only */}
        {isAdmin && (
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute top-0 right-0 p-3 bg-apple-900 text-white rounded-full hover:bg-apple-500 transition-colors shadow-lg"
                title="上传照片"
            >
                <Plus size={24} />
            </button>
        )}
        <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleUpload} 
        />
      </div>

      <div className="space-y-16">
        {groupedPhotos.map(([year, yearPhotos]) => (
          <div key={year} className="space-y-8 animate-slide-up">
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-apple-300">{year}</span>
              <div className="h-px bg-apple-200 flex-grow"></div>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {yearPhotos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 bg-white"
                >
                  <img 
                    src={photo.url} 
                    alt={photo.title} 
                    className="w-full h-auto object-cover" 
                  />
                  
                  {/* Edit Overlay */}
                  <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 flex flex-col justify-between p-6 ${editingId === photo.id ? 'opacity-100 z-20' : 'opacity-0 group-hover:opacity-100'}`}>
                      
                      {/* Top Actions - Admin Only */}
                      <div className="flex justify-end space-x-2">
                        {isAdmin && (
                            <>
                                {editingId === photo.id ? (
                                    <>
                                        <button onClick={() => saveEdit(photo.id)} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"><Check size={16} /></button>
                                        <button onClick={() => setEditingId(null)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"><X size={16} /></button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => startEdit(photo)} className="p-2 bg-white/20 text-white rounded-full hover:bg-white/40"><Edit2 size={16} /></button>
                                        <button onClick={(e) => handleDelete(e, photo.id)} className="p-2 bg-white/20 text-white rounded-full hover:bg-red-500/80"><Trash2 size={16} /></button>
                                    </>
                                )}
                            </>
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                          {editingId === photo.id ? (
                              <div className="space-y-2 text-sm">
                                  <input 
                                    className="w-full bg-white/20 text-white px-2 py-1 rounded placeholder-white/50" 
                                    placeholder="标题" 
                                    value={editForm.title || ''} 
                                    onChange={e => setEditForm({...editForm, title: e.target.value})}
                                  />
                                   <input 
                                    className="w-full bg-white/20 text-white px-2 py-1 rounded placeholder-white/50" 
                                    placeholder="分类" 
                                    value={editForm.category || ''} 
                                    onChange={e => setEditForm({...editForm, category: e.target.value})}
                                  />
                                  <div className="flex gap-2">
                                     <input 
                                        type="date"
                                        className="w-full bg-white/20 text-white px-2 py-1 rounded" 
                                        value={editForm.date || ''} 
                                        onChange={e => setEditForm({...editForm, date: e.target.value})}
                                    />
                                    <input 
                                        className="w-full bg-white/20 text-white px-2 py-1 rounded placeholder-white/50" 
                                        placeholder="地点" 
                                        value={editForm.location || ''} 
                                        onChange={e => setEditForm({...editForm, location: e.target.value})}
                                    />
                                  </div>
                              </div>
                          ) : (
                              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-xs font-medium uppercase tracking-wider text-white/70 mb-2">{photo.category}</p>
                                <h3 className="text-xl font-semibold text-white mb-2">{photo.title}</h3>
                                
                                <div className="flex items-center space-x-4 text-white/80 text-xs mt-3 border-t border-white/20 pt-3">
                                    <div className="flex items-center space-x-1">
                                        <Calendar size={12} />
                                        <span>{photo.date}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <MapPin size={12} />
                                        <span>{photo.location}</span>
                                    </div>
                                </div>
                              </div>
                          )}
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoWall;