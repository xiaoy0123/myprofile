import React, { useState } from 'react';
import { useData, confirmDelete } from '../context/DataContext';
import { Clock, ArrowUpRight, Plus, Edit2, Check, X, Trash2 } from 'lucide-react';
import { BlogPost } from '../types';
import { useAuth } from '../context/AuthContext';

const BlogList: React.FC = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useData();
  const { isAdmin } = useAuth();
  
  // State
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const initialForm: BlogPost = { id: 0, title: '', category: '', excerpt: '', date: new Date().toLocaleDateString(), readTime: '5 min' };
  const [formData, setFormData] = useState<BlogPost>(initialForm);

  const handleAdd = () => {
      addBlogPost({ ...formData, id: Date.now() });
      setIsAdding(false);
      setFormData(initialForm);
  };

  const startEdit = (post: BlogPost) => {
      setEditingId(post.id);
      setFormData(post);
  };

  const handleUpdate = (id: number) => {
      updateBlogPost(id, formData);
      setEditingId(null);
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
      e.stopPropagation();
      if (confirmDelete()) {
          deleteBlogPost(id);
      }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-fade-in">
       <div className="text-center mb-16 space-y-4 relative">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-apple-900">个人日志</h1>
        <p className="text-apple-500 max-w-2xl mx-auto">
          关于设计、技术与生活的思考。
        </p>
        
        {/* Admin Only */}
        {isAdmin && (
            <button 
                onClick={() => setIsAdding(true)}
                className="absolute top-0 right-0 p-3 bg-apple-900 text-white rounded-full hover:bg-apple-500 transition-colors shadow-lg"
                title="写文章"
            >
                <Plus size={24} />
            </button>
        )}
      </div>

      {isAdding && isAdmin && (
          <div className="mb-8 p-6 bg-white border border-apple-200 rounded-2xl shadow-sm space-y-4 animate-slide-up">
              <input className="w-full p-2 border rounded" placeholder="标题" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <div className="flex gap-2">
                 <input className="flex-1 p-2 border rounded" placeholder="分类" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                 <input className="w-32 p-2 border rounded" placeholder="阅读时长" value={formData.readTime} onChange={e => setFormData({...formData, readTime: e.target.value})} />
              </div>
              <textarea className="w-full p-2 border rounded" rows={3} placeholder="摘要" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
              <div className="flex justify-end gap-2">
                  <button onClick={() => setIsAdding(false)} className="px-3 py-1 text-sm">取消</button>
                  <button onClick={handleAdd} className="px-3 py-1 bg-apple-900 text-white rounded text-sm">发布</button>
              </div>
          </div>
      )}

      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <article 
            key={post.id} 
            className="group relative bg-white rounded-3xl p-8 border border-apple-100 shadow-sm hover:shadow-xl hover:border-apple-200 transition-all duration-300"
          >
             {/* Edit Controls - Admin Only */}
             {isAdmin && (
                 <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                     {editingId === post.id ? (
                         <>
                            <button onClick={() => handleUpdate(post.id)} className="p-2 bg-green-500 text-white rounded-full"><Check size={14} /></button>
                            <button onClick={() => setEditingId(null)} className="p-2 bg-red-500 text-white rounded-full"><X size={14} /></button>
                         </>
                     ) : (
                         <>
                             <button onClick={() => startEdit(post)} className="p-2 bg-apple-100 text-apple-600 rounded-full hover:bg-white"><Edit2 size={14} /></button>
                             <button onClick={(e) => handleDelete(e, post.id)} className="p-2 bg-apple-100 text-red-500 rounded-full hover:bg-white"><Trash2 size={14} /></button>
                         </>
                     )}
                 </div>
             )}

            {editingId === post.id ? (
                <div className="space-y-3">
                    <div className="flex gap-2">
                         <input className="w-32 text-xs p-1 border rounded" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                    </div>
                    <input className="w-full text-2xl font-bold p-1 border rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                    <textarea className="w-full p-1 border rounded" rows={3} value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-start mb-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-apple-50 text-apple-500 text-xs font-semibold uppercase tracking-wide">
                            {post.category}
                        </span>
                        <ArrowUpRight className="text-apple-300 group-hover:text-apple-900 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={20} />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-apple-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {post.title}
                    </h2>
                    
                    <p className="text-apple-500 leading-relaxed mb-6">
                        {post.excerpt}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs font-medium text-apple-400">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 rounded-full bg-apple-300"></span>
                        <div className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogList;