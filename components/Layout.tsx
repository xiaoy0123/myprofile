import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Image, MapPin, FileText, BookOpen, Menu, X, Lock, LogOut, Download, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { isAdmin, logout } = useAuth();
  const { exportDataAsTypeScript } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const handleExport = () => {
      const code = exportDataAsTypeScript();
      navigator.clipboard.writeText(code).then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
          alert("代码已复制到剪贴板！\n\n请打开您的 'constants.tsx' 文件，全选并粘贴覆盖原有内容，然后提交代码即可发布更新。");
      });
  };

  const navItems = [
    { name: '首页', path: '/', icon: Home },
    { name: '照片墙', path: '/photos', icon: Image },
    { name: '旅行足迹', path: '/travel', icon: MapPin },
    { name: '个人履历', path: '/resume', icon: FileText },
    { name: '日志', path: '/blog', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-apple-900 selection:bg-apple-900 selection:text-white relative">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled || isMobileMenuOpen
            ? 'bg-white/70 backdrop-blur-xl border-white/20 shadow-sm'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <NavLink to="/" className="text-xl font-semibold tracking-tight hover:opacity-70 transition-opacity">
            Xiangbo<span className="text-apple-400">.Design</span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-300 hover:text-apple-900 ${
                    isActive ? 'text-apple-900' : 'text-apple-500'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            {/* Admin status indicator */}
            {isAdmin && (
                <button 
                    onClick={() => { logout(); navigate('/'); }}
                    className="flex items-center space-x-1 text-xs px-3 py-1 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors"
                >
                    <LogOut size={12} />
                    <span>退出管理</span>
                </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-apple-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden absolute w-full bg-white/95 backdrop-blur-2xl border-b border-apple-200 transition-all duration-500 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 py-2 text-lg font-medium ${
                    isActive ? 'text-apple-900' : 'text-apple-400'
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            ))}
            {isAdmin && (
                <button 
                    onClick={() => { logout(); navigate('/'); }}
                    className="flex items-center space-x-3 py-2 text-lg font-medium text-red-500"
                >
                    <LogOut size={20} />
                    <span>退出管理模式</span>
                </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-16 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/40 backdrop-blur-md py-12 border-t border-white/20 mt-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-apple-400 text-sm">
            © {new Date().getFullYear()} 宁相博 (Ning Xiangbo). All rights reserved.
          </p>
          <div className="text-apple-300 text-xs mt-2 flex items-center justify-center gap-2">
            <span>Designed with <span className="text-red-300">♥</span> & React.</span>
            
            {/* Hidden Login Trigger */}
            {!isAdmin ? (
                <button onClick={() => navigate('/login')} className="opacity-20 hover:opacity-100 transition-opacity" title="Admin Login">
                    <Lock size={10} />
                </button>
            ) : (
                <div className="flex items-center gap-4 bg-white/50 px-4 py-2 rounded-full border border-apple-100 shadow-sm">
                    <span className="text-green-500 font-medium text-[10px] uppercase tracking-wide">Admin Active</span>
                    
                    {/* Export Button */}
                    <button 
                        onClick={handleExport} 
                        className="flex items-center gap-1 text-apple-600 hover:text-apple-900 transition-colors"
                        title="导出修改后的代码"
                    >
                        {isCopied ? <Check size={12} className="text-green-500"/> : <Download size={12} />}
                        <span className="text-[10px] font-medium">{isCopied ? '已复制!' : '导出代码'}</span>
                    </button>
                </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;