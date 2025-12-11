import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000); // Reset error animation
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-sm p-8 bg-white/80 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-xl text-center">
        <div className="w-16 h-16 bg-apple-100 rounded-full flex items-center justify-center mx-auto mb-6 text-apple-500">
            <Lock size={32} />
        </div>
        
        <h2 className="text-2xl font-bold text-apple-900 mb-2">管理员登录</h2>
        <p className="text-apple-500 text-sm mb-8">请输入密码以编辑网站内容</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`w-full px-4 py-3 bg-apple-50 border ${error ? 'border-red-400 bg-red-50' : 'border-apple-200 focus:border-apple-400'} rounded-xl outline-none transition-all duration-300`}
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex items-center justify-center py-3 bg-apple-900 text-white rounded-xl hover:bg-apple-800 transition-colors font-medium"
          >
            进入系统 <ArrowRight size={16} className="ml-2" />
          </button>
        </form>
        
        {error && (
            <p className="mt-4 text-xs text-red-500 font-medium animate-pulse">密码错误，请重试</p>
        )}
      </div>
    </div>
  );
};

export default Login;