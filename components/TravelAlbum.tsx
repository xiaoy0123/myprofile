import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData, readFileAsDataURL, confirmDelete } from '../context/DataContext';
import { ArrowLeft, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const TravelAlbum: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { travelLogs, addTravelPhoto, setTravelCover, deleteTravelPhoto } = useData();
  const { isAdmin } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const trip = travelLogs.find(t => t.id === Number(id));

  if (!trip) return <div className="p-10 text-center">行程不存在</div>;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = await readFileAsDataURL(e.target.files[0]);
      addTravelPhoto(trip.id, {
          id: Date.now(),
          url,
          title: "Trip Photo",
          category: "Travel",
          date: new Date().toISOString().split('T')[0],
          location: trip.location
      });
    }
  };

  const handleDelete = (e: React.MouseEvent, photoId: number) => {
      e.stopPropagation();
      if (confirmDelete()) {
          deleteTravelPhoto(trip.id, photoId);
      }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-fade-in">
        <button onClick={() => navigate('/travel')} className="flex items-center text-apple-500 hover:text-apple-900 mb-8 transition-colors">
            <ArrowLeft size={20} className="mr-2" /> 返回行程列表
        </button>

        <div className="flex justify-between items-end mb-12 border-b border-apple-200 pb-8">
            <div>
                <span className="text-apple-500 font-medium">{trip.year}</span>
                <h1 className="text-4xl font-bold text-apple-900 mt-1">{trip.location} 相册</h1>
            </div>
            
            {/* Upload - Admin Only */}
            {isAdmin && (
                <>
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center px-4 py-2 bg-apple-900 text-white rounded-lg hover:bg-apple-700 transition-colors"
                    >
                        <Upload size={18} className="mr-2" /> 上传照片
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
                </>
            )}
        </div>

        {trip.photos.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-apple-300 text-apple-400">
                <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                <p>相册空空如也。</p>
                {isAdmin && <button onClick={() => fileInputRef.current?.click()} className="mt-4 text-apple-600 underline">上传美好回忆</button>}
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {trip.photos.map(photo => (
                    <div key={photo.id} className="group relative rounded-xl overflow-hidden shadow-sm aspect-square bg-white">
                        <img src={photo.url} alt="Trip" className="w-full h-full object-cover" />
                        
                        {/* Admin Controls */}
                        {isAdmin && (
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                                <button 
                                    onClick={() => setTravelCover(trip.id, photo.url)}
                                    className="px-3 py-1 bg-white/20 hover:bg-white text-white hover:text-black rounded-full text-xs font-medium backdrop-blur-sm transition-all"
                                >
                                    设为封面
                                </button>
                                <button
                                    onClick={(e) => handleDelete(e, photo.id)}
                                    className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-all"
                                    title="删除照片"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default TravelAlbum;