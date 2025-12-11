import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  // Optional: Persist login state across reloads (Session storage is safer than Local storage for this)
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('is_admin');
    if (sessionAuth === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (password: string): boolean => {
    // In a real app, verify against a server. 
    // For a static portfolio, checking against a hardcoded string or env var is acceptable for UI hiding.
    // Default password is "admin2024"
    if (password === "admin2024") {
      setIsAdmin(true);
      sessionStorage.setItem('is_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('is_admin');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};