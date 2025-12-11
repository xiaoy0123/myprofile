import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData, confirmDelete } from '../context/DataContext';
import { MapPin, Calendar, Plus, Edit2, Check, X, Trash2 } from 'lucide-react';
import { TravelItem } from '../types';
import { useAuth } from '../context/AuthContext';

const TravelLog: React.FC = () => {
  const { travelLogs, addTravelLog, updateTravelLog, deleteTravelLog } = useData();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // State for adding new trip
  const [isAdding, setIsAdding] = useState(false);
  const [newTrip, setNewTrip] = useState<Partial<TravelItem>>({ year: new Date().getFullYear().toString(), photos: [] });

  // State for editing
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<TravelItem>>({});

  const handleAddTrip = () => {
    if (newTrip.location && newTrip.year) {
        addTravelLog({
            id: Date.now(),
            year: newTrip.year,
            location: newTrip.location,
            description: newTrip.description || "",
            imageUrl: "https://picsum.photos/800/600?grayscale", // Default placeholder
            photos: []
        });
        setIsAdding(false);
        setNewTrip({ year: new Date().getFullYear().toString(), photos: [] });
    }
  };

  const startEdit = (trip: TravelItem) => {
    setEditingId(trip.id);
    setEditForm(trip);
  };

  const saveEdit = (id: number) => {
    updateTravelLog(id, editForm);
    setEditingId(null);
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
      e.stopPropagation();
      if (confirmDelete()) {
          deleteTravelLog(id);
      }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
       <div className="text-center mb-16 space-y-4 relative">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-apple-900">旅行足迹</h1>
        <p className="text-apple-500 max-w-2xl mx-auto">
          探索世界，丈量每一座城市。
        </p>
        
        {/* Add Button - Admin Only */}
        {isAdmin && (
            <button 
                onClick={() => setIsAdding(true)}
                className="absolute top-0 right-0 p-3 bg-apple-900 text-white rounded-full hover:bg-apple-500 transition-colors shadow-lg"
                title="新增行程"
            >
                <Plus size={24} />
            </button>
        )}
      </div>

      {/* Add Trip Form */}
      {isAdding && isAdmin && (
          <div className="mb-12 p-6 bg-white rounded-2xl border border-apple-200 shadow-sm animate-slide-up">
              <h3 className="text-lg font-semibold mb-4">新增行程</h3>
              <div className="grid gap-4">
                  <div className="flex gap-4">
                      <input 
                        className="w-24 p-2 border rounded-lg bg-apple-50" 
                        placeholder="年份" 
                        value={newTrip.year} 
                        onChange={e => setNewTrip({...newTrip, year: e.target.value})}
                      />
                      <input 
                        className="flex-1 p-2 border rounded-lg bg-apple-50" 
                        placeholder="地点 (城市, 国家)" 
                        value={newTrip.location} 
                        onChange={e => setNewTrip({...newTrip, location: e.target.value})}
                      />
                  </div>
                  <textarea 
                    className="w-full p-2 border rounded-lg bg-apple-50" 
                    placeholder="描述" 
                    rows={3}
                    value={newTrip.description}
                    onChange={e => setNewTrip({...newTrip, description: e.target.value})}
                  />
                  <div className="flex justify-end gap-2">
                      <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-apple-500">取消</button>
                      <button onClick={handleAddTrip} className="px-4 py-2 bg-apple-900 text-white rounded-lg">添加</button>
                  </div>
              </div>
          </div>
      )}

      <div className="relative border-l-2 border-apple-200 ml-4 md:ml-0 space-y-12 md:space-y-24">
        {travelLogs.map((item) => (
          <div key={item.id} className="relative md:pl-12 pl-8 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-apple-300 group-hover:border-apple-900 transition-colors duration-300" />
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-3 relative group/text">
                 {/* Edit Controls - Moved inside to avoid overflow clipping - Admin Only */}
                 {isAdmin && (
                     <div className="absolute right-0 top-0 opacity-0 group-hover/text:opacity-100 transition-opacity flex gap-1 z-10">
                        {editingId === item.id ? (
                            <>
                                <button onClick={() => saveEdit(item.id)} className="p-1.5 bg-green-500 text-white rounded-full"><Check size={14} /></button>
                                <button onClick={() => setEditingId(null)} className="p-1.5 bg-red-500 text-white rounded-full"><X size={14} /></button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => startEdit(item)} className="p-1.5 bg-apple-100 hover:bg-apple-200 text-apple-600 rounded-full"><Edit2 size={14} /></button>
                                <button onClick={(e) => handleDelete(e, item.id)} className="p-1.5 bg-apple-100 hover:bg-apple-200 text-red-500 rounded-full"><Trash2 size={14} /></button>
                            </>
                        )}
                     </div>
                 )}

                 {editingId === item.id ? (
                    <div className="space-y-2">
                         <div className="flex gap-2">
                             <input className="w-20 p-1 border rounded" value={editForm.year} onChange={e => setEditForm({...editForm, year: e.target.value})} />
                             <input className="flex-1 p-1 border rounded" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} />
                         </div>
                         <textarea className="w-full p-1 border rounded" rows={3} value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
                    </div>
                 ) : (
                    <>
                        <div className="flex items-center space-x-2 text-apple-500 text-sm font-medium uppercase tracking-wide">
                            <Calendar size={14} />
                            <span>{item.year}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-apple-900 pr-16">{item.location}</h2>
                        <p className="text-apple-500 leading-relaxed text-lg">{item.description}</p>
                    </>
                 )}
              </div>
              
              <div 
                className="w-full md:w-64 h-48 rounded-2xl overflow-hidden shadow-md shrink-0 cursor-pointer relative group/img"
                onClick={() => navigate(`/travel/${item.id}`)}
              >
                 <img src={item.imageUrl || "https://picsum.photos/400/300"} alt={item.location} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                 <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                    查看相册
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelLog;